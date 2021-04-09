'use strict';

const express = require(`express`);
const {HttpCode, API_PREFIX} = require(`../../constants`);
const routes = require(`../api`);
const {getLogger} = require(`../lib/logger`);
const logger = getLogger({name: `api`});

const DEFAULT_PORT = 3000;
const app = express();
app.use(express.json());
app.use(API_PREFIX, routes);

app.use((req, res, next) => {
  // Запросы от клиентов на не существующие маршруты
  res.status(HttpCode.NOT_FOUND).send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  // Любые возможные ошибки
  logger.error(`An error occured on processing request: ${err.message}`);
  next();
});

app.use((req, res, next) => {
  // Новый запрос от клиента. Зафиксируйте маршрут запроса
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    // Статус-код, отправленный клиенту после выполнения запроса
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

module.exports = {
  name: `--server`,
  description: `запускает сервер`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occured on server creation: ${err.message}`);
        }
        return logger.info(`Server start on http://localhost:${port}`);
      });
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
  }
};
