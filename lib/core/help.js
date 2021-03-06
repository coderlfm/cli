const program = require("commander")
const helpOptions = () => {

    program.option('-c, --coderlfm', 'a coderlfm cli')
    program.option('-d, --dest <dest>', 'a destination folder, for example: -d /src/pages')
    program.option('-rtk, --rtk', 'Create a @reduxjs/ Toolkit state management library: coderlfm create -rtk')
    program.option('-s, --store <store>', 'Create a repository that can be specified as "redux" or "@reduxjs/toolkit"')

}

module.exports = helpOptions