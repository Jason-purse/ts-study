/**
 * 自变量类型
 *
 * 通过const 可以定义 自变量类型,它的类型实例就是它自身
 */
const values = ['a', 'b', 'c'] as const
console.log(values)

type A = typeof values[0]

// 这里由于ts 检查存在问题,所以忽略这一行 ...
// @ts-ignore
const a: 'a' = 'a';

console.log(a)

const bb = "aa" as const;

const aa = bb;


// A const assertions can only be applied to references to enum members, or string, number, boolean, array, or object literal
// 也就是只能用在枚举成员,字符串,数字/boolean / 数组/ 对象自变量上 .. (不能使用在变量上)
// const valuesType = null as const

