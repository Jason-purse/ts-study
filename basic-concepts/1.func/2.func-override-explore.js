"use strict";
/**
 * 函数重载
 *
 * 先写多个函数重载签名,
 * 然后写一个通用重载函数(但是这个函数不能够被直接调用)
 */
/**
 * 通用重载函数
 * @param x
 * @param y
 */
function add(x, y) {
    return x + y;
}
// 这样是不合法的,不允许直接调用通用重载函数
// add(1,"23");
const numberResult = add(1, 2);
function getLength(any) {
    return (any === null || any === void 0 ? void 0 : any.length) || 0;
}
// 但是可以简写为 联合类型处理
function getLengthOfUnion(variable) {
    return variable.length;
}
// 但是我们还可以更加通用(通过对象声明类型)
function getLengthOfObj(variable) {
    return variable.length;
}
const p = { length: 12, name: "234" };
getLengthOfObj("");
getLengthOfObj(p);
