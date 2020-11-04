#!/usr/bin/env node

//1.导入
const program = require("commander");
const helpOptions = require("./lib/core/help.js");
const createCommands = require("./lib/core/create.js")

// 动态导入版本号
program.version(require('./package.json').version, '-v, --version');


program.on('--help', function () {
    console.log("");
    console.log('Help');
})

// 帮助相关
helpOptions();

// 构建项目
createCommands();


// 解析
program.parse(process.argv);

