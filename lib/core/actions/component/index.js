const path = require('path')
const fs = require('fs')

const program = require("commander")

const { compile, writeToFile, createDir } = require('../../../utils/utils');
const { read, fstat } = require('fs');


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

        let file = await fs.promises.readFile(path.resolve(path.resolve(), 'package.json'), 'utf-8')
        file = JSON.parse(file)

        if (file.dependencies['@reduxjs/toolkit']) {
            const slice = await compile('rtk/slice.ejs', { nameLow: name.toLowerCase() })
            const slicePath = path.resolve(storePath, `slice.js`);

            writeToFile(slicePath, slice)


        } else {
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

}

module.exports = createComponentAction
