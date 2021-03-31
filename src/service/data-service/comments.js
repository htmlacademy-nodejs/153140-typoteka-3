'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentsService {
  constructor(articles) {
    this._articles = articles;
  }
  create(article, body) {
    const newComment = Object.assign({id: nanoid(MAX_ID_LENGTH)}, body);
    this._articles.find((item) => item.id === article.id).comments.push(newComment);
    return newComment;
  }

  delete(article, id) {
    const comment = article.comments.find((item) => item.id === id);

    if (!comment) {
      return null;
    }
    article.comments = article.comments.filter((item) => item.id !== id);
    this._articles = this._articles.filter((item) => item.id !== article.id);
    this._articles.push(article);
    return comment;
  }

  findAll(articleId) {
    return this._articles.find((item) => item.id === articleId).comments;
  }
}

module.exports = CommentsService;
