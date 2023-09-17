/**
 * 元组
 *
 * 元组要求你的某个位置必须是什么类型
 */

let a: [string, number, boolean] = ['12', 23, false]

// 所以当我们将一个数组进行 as const 形成一个新的对象的时候 实际上是一个新的元组(而且是只读元组)
// 并且形成的是自变量 元组类型
let value = ['12', 23, false] as const


type Tuple<T> = {
    - readonly [index in keyof T]: T[index]
}

// 可读可写的自变量元组 ..
let value2: Tuple<typeof value> = ['12', 23, false]


export {}