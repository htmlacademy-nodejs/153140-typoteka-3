'use strict';

const version = require(`./version`);
const generate = require(`./generate`);
const help = require(`./help`);
const server = require(`./server`);
const fill = require(`./fill`);

const cli = {
  [version.name]: version,
  [generate.name]: generate,
  [help.name]: help,
  [server.name]: server,
  [fill.name]: fill
};

module.exports = {
  cli
};
