'use strict';

const generate = require(`./generate`);
const version = require(`./version`);
const server = require(`./server`);
const chalk = require(`chalk`);

const name = `--help`;
const description = `печатает этот текст`;
const info = {
  [version.name]: version.description,
  [name]: description,
  [generate.name]: generate.description,
  [server.name]: server.description
};

const text = `
Программа запускает http-сервер и формирует файл с данными для API.
        Гайд:
        service.js <command>

        Команды:
        ${Object.keys(info).map((item) => `${item}: ${info[item]}`).join(`\n\t`)}
`;

module.exports = {
  name,
  description,
  run() {
    console.info(chalk.gray(text));
  }
};
