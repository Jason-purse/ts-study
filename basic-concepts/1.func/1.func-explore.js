"use strict";
/**
 * 主要学习一些基础知识
 */
function calc(callback) {
    return callback(10);
}
// 以下函数形式上是类似于Callback,所以是支持的,对于声明的y则自动被忽略 ...
calc(function (x) {
    console.log(x);
});
// 但是官方有一个提示,最好不要写可选参数,除非你想要在不传递它的时候运行 ..
// 当y为可选参数时候,以下函数的时候,则编译抛出错误
// 判断规则是 typeof (一个类型) extends (另一个类型) ? true : false
// 大概是这种判断方式,细节不深究 ..
// calc(function (x: string,y:string) {
//     console.log(x,y)
// })
// 所以一般在调用函数的时候,不需要声明函数的变量的类型,因为已经能够自动推断了 ..
calc(function (x) {
    console.log(x);
});
calc((x, y) => {
    console.log(x, y);
});
// 创建一个符合 CallbackWithProps 类型的实例
function a(callback) {
    console.log('function value: ' + callback.value + " ,invoke result: " + callback(10, 20));
}
const value = (x, y) => {
    return x + y;
};
value.value = '1231';
a(value);
const callback1 = (() => {
    const func = (x, y) => {
        return x * y;
    };
    func.value = '123';
    return func;
})();
console.log(callback1(10, 10));
class MyConstructor {
    constructor(s) {
        this.name = s;
    }
}
function fn(ctor) {
    return new ctor("hello");
}
// 此时传入一个构造器 则可以产生对象
console.log(fn(MyConstructor));
