const { promisify } = require('util')
const { execSync } = require('child_process')

const ora = require('ora')
const chalk = require('chalk')
// const logSymbols = require('log-symbols');
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


    const dep = ora('dependency installation')
    dep.start();
    console.log();

    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'

    try {
        execSync(`cd ${programPath} && ${command} install`, { stdio: 'inherit' })
        dep.color = 'green'
        dep.text = chalk.green('dependency installation');
        dep.succeed();

        timinal(command, ['start'], { cwd: programPath })
    } catch (error) {
        dep.color = 'red'
        dep.text = `${chalk.red('Installation error, please manually execute')} ${chalk.yellow('npm install or yarn')}`;
        dep.fail();
        console.log(error);
    } finally {
        dep.stop();
    }


}

module.exports = createReact
