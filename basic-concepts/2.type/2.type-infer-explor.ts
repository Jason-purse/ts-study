namespace typeInferExplore {
    /**
     * 2. ts 类型断言仅仅是一个提示,为了让js更好用,以下示例可能会让人疑惑
     *
     *
     * 仅仅是比较这个类型是否具有这些属性
     *
     * 这个规则在形参为对象声明类型时有所不同,例如传入的也是对象声明类型(自变量对象)
     *
     *
     * 原因是 ts 进行类型检测是使用鸭子类型
     *
     * 假设一只鸟 走起路来像鸭子, 飞起来像鸭子 等等其他行为像鸭子,那么你可以把它当做鸭子 ..
     *
     * 也就是演变过来,一个类型如果具有其他类型的特性,那么可以将其他类型当做这个类型 ...
     */

    type Person = {
        name: string,
        age: string
    }

    const p = {
        name: '123',
        age: '234',
        email: '234',
        type: '234'
    }

    const person: Person = p;


    function typeInfer(variable: { length: number }) {

    }

// 不合法
// typeInfer({length: 2, name: 123})


    class Personn {
        constructor(public name: string, public age: number) {

        }

    }


    class Dog {
        constructor(public age: number, public name: string, public email: number) {
        }
    }

    /**
     * 这是允许的,原因就是它是鸭子类型 检测
     */
    const person1111: Personn = new Dog(12, "小狗", 123);

    function personTestFunc(person: Personn) {

    }

// 此时的自变量对象,必须一一对应属性
    personTestFunc({age: 123, name: '234'})

    class PersonWithNew {
        constructor(public age: number,public name: string,public length: string) {
        }
    }
    const person222: { age: number, name: string, length: string } = {
        age: 123,
        name: 'person',
        length: '23423'
    }


// 这样可以的原因是,person222的类型不是object 自变量,而是 {age: number,name: string,length: string} 根据类型检测,符合鸭子类型 ..
    personTestFunc(person222)

// 因此如果想要传递符合给定类型的不同对象自变量,那么最好提供自变量的类型 .. 或者 as any 或者 as Person 即可
    personTestFunc({age: 123, name: '234', length: '234'} as any)


    /**
     * 总结就是 严格的自变量对象类型检测
     *
     * 1. 当一个自变量对象类型产生的时候,它被认为是新鲜的 。。
     * 2. 当将它分配给一个变量或者传递给一个参数的时候,会严格检查指定类型的属性是否存在(一一相等) ..
     * 3. 当将它进行断言或者对象自变量的类型扩大的时候, 新鲜度会消失 ..
     *
     * 这就是是为什么将一个分配了自变量的变量传递给参数的时候,是合法的 ...
     * 原因是 自变量类型 扩大为一个class所指定的类型
     */


    function personTestOptFunc(value?: Personn) {

    }
}