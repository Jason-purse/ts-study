/**
 * ts 模块合并,也就是说 最终打包到同一个文件中,那么很显然有多种方式 ..
 *
 * 打包命令,tsc --outFile 目标文件 需要打包的文件ts列表 ... a.ts b.ts ts-module-explore.ts
 *
 * // 一个ts文件中 通过 /// <reference path="xxx.ts"> 表示打包引入一个文件 ...
 *
 * 和import 一个ts 模块不同 .. 没有打包意味,相比于tsc编译输出更加容易理解,直接将某个ts的内容全部导入到这个ts中 ..
 */


/// <reference path="b.ts" />

console.log(AModule.getModuleName())