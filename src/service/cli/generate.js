'use strict';

const fs = require(`fs`).promises;
const {getRandomInt, shuffle} = require(`../../utils`);
const {ExitCode} = require(`../../constants`);
const chalk = require(`chalk`);
const FILE_SENTENCES = `./data/sentences.txt`;
const FILE_TITLES = `./data/titles.txt`;
const FILE_CATEGORIES = `./data/categories.txt`;

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;

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

const generateMocks = (count, titles, sentences, categories) => (
  new Array(count).fill({}).map(() => {
    const announce = shuffle(sentences).slice(0, getRandomInt(1, 5));
    const fullText = shuffle(sentences.filter((item) => (!announce.includes(item)) ? item : false));
    return {
      title: titles[getRandomInt(0, titles.length - 1)],
      createdDate: subtractDays(new Date(), 90),
      announce: announce.join(` `),
      fullText: fullText.slice(0, getRandomInt(1, fullText.length)).join(` `),
      сategory: shuffle(categories).slice(0, getRandomInt(1, categories.length))
    };
  })
);

module.exports = {
  name: `--generate`,
  description: `формирует файл mocks.json`,
  async run(args) {
    const titles = await readContent(FILE_TITLES);
    const sentences = await readContent(FILE_SENTENCES);
    const categories = await readContent(FILE_CATEGORIES);

    const [count] = args;
    const countMocks = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countMocks > MAX_COUNT) {
      console.error(chalk.red(`Не больше ${MAX_COUNT} объявлений`));
      process.exit(ExitCode.error);
    }
    const content = JSON.stringify(generateMocks(countMocks, titles, sentences, categories));
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
