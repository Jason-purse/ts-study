"use strict";
/**
 * 2. ts 类型断言仅仅是一个提示,为了让js更好用,以下示例可能会让人疑惑
 *
 *
 * 仅仅是比较这个类型是否具有这些属性
 *
 * 这个规则在形参为对象声明类型时有所不同,例如传入的也是对象声明类型(自变量对象)
 */
const p = {
    name: '123',
    age: '234',
    email: '234',
    type: '234'
};
const person = p;
function typeInfer(variable) {
}
// 不合法
// typeInfer({length: 2, name: 123})
