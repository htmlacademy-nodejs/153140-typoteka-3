'use strict';

const CategoriesService = require(`./categories`);
const SearchService = require(`./search`);
const ArticlesService = require(`./articles`);
const CommentsService = require(`./comments`);

module.exports = {
  CategoriesService,
  CommentsService,
  SearchService,
  ArticlesService,
};
