const execSync = require('child_process').execSync

const chalk = require('chalk')

const pkg = require('../../package.json')

module.exports = function () {
    const pkgName = pkg.name
    const version = pkg.version
    const ltsVersion = (execSync(`npm view ${pkgName} version --registry=https://registry.npm.taobao.org`) + '')
    if (ltsVersion.trim() !== version) {
        console.log(chalk.cyan(`A new edition has been released ${chalk.white(`npm i -g ${pkgName} `)}Suggest to upgrade： ${version} ->  ${chalk.green(ltsVersion)} `));
    }

}