/**
 * 泛型类型 深究
 *
 * 1. 条件泛型类型
 * 等价于三元运算符,本质上是对类型进行断言判断,如果是否为一个类型,否则为另一个类型
 *
 * 这个可能只有在具有特定需求时你才可能会使用 ..
 *
 * 下面的示例只是展示它可以这样使用
 */

/**
 * 假设我们有一堆 重载函数 ...
 */

function add(x: string, y: string): string


function add(x: number, y: number): number


// 但其实,我们可以通过泛型来处理这种重载,或者说 通过泛型来使用一种接口约束他们的通用行为,具体行为 取决于行为中的方法调用实现 ...

// 1. 通过泛型实现(并通过条件类型来确定返回值类型)
// 注意此方法必须写在通用方法之前

function add<T extends string | number>(x: T, y: T): T extends string ? string : number;

function add(x: any, y: any): any {
    return x + y;
}

// 2. 通过接口实现 面向接口编程
interface AddInterface<T> {

    getvalue(): number

    add(other: T): T;
}

function addd<T extends AddInterface<T>>(x: T, y: T): T {
    return x.add(y);
}

class MyNumber implements AddInterface<MyNumber> {
    constructor(private value: number) {
    }

    add(other: MyNumber): MyNumber {
        return new MyNumber(other.getvalue() + this.getvalue());
    }

    getvalue(): number {
        return this.value;
    }
}


console.log(add(2, 3));
// 并且不会丢失类型 ...
console.log(addd(new MyNumber(10), new MyNumber(20)))


/**
 * 以及在条件类型的 其他类型推断 infer
 *
 * 官方定义是,在泛型中进行 条件类型的时候,可以选择推断参数类型或者返回值类型(在条件为真的情况下使用推断结果)
 */

type InferFunc<T extends ((...args: any) => any)> = T extends ((...args: any) => infer R) ? R : never

function sum(x: number, y: number): number {
    return x + y;
}

// 推断返回值
// number
type funcReturnType = InferFunc<typeof sum>


type InferArgFunc<T extends (...args: any) => any> = T extends (...args: infer R) => any ? R : never

// 推断参数类型
// [number,number]
type funcArgType = InferArgFunc<typeof sum>


/**
 * 分发类型
 *
 * 当在泛型中传入的是一个联合类型的时候,会导致 进行类型分发
 *
 * 也就是会将每一个类型来执行类型条件
 *
 * 这里的条件类型  可以不给extends的具体类型,那么默认是继承自身
 */

type ConditionType<T> = T extends infer R ? R[] : any;

// 将会导致一个string[] | number[]
type unionType = ConditionType<string | number>

// 但是其实我们可能想要的是 (string|number )[]
// 很显然上述的示例 会给我们错误的结果

export {}


