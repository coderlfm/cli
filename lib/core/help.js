const program = require("commander")
const helpOptions = () => {

    program.option('-c --coderlfm', 'a coderlfm cli')
    program.option('-d --dest <dest>', 'a destination folder, for example: -d /src/pages')
    program.option('-s --store', 'create a store')

}

module.exports = helpOptions