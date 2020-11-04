const program = require("commander")
//帮助和可选信息
const helpOptions = () => {
    // 添加自己的options
    program.option('-w --why', 'a why cli')
    program.option('-d --dest <dest>', 'a destination folder,例如：-d /src/pages')//根据目录
    program.option('-f --framework <framework>', 'your framework')//根据参数拉取不同模板，vue，react

}

module.exports = helpOptions