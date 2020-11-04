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
    // console.log(dest, program.dest, name);
    //默认创建同名文件夹
    const destPath = path.resolve(dest, name.toLowerCase())

    //判断路径是否存在
    if (createDir(destPath)) {
        // 1.拼接文件路径
        const filePath = path.resolve(destPath, `index.jsx`);
        // const routerPath = path.resolve(destPath, `router.js`);

        // 1.编译
        const pageTemplate = await compile('page.ejs', { name })
        // const routerTemplate = await compile('vue-router.ejs', { name: name, nameLow: name.toLowerCase() })

        // 2.写入文件
        writeToFile(filePath, pageTemplate)
        // writeToFile(routerPath, routerTemplate)
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
