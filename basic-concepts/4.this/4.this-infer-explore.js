"use strict";
// this 推断
/**
 * 当没有通过tsconfig.json 进行this 类型推断配置的时候, this 可以是any类型
 *
 * 但是我们可以配置tsconfig.json中的noImplicitThis: true 就不允许 模糊的this
 *
 * 初始化 tsconfig.json  => tsc init
 *
 *
 * 对于this, 普通函数,this 取决于作用域,例如有window的情况下, this = window,否则 等于undefined ...
 *
 * 但是对于对象的函数,谁调用它,它的this就是谁,但是由于this可以发生改变,这就会有安全隐患 ..
 *
 * 所以我们需要通过指定this的类型,来进行this的对象推断 ..
 *
 * 对于对象的函数,一般this能够自动推断,所以我们可以关心普通函数 ... 以及在调用的时候注意传递 this给定类型的对象 ..
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 这里将this的类型指定为字符串 ..
 *
 * 进行this类型声明,第一个参数必须是this名称,且声明类型..
 * @param x
 * @constructor
 */
function ThisFunc(x) {
    return this.concat(x.toString());
}
// 不合法,因为没有指定this,此时没有window对象,它的类型无法推断(没有传递this对象)
// console.log(ThisFunc(123))
// 传递参数的时候,不需要传递this参数(因为编译之后,此形参被抹除了)
console.log(ThisFunc.call("234", 234));
/**
 * 既然如此,那么大多数函数声明方式都支持 this声明,包括 对象的函数,因为它们都有符合函数定义的方式之一 ..
 */
class MyThis {
    getValue() {
        return "getValue";
    }
}
const valueObj = {
    getValue1: function (x) {
        return 'getValue';
    },
    // getValue(this: MyThis): string {
    //     return '123';
    // },
    getValue() {
        return 123;
    }
};
let value = valueObj.getValue();
console.log(value);
let a = {
    getValue(x, y) {
        return x;
    }
};
