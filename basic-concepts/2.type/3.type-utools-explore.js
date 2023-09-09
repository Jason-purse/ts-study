"use strict";
/**
 * 对于类型的获取并使用 有一些技巧
 *
 * 假设我们声明了一个函数类型,我们如何更快速的引用这个类型呢?
 */
function add(x, y) {
    return x + y;
}
/**
 * 作为形参的时候,可以通过通过typeof 拿出这个函数的类型 ...
 * @param x
 */
function call(x) {
    return x(10, 20);
}
// 这个东西不知道是什么(作为js 执行来说,它就是一个function)
const AddTypeVariable = typeof add;
console.log(AddTypeVariable);
// 其实就是这个add 函数的类型
let addFun = add;
let value = function (x, y) {
    console.log("value add");
    return x + y;
};
let value1 = value;
let value2 = add;
console.log(value1(1, 2));
console.log(value2(1, 2));
/**
 * 拿取没有this的函数类型
 */
function valueThisFunc(x, y) {
    return x + y;
}
// 例如 pureValue 能够看到类型是什么
let pureValue = add;
const peopleInfos = {
    collection: {
        peoples: [
            {
                goods: [
                    {
                        name: '123',
                        price: 234
                    }
                ]
            }
        ]
    },
    getGoods: function () {
        return this.collection;
    }
};
console.log(peopleInfos.getGoods.call(peopleInfos.collection));
