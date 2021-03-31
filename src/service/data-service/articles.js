'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class ArticlesService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const date = new Date();
    const newArticle = {...{id: nanoid(MAX_ID_LENGTH), comments: [], createdDate: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split(`.`)[0].split(`T`).join(` `)}, ...article};

    this._articles.push(newArticle);
    return newArticle;
  }

  delete(id) {
    const article = this._articles.find((item) => item.id === id);

    if (!article) {
      return null;
    }

    this._articles = this._articles.filter((item) => item.id !== id);
    return article;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((item) => item.id === id);
  }

  update(id, article) {
    const oldArticle = this._articles.find((item) => item.id === id);

    return Object.assign(oldArticle, article);
  }
}

module.exports = ArticlesService;
