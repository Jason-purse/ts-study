"use strict";
/**
 * 函数类型的定义
 *      1. 函数类型表达式
 *      2. 函数声明
 *      3. 函数类型声明
 *          1. 调用签名
 *          2. 带有属性的调用签名
 *          3. 构造签名
 */
/**
 * 这种分开初始化 必须保证是let 修饰符
 */
let Call4;
Call4 = function (x) {
    return 123;
};
/**
 * 或者通过const 声明并初始化
 */
const Call5 = (x) => 123;
/**
 * 3. 函数声明
 */
function Call3(x) {
    return 123;
}
function newFunc(constructor) {
    return new constructor(123);
}
class NumberClass extends Number {
    constructor(number) {
        super(number);
    }
}
const number = newFunc(NumberClass);
console.log(number == 123);
