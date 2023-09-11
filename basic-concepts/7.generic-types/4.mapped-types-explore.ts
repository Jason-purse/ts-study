/**
 * 映射的类型 探索
 *
 * type 和接口的不同 本质上就是
 *
 * type 不仅比接口强大,它还可以创建复合类型,例如联合 /  交叉类型,以及映射类型
 *
 * 而接口是创建一个真实存在的类型,而type 并不是真正存在的类型(它可以是类型联合的视图)
 *
 *
 * 在进行映射类型编写的时候,一般需要借助 索引签名,并且可以添加readonly 可选修饰符(也可以对这些修饰符进行删减)  通过 +,-符号进行修饰删除或者补偿 ..
 *
 */

interface A {

    name: string,
    readonly value: number
}

/**
 * 但是这种不好,没有针对特定修饰符的条件映射
 */
type B<T> = {
    [index in keyof T]?: T[index]
} | {
    [index in keyof T]-?: T[index]
} | {
    - readonly [index in keyof T]+?: T[index]
}

type AB = B<A>
let a: AB = {}
console.log(a)
export {}