const { promisify } = require('util')

const ora = require('ora')
const chalk = require('chalk')
const logSymbols = require('log-symbols');
const download = promisify(require('download-git-repo'))

const { reactRepoRedux, reactRepoReduxToolkit } = require('../../../../config/repo-config')
const timinal = require('../../../../utils/teminal')
const { selectReactStore } = require('../../../../utils/interaction')


const createReact = async (programPath) => {

    const store = await selectReactStore();
    const template = ora('Download the template')

    try {

        template.start();
        await download(`direct:${store === '@reduxjs/toolkit' ? reactRepoReduxToolkit : reactRepoRedux}`, programPath, { clone: true })
        template.succeed();

    } catch (err) {
        template.fail();
        console.log(err);
    } finally {
        template.stop();
    }


    const dep = ora('dependency installation ')

    dep.start();
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    await timinal(command, ['install'], { cwd: programPath })

    dep.succeed();
    dep.stop();
    console.log(logSymbols.success, chalk.green('project creation successful'));


    timinal(command, ['start'], { cwd: programPath })

}

module.exports = createReact
