/**
 * 类的简单使用
 *
 * 1. 对于属性的严格初始化 都是顺理成章的 ..
 *
 *      也就是说tsconfig.json 默认应该是开启了 strictPropertyInitialization = true
 *
 *      如果确实不想给初始化值,可以给一个不为空的提示
 */

class MyClass {
    /**
     * 虽然我们没有初始化,但是我们通过! 来表示它非空 ..
     */
    name!: string
    age: number

    constructor() {
        this.age = 123;
    }

}