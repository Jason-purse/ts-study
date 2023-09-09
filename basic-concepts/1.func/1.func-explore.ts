/**
 * 主要学习一些基础知识
 */

/**
 * 1. ts对函数的参数的个数处理
 *
 * 对于一个函数类型,如果在调用时传入的函数样式是继承于声明的形式,那么多余声明的参数将会被忽略 ..
 *
 * 但是如果函数样式不同于声明样式,则类型不匹配 ..
 *
 * 本质含义是: 如果一个参数是一个回调函数类型,那么这个回调函数 最好不要声明可选参数类型,除非你确定可以不传对应的参数而调用它 ..
 * 否则,可能会影响你的开发判断 ..
 */

type Callback = (x: number, y?: number) => void

function calc(callback: Callback) {
    return callback(10)
}

// 以下函数形式上是类似于Callback,所以是支持的,对于声明的y则自动被忽略 ...
calc(function (x: number) {
    console.log(x)
})

// 但是官方有一个提示,最好不要写可选参数,除非你想要在不传递它的时候运行 ..
// 当y为可选参数时候,以下函数的时候,则编译抛出错误
// 判断规则是 typeof (一个类型) extends (另一个类型) ? true : false
// 大概是这种判断方式,细节不深究 ..
// calc(function (x: string,y:string) {
//     console.log(x,y)
// })

// 所以一般在调用函数的时候,不需要声明函数的变量的类型,因为已经能够自动推断了 ..

calc(function (x) {
    console.log(x)
})
calc((x, y) => {
    console.log(x, y)
})

/**
 * 2. 带有属性的函数签名(调用签名)
 *
 * 本质上 函数就是对象类型
 */

type CallbackWithProps = {
    /**
     * 函数类型
     */
    value: string,
    (x: number, y: number): void
}


// 创建一个符合 CallbackWithProps 类型的实例
function a(callback: CallbackWithProps) {
    console.log('function value: ' + callback.value + " ,invoke result: " + callback(10, 20));
}

const value: any = (x: number, y: number) => {
    return x + y;
}

value.value = '1231'

a(value)


const callback1: CallbackWithProps = (() => {
    const func = (x: number, y: number) => {
        return x * y;
    }
    func.value = '123'
    return func;
})()

console.log(callback1(10, 10));


/**
 * 3. 构造签名
 *
 *
 * 约定了某一类型的构造器,这特别适合用于工厂模式,用来创建某一类型的对象 ...
 */

type SomeConstructor = {
    /**
     * 这个调用签名,指示了 大家都可以用什么样的构造器 来产生对象
     * @param s 参数
     */
    new(s: string): MyConstructor;
};

class MyConstructor {
    name: string;
    constructor(s: string) {
        this.name = s;
    }
}


function fn(ctor: SomeConstructor) {
    return new ctor("hello");
}


// 此时传入一个构造器 则可以产生对象
console.log(fn(MyConstructor));
