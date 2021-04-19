'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  const categories = await api.getCategories();
  const articles = await api.getArticles();
  res.render(`main/main`, {articles, categories});
});
mainRouter.get(`/register`, (req, res) => res.render(`main/sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`main/login`));
mainRouter.get(`/search`, async (req, res) => {
  try {
    const {search} = req.query;
    const results = await api.search(search);
    res.render(`main/search`, {results});
  } catch (e) {
    res.render(`main/search`, {results: []});
  }
});
mainRouter.get(`/categories`, (req, res) => res.render(`main/all-categories`));

module.exports = mainRouter;
