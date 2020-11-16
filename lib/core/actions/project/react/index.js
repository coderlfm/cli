const { promisify } = require('util')

// const program = require("commander")
const download = promisify(require('download-git-repo'))
const chalk = require('chalk')

const { reactRepoRedux, reactRepoReduxToolkit } = require('../../../../config/repo-config')
const timinal = require('../../../../utils/teminal')
const { selectReactStore } = require('../../../../utils/interaction')


const createReact = async (programPath) => {
  

    const store = await selectReactStore();

    try {

        const downloadres = await download(`direct:${store === '@reduxjs/toolkit' ? reactRepoReduxToolkit : reactRepoRedux}`, programPath, { clone: true })
    } catch (err) {
        console.log(err);
    }

    console.log(chalk.blue('Dependency installation...'));
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    await timinal(command, ['install'], { cwd: programPath })
    console.log(chalk.green('install successfully'));

    timinal(command, ['start'], { cwd: programPath })

}

module.exports = createReact
