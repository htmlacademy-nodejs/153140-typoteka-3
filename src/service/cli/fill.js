'use strict';

const fs = require(`fs`).promises;
const {getRandomInt, shuffle} = require(`../../utils`);
const {ExitCode} = require(`../../constants`);
const chalk = require(`chalk`);

const FILE_SENTENCES = `./data/sentences.txt`;
const FILE_TITLES = `./data/titles.txt`;
const FILE_CATEGORIES = `./data/categories.txt`;
const FILE_COMMENTS = `./data/comments.txt`;

const MIN_COMMENTS = 2;
const MAX_COMMENTS = 4;
const FILE_NAME = `fill-db1.sql`;
const RANDOM_MIN = 1;
const RANDOM_MAX = 2;

const users = [
  {
    email: `ivanov@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Иван`,
    lastName: `Иванов`,
    avatar: `avatar1.jpg`
  }, {
    email: `popova@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Елена`,
    lastName: `Попова`,
    avatar: `avatar2.jpg`
  }, {
    email: `petrov@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Петр`,
    lastName: `Петров`,
    avatar: `avatar3.jpg`
  }
];

const subtractDays = (date, days) => {
  const newDate = date.setDate(date.getDate() - days);
  return (new Date(newDate).toISOString()).split(`.`)[0].split(`T`).join(` `);
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const getPictureFileName = (num) => {
  const number = (num < 10) ? `0${num}` : num;
  return `item${number}.jpg`;
};

const readContent = async (path) => {
  try {
    const content = await fs.readFile(path, `utf8`);
    return content.split(`\n`).filter((it) => it.trim().length > 0);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateComments = (count, articleId, userCount, comments) => (
  new Array(Number(count)).fill({}).map(() => ({
    userId: getRandomInt(1, userCount),
    articleId,
    createdDate: subtractDays(new Date(), 90),
    text: shuffle(comments).slice(0, getRandomInt(RANDOM_MIN, 3)).join(` `),
  }))
);

const generateArticles = (count, titles, categoryCount, userCount, sentences, comments) => {
  return new Array(Number(count)).fill({}).map((it, index) => {
    const announce = shuffle(sentences).slice(0, getRandomInt(RANDOM_MIN, RANDOM_MAX));
    const fullText = shuffle(sentences.filter((item) => (!announce.includes(item)) ? item : false));
    return {
      category: [getRandomInt(1, categoryCount)],
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: announce.join(` `),
      fullText: fullText.slice(0, getRandomInt(RANDOM_MIN, fullText.length)).join(` `),
      picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
      createdDate: subtractDays(new Date(), 90),
      comments: generateComments(getRandomInt(MIN_COMMENTS, MAX_COMMENTS), index + 1, userCount, comments),
      userId: getRandomInt(1, userCount)
    };
  });
};

module.exports = {
  name: `--fill`,
  description: `формирует файл fill-db.sql`,
  async run(args) {
    const files = [FILE_TITLES, FILE_SENTENCES, FILE_CATEGORIES, FILE_COMMENTS];
    const requests = files.map((item) => readContent(item));
    const result = await Promise.all(requests);
    const [titles, sentences, categories, commentSentences] = result;
    const [count] = args;

    const articles = generateArticles(count, titles, categories.length, users.length, sentences, commentSentences);
    const comments = articles.flatMap((article) => article.comments);
    const articleCategories = articles.map((article, index) => ({articleId: index + 1, categoryId: article.category[0]}));
    const userValues = users.map(({email, passwordHash, firstName, lastName, avatar}) => `('${email}', '${passwordHash}', '${firstName}', '${lastName}', '${avatar}')`).join(`,\n`);
    const categoryValues = categories.map((name) => `('${name}')`).join(`,\n`);
    const articleValues = articles.map(({title, announce, fullText, picture, createdDate, userId}) => `('${title}', '${announce}', '${fullText}', '${picture}', '${createdDate}', ${userId})`).join(`,\n`);
    const articleCategoryValues = articleCategories.map(({articleId, categoryId}) => `(${articleId}, ${categoryId})`).join(`,\n`);
    const commentValues = comments.map(({text, createdDate, articleId, userId}) => `('${text}', '${createdDate}', ${articleId}, ${userId})`).join(`,\n`);

    const content = `--Пользователи
      INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
      ${userValues};
      --Категории
      INSERT INTO categories(name) VALUES
      ${categoryValues};
      --Статьи
      ALTER TABLE articles DISABLE TRIGGER ALL;
      INSERT INTO articles(title, announce, fullText, picture, createdDate, user_id) VALUES
      ${articleValues};
      ALTER TABLE articles ENABLE TRIGGER ALL;
      --Категории по статьям
      ALTER TABLE article_categories DISABLE TRIGGER ALL;
      INSERT INTO article_categories(article_id, category_id) VALUES
      ${articleCategoryValues};
      ALTER TABLE article_categories ENABLE TRIGGER ALL;
      --Комментарии
      ALTER TABLE comments DISABLE TRIGGER ALL;
      INSERT INTO COMMENTS(text, createdDate, article_id, user_id) VALUES
      ${commentValues};
      ALTER TABLE comments ENABLE TRIGGER ALL;`;

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.success);
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.error);
    }
  }
};
