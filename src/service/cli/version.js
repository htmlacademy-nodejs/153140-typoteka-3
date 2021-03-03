'use strict';

const packageJSON = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  description: `выводит номер версии`,
  run() {
    console.info(packageJSON.version);
  }
};
