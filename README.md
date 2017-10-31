# fyb-pc

> A Vue.js project


## 构建步骤

``` bash
# 安装依赖
npm i -g yarn
yarn install

# 本地开发时候使用，mock 接口如果没有拦截到，记得修改 `fyb-pc/config/index.js` 里面的 proxyTable 相关代码，添加拦截规则
npm run dev

# 联调或者修bug的时候用下面这个命令，记得改 hosts
npm run lian

# 打包记得选 test beta 或 prod
npm run build

# 打包，顺便查看 bundle 文件大小
npm run build --report
```


## iconfont

iconfont 网站上，fyb-pc 项目，添加相应图标之后下载，解压之后保证目录名字是 iconfont，然后直接 copy 到 global 目录下覆盖旧的文件夹就行了


## src 目录结构

├── App.js
├── App.vue
├── H5  # H5 模块，之后基本不用动
│   ├── h5  # h5 相关静态
│   └── index.html  # h5 的模板，如果有修改，记得让后端的人也修改对应模板
├── Home  # 首页 模块
│   ├── Home.vue
│   ├── api.js
│   ├── assets
│   └── components
│       ├── HomeFooter.vue
│       └── PartBanner.vue
├── SecHouse  # 二手房 模块
│   ├── HouseDetail.vue
│   ├── HouseFilter.vue
│   ├── HouseList.vue
│   ├── HouseSearch.vue
│   ├── RangeInput.vue
│   └── SecHouse.vue  # 二手房 模块入口
├── assets  # 放一些公共图片
│   └── logo.png
├── components  # 公共组件
│   ├── BackToTop.vue
│   ├── SlidePanel.vue
│   └── TopNav.vue
├── global  # 全局的一些东西
│   ├── iconfont
│   ├── iwjw  # 目前 index.js 里面只放跟 ajax 请求相关的东西
│   │   └── index.js
│   ├── style
│   │   ├── old # 改版之前的 h5 样式，好像目前没用到，留着而已
│   │   ├── reset.css
│   │   └── theme.less  # 一些颜色变量，很有用
│   └── wx  # 微信相关，暂时没用到
├── main.js # 项目代码的总入口
├── router
│   └── index.js  # 整个项目的路由都写在这里
└── store # vuex 相关
    ├── api.js  # 各个 vuex 的 modules 里的 actions 用到的 接口 api 都写在这里，如果觉得不方便，也可以直接写到对应的 module 里面
    ├── index.js
    └── modules
        ├── global.js
        ├── secHouse.js
        └── user.js
