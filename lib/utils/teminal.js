
const { spawn } = require('child_process')

const teminal = (...args) => {
    return new Promise((resolve, reject) => {
        const childProcess = spawn(...args)
        childProcess.stdout.pipe(process.stdout)
        childProcess.stderr.pipe(process.stderr)
        childProcess.stdout.on('close', resolve)
    })
}


module.exports = teminal