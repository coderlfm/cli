const program = require('commander');

const {
    createProjectAction,
    createComponentAction,
    createStoreAction
} = require('./actions.js');


// 项目初始化
const createCommands = () => {
    program
        .command('create <program> [other...]')
        .description('create command')
        .action(createProjectAction)

    program
        .command('page <pageName> [other...]')
        .description('create component 可以指定目录，例如：page home -d src/pages/home')
        .action(createComponentAction)

    program
        .command('store <storeName> [other...]')
        .description('create component 可以指定目录，例如：store home -d src/store/modules')
        .action(createStoreAction)

}

module.exports = createCommands;

