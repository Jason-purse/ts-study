/**
 * as 断言和 非空断言的区别
 *
 * 前者具有后者的好处并且,前者能够在非空断言的基础上断言一个对象属于那种类型
 *
 * 在巩固一遍, ts 只是为了更好的让js 可读,那么这些断言 只是一种辅助性提示 ..
 */


{
    class A {

        html() {

        }
    }

    let a: object | null | undefined = null

    // a 已经判断到是空的

    let b = a!
    let c: A = a as A;

    for (let cKey in c) {
        
    }

    console.log(c)
}