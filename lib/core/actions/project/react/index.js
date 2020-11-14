const { promisify } = require('util')

// const program = require("commander")
const download = promisify(require('download-git-repo'))
const chalk = require('chalk')

const { reactRepoRedux, reactRepoReduxToolkit } = require('../../../../config/repo-config')
const timinal = require('../../../../utils/teminal')
const { selectReactStore } = require('../../../../utils/interaction')


const createReact = async (programPath) => {

    const store = await selectReactStore();

    console.log('准备拉取react模板', store);
    try {

        const downloadres = await download(`direct:${store === '@reduxjs/toolkit' ? reactRepoReduxToolkit : reactRepoRedux}`, programPath, { clone: true })
        console.log('download',downloadres);
    } catch (err) {
        console.log(err);
    }

    console.log('Dependency installation...');
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    console.log(chalk.green('install successfully'));
    await timinal(command, ['install'], { cwd: programPath })

    timinal(command, ['start'], { cwd: programPath })

}

module.exports = createReact
