/**
 * 类型约束,本质上就是一件事 ..
 *
 * 对给定的一个类型进行约束 ..
 *
 * 例如某些类型具有相同的特性,其实就是面向接口编程,但是我需要最终具体的类型(而不是对应的那个接口)
 */

interface A {

    printf(): void;
}


function Calc<T extends A>(arg: T): T {
    arg.printf()
    return arg;
}

// 这样当我调用Calc的时候,最终返回的时候 并不会丢失类型 ..(也就是并不是A接口类型)


/**
 * 结合keyof 使用
 */

let obj = {
    name: "123",
    age: 234,
    email: '61722',
    0: 345
}

function getProperty<O, K extends keyof O>(obj: O, key: K): O[K] {
    return obj[key]
}

let nameProperty = getProperty(obj, "email");
let zeroProperty = getProperty(obj, 0);

/**
 * 可以知道的是 keyof O 表示的是将对应的类型中的key的类型拿出来 .. 那么很明显是一个联合类型(并且是一个 常量类型联合,那么它们的实例,就是一个常量)
 *
 * 但是一个类型也是可以 遍历的 ..
 */
type Type = keyof typeof obj;

/**
 * 下面变量一个类型
 *
 * 根据key的类型来得到 值的类型 ..
 */
type MyIntf<T> = {
    [index in keyof T]: T[index]
}

// 比如我有一对象,然后想根据它赋值并创建一个新对象 ..
/**
 * 这种叫做映射类型 ...
 * @param arg
 * @constructor
 */

function Obj<T>(arg: T): T {
    return arg;
}

let value = Obj({
    name: "123",
    age: 43,
    data() {
        return `${this.name} - ${this.age}`
    }
})

type ValueType<T> = {
    [index in keyof T]: T[index]
}

/**
 * 提示的时候,是常量类型,但是不影响传递 真正类型的实例 ..
 */
let aa: ValueType<typeof value> = {
    name: '小米',
    age: 23,
    data(): string {
        return '234';
    }
}

console.log(aa.name)

export {}