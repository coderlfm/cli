const path = require('path')

const chalk = require('chalk')

const { selectFrame } = require('../../../utils/interaction')
const reateReact = require('./react')

// 项目初始化
const createProjectAction = async (programName, other) => {

    console.log(chalk.blue('project init...'));
    const programPath = path.resolve(programName);
    
    try {
        const frame = await selectFrame();
        console.log('frame: ',frame);
        if (frame && frame === 'React') {
            reateReact(programPath)

        } else {

        }

    } catch (error) {
        console.error(error)
    }

}

module.exports = createProjectAction