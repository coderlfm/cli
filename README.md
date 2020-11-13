# react 项目脚手架
该脚手架可快速生成一个可用于生产环境的基本项目，满足基本上的react项目开发，如开发者要做完全贴合自己的项目的模板，则需要更定制化的脚手架工具，目前脚手架已帮你做好以下配置

## TODO LIST

* [x] 打包不生成 sourceMap 文件
* [x] 动态配置路由表(兼容 Antd Tree)
* [x] 动态引入组件路由
* [x] 动态引入组件 `store`
* [x] 状态管理使用 `redux` 集成 `redux-thunk`
* [x] 二次封装 `axios`
* [x] 配置路径 `@` 别名，cs vode `@` 路径提示


## 快速开始
```bash
# npm
npm install coderlfm -g
# yarn
yarn global add coderlfm
```


## 创建项目
```
coderlfm create program_name
```

## 创建页面
```bash
coderlfm page home
```

## 创建页面(指定路径)
```bash
coderlfm page home -d src/home/children
```

## 创建页面并创建仓库
```bash
coderlfm page home -s
```

## 创建页面(指定路径)并创建仓库
```bash
coderlfm page home -d src/home/children -s
```
<br/>

## 是否需要手动引入组件中 `store`?
`src/store/reducers.js` 中已经做过动态引入组件中 `reducer`，浏览器中打开 redux 调试工具即可看到数据，无需手动引入组件`store`
```js
const reducers = {};
const pageDirs = require.context('@/pages', true, /reducer\.js$/)

pageDirs.keys().forEach((dirPath) => {
    const dirName = dirPath.split('./')[1].split('/')[0];
    dirPath = dirPath.substring(1, dirPath.length)
  
    reducers[dirName] = require('../pages' + dirPath).default
})

export default reducer;
```
<br/>

## 是否需要手动配置路由？

页面路由会根据pages下的文件夹设置同名路由，开发者无需手动添加路由
src/utils/utils.js已做过创建路由的操作，并默认开启懒加载，如开发者不需开启懒加载可手动在此处设置
```js
const createRoutes = (routes) => {
    return routes.map(item => {
        const ComponentName = lazy(() => import(`@/${item.componentPath}`));
        const Component = (<Route path={item.path} render={(routerData) => {
            return <Suspense fallback={<div>Loading...</div>}><ComponentName {...routerData}></ComponentName></Suspense>
        }} key={item.path} exact />)

        if (item.children && item.children.length) {
            return [Component, ...createRoutes(item.children)]
        } else if (item.componentPath) {
            return Component
        } else {
            return null;
        }
    })
}
```
### 获取路由表 

`src/router/index.js` 已经导出路由表，如要获取路由表做后台导航菜单或者tree树形控件展示可从该文件获取到路由表，路由表结构如以下形式
```js
[
    {
        path: "/home",      // 路由path
        key: "/home",       // 此key用来tree树形菜单选中
        title: '首页',      // tree树形菜单中的title
        icon: 'HomeOutlined', //左侧导航菜单中的icon
        componentPath: "pages/home/statistics", //组件的path路径
        exact: true,        // 是否精准匹配路由
        children:[          // 二级菜单
            {
                path: '/home/statistics',
                key: '/home/statistics',
                disabled: true,         // tree树形菜单disabled
                permanent: true,        // 默认菜单，是否常驻
                title: '控制台',
                icon: 'RiseOutlined',
                componentPath: 'pages/home/statistics'
            }
        ]
    },    
    {
        ...
    }
]
```

---
<br/>

- 手动修改路由配置表后续更新
- 后续版本计划新增基于 `@redux/toolkit` 来做状态管理，更简化redux的代码

