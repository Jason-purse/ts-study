/**
 * 索引签名
 *
 * 官方要求索引签名可以使用 string / symbol 等等类型的联合类型作为索引的类型, 值的类型也可以是联合类型 ..
 *
 * 但是索引签名可以有多个 ..
 *
 * 其次,对于string类型的索引签名,它的返回值类型必须是 number类型的索引签名的返回值类型的超类
 *
 * 因为number类型的索引签名 在访问的时候转换为字符串进行访问 ...
 *
 * 其次,对于索引类型,会对对象的属性进行约束,不合法的属性类型(不匹配索引签名会引起报错)
 */

type ValueInterface = {
    [index: string]: string;

    [index: number]: string;
}

const array: ValueInterface = ["12", "23", "34"] as unknown as ValueInterface

let value = array[0];

console.log(value)


interface IterableCollection {
    // 不合法
    // [index: string]: string
    [index: number]: string

    length: number
}

// 你可能会很疑惑,既然是通过数值索引,为啥index: string 签名不可以 ..
// 跟ts 处理机制有关系 .
const values: IterableCollection = ['1', '2', '3']

console.log(value.length)
console.log(values[0])


// 其次可以换一种思路,自变量对象的严格类型检测,string[] 包含了其他的方法例如,forEach / map等方法
// 此时,我们的索引签名[index: string]: string,就不符合要求了,因为索引签名对属性有约束 ..

// 那么我们怎么让它移除这个限制呢? 第一个 断言
const stringArray: string[] = ['1', '2', '3']

interface StringIndex {
    [index: string]: string
}

// 假设我们将
const strIndex: StringIndex = stringArray as unknown as StringIndex


// 第二个, 扩大类型范围
const stringArrayObj: any = stringArray
// 由于扩大了类型范围,所以 不在精确检查
const strIndex1: StringIndex = stringArrayObj;


// 第三个鸭子类型处理
// 这是一个没有索引签名的 类实现
class ValueInterfaceWithArray extends Array {

}

// 完美进行类型扩充(也符合鸭子类型策略)
const arrayWith: ValueInterfaceWithArray = stringArray

// 所以索引签名的正确使用需要特定场景 ..
class ValueWide extends Array {
    // 如果返回值不加any,那么 Array 对象上通过array["xxx"] 返回的东西不一定是 string
    // 这就是索引签名的强制约束 ...
    // 不合法,所以它的返回值类型太多了,列举不完 ...
    // 这个时候,就需要利用 ts的工具类,来列举出 string[]的所有返回值类型
    // [index: string]: string | Function | number | object | null | undefined | string[] | RegExpMatchArray | never | void | symbol;
    // [index: symbol]: any;

    [index: number]: string | number;
}
const arrayWithTwo: ValueWide = stringArray

// 最终解决方案
// 根据索引 拿到一个类型的所有值的类型
type AAA<Type> = ValueWide & {
    [index in keyof Type]: Type[index];
}

const tt: AAA<string[]> = stringArray


function iterable(value: ValueWide) {
    value.forEach((value,index) => {
        console.log("index: " + index + " ,value: " + value)
    })
}

// 类型放大,不严格检查 ..
iterable(tt)

export {}
