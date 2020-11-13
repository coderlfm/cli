#!/usr/bin/env node

const program = require("commander");
const helpOptions = require("./lib/core/help.js");
const createCommands = require("./lib/core/create.js")

program.version(require('./package.json').version, '-v, --version');
program.on('--help', function () {})

helpOptions();
createCommands();
program.parse(process.argv);

