'use strict';

const express = require(`express`);
const mainRoutes = require(`./routes/main`);
const myRoutes = require(`./routes/my`);
const articlesRoutes = require(`./routes/articles`);
const path = require(`path`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;
const app = express();
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);
app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на http://localhost:${DEFAULT_PORT}`));
