const path = require('path')

const { selectFrame } = require('../../../utils/interaction')
const reateReact = require('./react')
const checkVersion = require('../../../utils/check-version')

// 项目初始化
const createProjectAction = async (programName, other) => {

    const programPath = path.resolve(programName);

    try {
        checkVersion();
        const frame = await selectFrame();
        if (frame && frame === 'React') {
            reateReact(programPath)
        } else { }

    } catch (error) {
        console.error(error)
    }

}

module.exports = createProjectAction