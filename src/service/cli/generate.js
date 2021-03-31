'use strict';

const fs = require(`fs`).promises;
const {getRandomInt, shuffle} = require(`../../utils`);
const {ExitCode, MAX_ID_LENGTH} = require(`../../constants`);
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const FILE_SENTENCES = `./data/sentences.txt`;
const FILE_TITLES = `./data/titles.txt`;
const FILE_CATEGORIES = `./data/categories.txt`;
const FILE_COMMENTS = `./data/comments.txt`;

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const MAX_COMMENTS = 4;
const FILE_NAME = `mocks.json`;
const RANDOM_MIN = 1;
const RANDOM_MAX = 5;

const subtractDays = (date, days) => {
  const newDate = date.setDate(date.getDate() - days);
  return (new Date(newDate).toISOString()).split(`.`)[0].split(`T`).join(` `);
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

const generateComments = (count, comments) => (
  new Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments).slice(0, getRandomInt(RANDOM_MIN, 3)).join(` `),
  }))
);

const generateMocks = (count, titles, sentences, categories, comments) => (
  new Array(count).fill({}).map(() => {
    const announce = shuffle(sentences).slice(0, getRandomInt(RANDOM_MIN, RANDOM_MAX));
    const fullText = shuffle(sentences.filter((item) => (!announce.includes(item)) ? item : false));
    return {
      id: nanoid(MAX_ID_LENGTH),
      title: titles[getRandomInt(0, titles.length - 1)],
      createdDate: subtractDays(new Date(), 90),
      announce: announce.join(` `),
      fullText: fullText.slice(0, getRandomInt(RANDOM_MIN, fullText.length)).join(` `),
      category: shuffle(categories).slice(0, getRandomInt(RANDOM_MIN, categories.length)),
      comments: generateComments(getRandomInt(RANDOM_MIN, MAX_COMMENTS), comments)
    };
  })
);

module.exports = {
  name: `--generate`,
  description: `формирует файл mocks.json`,
  async run(args) {
    const files = [FILE_TITLES, FILE_SENTENCES, FILE_CATEGORIES, FILE_COMMENTS];
    const requests = files.map(async (item) => await readContent(item));
    const result = await Promise.all(requests);
    const [titles, sentences, categories, comments] = result;

    const [count] = args;
    const countMocks = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countMocks > MAX_COUNT) {
      console.error(chalk.red(`Не больше ${MAX_COUNT} объявлений`));
      process.exit(ExitCode.error);
    }
    const content = JSON.stringify(generateMocks(countMocks, titles, sentences, categories, comments));
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
