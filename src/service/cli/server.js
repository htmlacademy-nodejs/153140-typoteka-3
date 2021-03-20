'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const http = require(`http`);
const {HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const FILE_CONTENT = `mocks.json`;

module.exports = {
  name: `--server`,
  description: `запускает сервер`,
  async run(args) {
    const [userPort] = args;
    const port = Number.parseInt(userPort, 10) || DEFAULT_PORT;
    const sendResponse = (res, statusCode, message) => {
      const template = `
      <!Doctype html>
      <html lang="ru">
      <head>
        <title>Typoteka</title>
      </head>
      <body>${message}</body>
    </html>
      `.trim();
      res.statusCode = statusCode;
      res.writeHead(statusCode, {
        'Content-Type': `text/html; charset=UTF-8`,
      });
      res.end(template);
    };
    const onClientConnect = async (req, res) => {
      const notFoundMessage = `Not found`;

      switch (req.url) {
        case `/`:
          try {
            const content = await fs.readFile(FILE_CONTENT);
            const message = JSON.parse(content).map((post) => `<li>${post.title}</li>`).join(``);
            sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
          } catch (err) {
            sendResponse(res, HttpCode.NOT_FOUND, notFoundMessage);
          }
          break;
        default:
          sendResponse(res, HttpCode.NOT_FOUND, notFoundMessage);
          break;
      }
    };
    http.createServer(onClientConnect).listen(port).on(`listening`, (err) => {
      if (err) {
        return console.error(`Ошибка при создании сервера`, err);
      }
      return console.info(chalk.green(`Сервер стартовал на http://localhost:${port}`));
    });
  }
};
