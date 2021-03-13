'use strict';

const packageJSON = require(`../../../package.json`);
const chalk = require(`chalk`);

module.exports = {
  name: `--version`,
  description: `выводит номер версии`,
  run() {
    console.info(chalk.blue(packageJSON.version));
  }
};
