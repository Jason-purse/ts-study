// 能够导入一个ts 后缀的原因是开启了tsConfig.json配置中的 allowImportingTsExtensions
import "./aa.ts"

// 正常模块导入 能够自动解析
// import * as A from './a.ts'

// console.log(A.AModule.getModuleName());
console.log(AAModule.getModuleName())


// 这个文件进行 amd 打包也用不了,没有 使用amd 相关的模块定义包来执行
// tsc --outFile dist/ts-module-explore-v1.js aa.ts bb.ts --module amd

// 并且amd 在浏览器环境中需要使用require.js来进行 模块引入
// 例如 有关模块的详细介绍,参考 向军大叔的 js模块化课程 ..
// <script>
//     require(['AModule','BModule'],(aModule,bModule) => {
//         // 代码逻辑处理
//     })
//     </script>

// 查看此目录的兄弟目录 webpack 了解 webpack 打包


// 总结,当需要将TS内容暴露到 html环境中的时候,我们才需要通过一个统一的输出文件(ts),在这个文件中通过/// <reference path="..xx"> 来合并打包一个js
// 来在浏览器环境中使用 ...