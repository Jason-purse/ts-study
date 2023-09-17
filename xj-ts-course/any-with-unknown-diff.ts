/**
 * any 和 unknown的区别
 *
 * any 不进行类型校验, unknown 需要进行类型校验
 *
 * 也就是说,将一个any 传递给任何类型的变量将不会有问题,
 * 但是将一个unknown 传递给其他类型的变量将进行类型校验 ....
 *
 * 其次 as 是专门用于对as 或者 unknown 类型进行断言的,其他类型想要断言为另一个类型
 * // 只能通过 as any as xx 或者 as unknown as xxx 来实现
 */

let value: any = 2131

// 没有报错
let valueString: string = value;

let valueUnkown: unknown = 123;

// 一个Unkown 不能直接给 string
// let valueString1: string = valueUnkown;
let valueString1: string = valueUnkown as any as string;
let valueString2: string = valueUnkown as unknown as string;

let a = '12'

// 记住它只是一种断言,不代表真的是那种类型
let b : number = a as unknown as number;

// string
console.log(b+1)
// string
console.log(typeof b)
// number
console.log(b++)

export {

}


