const path = require('path');
const fs = require('fs')
const ejs = require('ejs');

/**
 * 编译模板
 * @param {String} templateName 模板名称
 * @param {Object} data 渲染的数据
 */
const compile = (templateName, data = {}) => {
    const templatePath = `../templates/${templateName}`;
    const compilePath = path.resolve(__dirname, templatePath);

    if (data.name) {
        data.name = data.name[0].toUpperCase() + data.name.substring(1);
    }
    
    const result = ejs.renderFile(compilePath, data);

    return Promise.resolve(result)
}

/**
 * 创建目录
 * @param {String} dirPath 
 */
const createDir = dirPath => {

    if (fs.existsSync(dirPath)) {
        return true;
    } else {
        if (createDir(path.dirname(dirPath))) {
            fs.mkdirSync(dirPath);
            return true;
        }
    }

}


/**
 * 写入文件
 * @param {String} filePath 
 * @param {String} content 
 */
const writeToFile = (filePath, content) => {
    fs.promises.writeFile(filePath, content);
}

module.exports = {
    compile,
    writeToFile,
    createDir
}

