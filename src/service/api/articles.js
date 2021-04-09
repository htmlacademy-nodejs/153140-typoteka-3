'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const articleValidator = require(`../middlewares/articleValidator`);
const articleExist = require(`../middlewares/articleExist`);
const commentValidator = require(`../middlewares/commentValidator`);

module.exports = (app, articleService, commentsService) => {
  const route = new Router();
  app.use(`/articles`, route);
  // GET /api/articles - возвращает список публикаций
  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();

    if (!articles || articles.length === 0) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found any articles`);
    }

    return res.status(HttpCode.OK).json(articles);
  });
  // GET /api/articles/:articleId — возвращает полную информацию о публикации
  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).json(article);
  });
  // POST /api/articles — создаёт новую публикацию
  route.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);

    return res.status(HttpCode.CREATED).json(article);
  });
  // PUT /api/articles/:articleId - редактирует определённую публикацию
  route.put(`/:articleId`, articleValidator, articleExist(articleService), (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);
    const updated = articleService.update(articleId, req.body);

    if (!updated) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).json(article);
  });
  // DELETE /api/articles/:articleId - удаляет определённую публикацию
  route.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.delete(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).json(article);
  });
  // GET /api/articles/:articleId/comments — возвращает список комментариев определённой публикации
  route.get(`/:articleId/comments`, articleExist(articleService), (req, res) => {
    const {articleId} = req.params;
    const comments = commentsService.findAll(articleId);

    if (!comments) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found comments with ${articleId}`);
    }

    return res.status(HttpCode.OK).json(comments);
  });
  // POST /api/articles/:articleId/comments — создаёт новый комментарий
  route.post(`/:articleId/comments`, articleExist(articleService), commentValidator, (req, res) => {
    const {article} = res.locals;
    const comment = commentsService.create(article, req.body);

    return res.status(HttpCode.CREATED).json(comment);
  });
  // DELETE /api/articles/:articleId/comments/:commentId — удаляет из определённой публикации комментарий с идентификатором
  route.delete(`/:articleId/comments/:commentId`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    const {commentId} = req.params;
    const deleted = commentsService.delete(article, commentId);

    if (!deleted) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found comment`);
    }

    return res.status(HttpCode.OK).json(deleted);
  });
};
