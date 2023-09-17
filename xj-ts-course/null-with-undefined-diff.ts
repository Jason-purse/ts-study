/**
 * null 和undefined 本身没有区别
 *
 *  但是我们一般认为 null 表示对象引用存在(也就是说属性存在),暂时为空
 *
 *  // undefined 表示没有这个对象也没有这个引用,这是一种良好的习惯 ..
 *
 *  null 表示稍后初始化这个属性的值,而undefined 表示未定义 。。
 *
 *  其次 null / undefined 可以是其他类型的,你可以明确不允许作为非空类型的值 ..(通过strictNullChecks = true) 来确定它不能设置为null
 */

let v: string = "234"
// 不允许,以前可以
// @ts-ignore
v = null;
let f: number = 232
// @ts-ignore
f = undefined