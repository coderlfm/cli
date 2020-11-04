const { promisify } = require('util')
const path = require('path')

const program = require("commander")
const download = promisify(require('download-git-repo'))
const open = require('open')

const { reactRepo } = require('../config/repo-config')
const timinal = require('../utils/teminal')
const { compile, writeToFile, createDir } = require('../utils/utils')

// 项目初始化
const createProjectAction = async (programName, other) => {
    console.log('project init...');

    // 1. clone 项目模板
    const programPath = path.resolve(programName);
    try {
        const result = await download(`direct:${reactRepo}`, programPath, { clone: true })
        console.log(result);

        debugger;
        console.log('执行npm install');
        // 2. 执行 npm i
        const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
        await timinal(command, ['install'], { cwd: programPath })

        // 3.自动开启服务
        timinal(command, ['start'], { cwd: programPath })

        // 4. 打开窗口，
        // open('http://localhost:8080/')

        console.log('安装完成');
    } catch (error) {

    }

}

/**
 * 创建页面
 * @param {String} componentName 组件名
 * @param {Array} other 可选参数
 */
const createComponentAction = async (name, other) => {
    const dest = program.dest || 'src/pages'
    const createStore = program.store ? true : false;


    const destPath = path.resolve(dest, name.toLowerCase())
    const storePath = path.resolve(dest, name.toLowerCase(), 'store')


    if (createDir(destPath)) {
        const filePath = path.resolve(destPath, `index.jsx`);
        const pageTemplate = await compile('page.ejs', { name })
        writeToFile(filePath, pageTemplate)
    }

    if (createStore && createDir(storePath)) {
        const pageStorePath = path.resolve(destPath, `store`);
        console.log('pageStorePath', pageStorePath);

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

/**
 * 创建store
 * @param {String} name 
 * @param {Array} other 
 */
const createStoreAction = async (name, other) => {
    const dest = program.dest || 'src/store/modules'
    const destPath = path.resolve(dest, name.toLowerCase())

    if (createDir(destPath)) {
        // 1.拼接文件路径
        const storePath = path.resolve(destPath, `index.js`);
        const actionPath = path.resolve(destPath, `types.js`);

        // 1.编译
        const storeTemplate = await compile('vue-store.ejs')
        const actionTemplate = await compile('vue-store-action.ejs')

        // 2.写入文件
        writeToFile(storePath, storeTemplate)
        writeToFile(actionPath, actionTemplate)
    }
}

module.exports = {
    createProjectAction,
    createComponentAction,
    createStoreAction
}
