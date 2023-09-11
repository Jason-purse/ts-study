/**
 * 泛型接口 / 类
 *
 * 泛型变量 T 本身也可以提供默认类型,这很好理解,当你没有提供类型的时候,我们默认让它是某一种类型
 *
 * 对于接口和类是一样的 ..
 */

interface MyIntf<T = string> {
    value: T
}

function Calc<T = any>(arg?: T): T | undefined {
    return arg;
}


let calc = Calc(true)

let calcType = Calc([])
const value: any = {name: 'value'}

let calcTypee = Calc(value)

// 不传递参数的时候,给定了一个默认类型..
let valuee = Calc()

let valueee = Calc(null)
export {}