'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (req, res, next) => {
  const articleKeys = [`category`, `announce`, `fullText`, `title`];
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = articleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};
