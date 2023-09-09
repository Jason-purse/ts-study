/**
 * 自变量类型
 *
 * 通过const 可以定义 自变量类型,它的类型实例就是它自身
 */
const values = ['a', 'b', 'c'] as const
console.log(values)

type A = typeof values[0]

const a: 'a' = 'a';
console.log(a)

const bb = "aa" as const;

const aa = bb;


