/**
 * 有一些ts的内置工具,可以让我们更好的使用泛型
 *
 * 1.Partial<T> 将一个类型的所有属性变为可选
 * 2.Required<T> 将一个类型的所有属性变为必选
 * 3. Readonly<T> 将一个类型的所有属性变为只读
 * 4.Record<Keys,Type> 将新的类型的所有key 来自keys,值的类型等于Type
 *
 *      那么Keys 必然是一个联合类型,那么联合类型有一个特点,那就是能够通过keyof 取去这个类型中的其中一个类型
 * 5. Pick<Type,Keys> 从一个类型中挑选一些属性
 * 6. Omit<Type,Keys> 过滤一个类型中的一些属性
 * 7.Exclude<UnionType,ExcludedMembers> 从联合类型中,排除一些成员,留下其他类型形成新的联合类型
 * 8.Extract<UnionType,ExtractMembers> 从联合类型中,提取一些成员,形成新的联合类型,同7,相反作用
 * 9.NonNullable<UnionType> 从联合类型中 产生新的联合类型,剔除掉可能为空的类型形成新的类型
 * 10.ReturnType<T> 获取指定函数的返回值类型
 * 11. InstanceType<T> 实例类型 本质上就是用来获取构造函数的创建的实例类型,也就是需要传入构造器函数(一般就是类),来确定它创建出来的类型是什么
 *      类似于反射,在我们知道类型的时候没有必要用它,但是当通过一个构造签名(泛型) 就可以通过传入泛型来决定这个构造器返回的泛型是什么
 */

type MyRecord<Keys extends keyof any, Type> = {
    // 由于此时 Keys 是一个联合类型.. 那么我们可以直接in 获取其中一个类型
    [index in Keys]: Type
}

// 那么实现也很简单
// 从一个类型中挑选一些属性,无非就是挑选一些来自于这些Type中的key,然后去取 值类型即可
type MyPick<Type, K extends keyof Type> = {
    [index in K]: Type[index]
}

// 实现依旧简单

type MyOmit<Type, Keys extends keyof any> = {
    //变量类型的keys,然后 通过as开启一个判断,是否存在于Keys,如果存在 never
    [index in keyof Type as index extends Keys ? never : index]: Type[index]
}

// 对于排除联合类型中的类型,用类型分发解决
// 为什么? E是Type的类型成员,所以如果extends,那么不需要
type MyExclude<Type, E> = E extends Type ? never : E;
type MyExtract<Type, E> = E extends Type ? E : never;
type MyNonNullable<Type, E> = E extends null | undefined ? never : E;


// 可以通过条件类型来做这个事情 ...
// 注意条件推断 只能发生在返回值声明部分,不支持在泛型声明部分 ..
// 那么对于InstanceType 的实现类似于这个函数
function Cone<T extends (new (...arg: any) => any)>(constructor: T): T extends (...arg: any) => infer R ? R: any {
    return new constructor();
}
function Con<T extends (new (...arg: any) => any)>(constructor: T): InstanceType<T> {
    return new constructor();
}

// 也就是说类型可以通过映射类型产生,也支持类型表达式 ...
type MyInstanceType<T extends (new (...ars: any) => any)> = T extends new (...args: any) => infer R ? R : any