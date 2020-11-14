const inquirer = require('inquirer')

/**
 * 选择框架
 */
const selectFrame = async () => {
    const { frame } = await inquirer.prompt([
        {
            type: 'list',
            name: 'frame',
            message: 'Please select frames?',
            choices: [
                'React',
                {
                    name: 'Vue',
                    disabled: 'Unavailable at this time',
                },
            ],
        },
    ])

    return Promise.resolve(frame)
}

/**
 * 选择React状态管理库
 */
const selectReactStore = async () => {
    const { store } = await inquirer.prompt([
        {
            type: 'list',
            name: 'store',
            message: 'Please select the state management library that you want to use?',
            choices: [
                'redux',
                '@reduxjs/toolkit'
            ],
        },
    ])

    console.log('store',store);
    return Promise.resolve(store)
}


module.exports = {
    selectFrame,
    selectReactStore
}