/**
 * 泛型学习 ...
 *
 * 1. 对于const 修饰来说,一个变量所对应的类型将会 直接变成常量类型
 * 2. let 修饰来说,就是具体的类型(而不是作为常量类型)
 */

function typer<T>(arg: T): T {
    return arg;
}

// 类型是  123
const value = typer(123)

// 类型是 "123"
const value1 = typer('123')

// 类型是 true
const value2 = typer(true)

//类型是 false
const value3 = typer(false)

type Value123 = typeof value;

// 只能赋值123
let letValue: Value123 = 123;


console.log(value2 === true);
console.log(value3 === false);

const trueA = new Boolean("123")
// false
console.log(trueA === value2)

const trueB = new Boolean("")

// false
console.log(trueB === value3)

let trueAA = typer(true)
let trueBB = typer(false)

// true
console.log(trueAA === true)
// true
console.log(trueBB === false)

// false
console.log(trueAA === trueA)
// false
console.log(trueBB === trueB)

/**
 *
 * // 这样将得到一个类型(从这里可以看出来,ts 规则依旧有一点问题,这里明明是 true,boolean 类型,但是它却给你错误类型)
 * // 但是反过来想,所有类型都可以是boolean 类型(但是和我们想要的boolean 存在巨大差异)
 * // 解决这种错误,我们需要换一种写法 ...
 */

let typee = typeof typer<boolean>(true)

/**
 * // 注意 下面的写法不允许 typeof 一个值的返回地址 不允许直接是一个类型
 */
// type typee = typeof typer(true)


/**
 * // 如下解决了 上面的错误 ...(尽量声明为一个变量来进行类型推断)...
 * // 通过typeof 一个值的引用可以作为类型 ...
 */
type typeType = typeof trueA;
console.log(typee)

let c: typeType = true;

/**
 * 很可惜 ReturnType 工具无法检测泛型方法的返回值 ..
 所以帮不了我们
 */
export {}