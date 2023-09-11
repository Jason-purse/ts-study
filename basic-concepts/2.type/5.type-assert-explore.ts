namespace typeAssert {
    /**
     * 类型断言 as 关键字
     */

// 断言某个对象是什么类型
// 但是以下的断言必然失败
// const value = 1 as string;


// 如果就是想要断言一个对象是特定类型

    let value: number | undefined | null = 1;

// 这样 通过unknown as 来对一个未知类型断言,将不会进行类型推断,但是如果真要这么做,需要小心注意 ..
// 因为value在这里确实并不是一个 string
    const stringValue = value as unknown as string;


    /**
     * 非空断言  !
     */
    let valuee: string | undefined | null = undefined;


    // 虽然valuee 是空的,但是我们可以使用 ! 进行非空断言
    console.log(valuee!.length)


    /**
     * 可选断言 ?,只能用在对象类型上 ...
     */

    let valueee = {
        name: null
    }

    console.log(valueee?.name)

    // 不合法
    // console.log(valuee?.length)
    // 除了基础类型之外,都是对象类型
    // 自变量,类实例 函数 /  对象 /构造器
    let obj = {
        name: {
            age: null
        }
    }
    console.log(obj?.name?.age)
}



