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
 * 1. 函数类型表达式,通过type 或者接口关键字定义即可
 */
type Call1 = (x: number) => number

/**
 * 这种分开初始化 必须保证是let 修饰符
 */
let Call4: (x: number) => number;

Call4 = function (x): number {
    return 123;
}

/**
 * 或者通过const 声明并初始化
 */
const Call5: (x: number) => number = (x) => 123;


/**
 * 2. 调用签名
 */
interface Call2 {
    (x: number): number
}

/**
 * 2. 具有属性的调用签名
 */
type Call6 = {
    name: string
    (x: number): number
}

/**
 * 2. 构造签名
 */
type Call7 = {
    new(x: number): NumberClass
}


/**
 * 3. 函数声明
 */

function Call3(x: number): number {
    return 123;
}

function newFunc(constructor: Call7): NumberClass {
    return new constructor(123);
}

class NumberClass extends Number {
    constructor(number: number) {
        super(number);
    }
}

const number = newFunc(NumberClass);

console.log(number == 123)


