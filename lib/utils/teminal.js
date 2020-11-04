/**
 * 执行终端命令相关的代码
 */
const { exec, spawn } = require('child_process')

// 子进程帮我们执行 npm i 主进程看不到输出
// 根据 process.platform === 'win32'?'npm.cmd'

const teminal = (...args) => {
    return new Promise((resolve, reject) => {
        const childProcess = spawn(...args)
        childProcess.stdout.pipe(process.stdout)
        childProcess.stderr.pipe(process.stderr)
        childProcess.stdout.on('close', () => {
            resolve()
        })
    })
}


module.exports = teminal