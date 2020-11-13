const { promisify } = require('util')
const path = require('path')

const program = require("commander")
const download = promisify(require('download-git-repo'))
const chalk = require('chalk')

const { reactRepoRedux, reactRepoReduxToolkit } = require('../config/repo-config')
const timinal = require('../utils/teminal')
const { compile, writeToFile, createDir } = require('../utils/utils')

// 项目初始化
const createProjectAction = async (programName, other) => {

    console.log(chalk.blue('project init...'));

    const programPath = path.resolve(programName);
    try {
        await download(`direct:${program.rtk ? reactRepoReduxToolkit : reactRepoRedux}`, programPath, { clone: true })

        console.log('Dependency installation...');
        const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
        await timinal(command, ['install'], { cwd: programPath })

        timinal(command, ['start'], { cwd: programPath })

        console.log(chalk.green('install successfully'));
    } catch (error) {
        console.error(error)
    }

}

/**
 * 创建页面及组件
 * @param {String} componentName 组件名
 * @param {Array} other 可选参数
 */
const createComponentAction = async (name, dest) => {

    const destPath = path.resolve(dest, name.toLowerCase())
    const createStore = program.store ? true : false;
    let storePath = null;

    if (createDir(destPath)) {
        const filePath = path.resolve(destPath, `index.jsx`);
        const pageTemplate = await compile(createStore ? 'page-store.ejs' : 'page.ejs', { name, nameLow: name.toLowerCase() })
        writeToFile(filePath, pageTemplate)
    }

    if (createStore)
        storePath = path.resolve(dest, name.toLowerCase(), 'store')

    if (createStore && createDir(storePath)) {

        const actionCreators = await compile('store/actionCreators.js')
        const contants = await compile('store/contants.js')
        const reducer = await compile('store/reducer.js')

        const actionCreatorsPath = path.resolve(storePath, `actionCreators.js`);
        const contantsPath = path.resolve(storePath, `contants.js`);
        const reducerPath = path.resolve(storePath, `reducer.js`);

        writeToFile(actionCreatorsPath, actionCreators)
        writeToFile(contantsPath, contants)
        writeToFile(reducerPath, reducer)
    }

}


module.exports = {
    createProjectAction,
    createComponentAction,
}
