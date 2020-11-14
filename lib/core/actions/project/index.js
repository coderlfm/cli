const { promisify } = require('util')
const path = require('path')

const program = require("commander")
const download = promisify(require('download-git-repo'))
const chalk = require('chalk')

const { reactRepoRedux, reactRepoReduxToolkit } = require('../../../config/repo-config')
const timinal = require('../../../utils/teminal')
const { selectFrame } = require('../../../utils/interaction')

// 项目初始化
const createProjectAction = async (programName, other) => {

    console.log(chalk.blue('project init...'));

    const programPath = path.resolve(programName);
    try {
        const frame = await selectFrame();
        console.log(frame);
        if (frame && frame === 'React') {
            console.log('准备拉取react模板');
            await download(`direct:${program.rtk ? reactRepoReduxToolkit : reactRepoRedux}`, programPath, { clone: true })

            console.log('Dependency installation...');
            const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
            await timinal(command, ['install'], { cwd: programPath })

            timinal(command, ['start'], { cwd: programPath })

            console.log(chalk.green('install successfully'));
        } else {

        }

    } catch (error) {
        console.error(error)
    }

}

module.exports = createProjectAction