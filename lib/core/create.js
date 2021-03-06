const program = require('commander');

const {
    createProjectAction,
    createComponentAction,
} = require('./actions');


const createCommands = () => {
    program
        .command('create <program> [other...]')
        .description('create command')
        .action(createProjectAction)

    program
        .command('page <pageName> [other...]')
        .description('create component 可以指定目录，例如：page home -d src/pages/home')
        .action((name) => createComponentAction(name, dest = program.dest || 'src/pages'))

    program
        .command('cpm <componentName> [other...]')
        .description('create component 可以指定目录，例如：cpm helloworld -d components/helloworld')
        .action((name) => createComponentAction(name, dest = program.dest || 'src/components'))

}

module.exports = createCommands;

