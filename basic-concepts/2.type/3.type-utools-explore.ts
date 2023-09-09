/**
 * 对于类型的获取并使用 有一些技巧
 *
 * 假设我们声明了一个函数类型,我们如何更快速的引用这个类型呢?
 */


function add(x: number, y: number): number {
    return x + y;
}

/**
 * 作为形参的时候,可以通过通过typeof 拿出这个函数的类型 ...
 * @param x
 */
function call(x: typeof add) {
    return x(10, 20)
}

/**
 * 拿出一个函数(类型,构造器)的this 类型
 */

type addThisType = ThisParameterType<typeof add>;

/**
 * 通过 type 提取类型(而不是通过变量)
 */
type AddType = typeof add;

// 这个东西不知道是什么(作为js 执行来说,它就是一个function)
const AddTypeVariable = typeof add;

console.log(AddTypeVariable)

// 其实就是这个add 函数的类型
let addFun: AddType = add;


let value: (x: number, y: number) => number = function (x, y) {
    console.log("value add")
    return x + y;
}
/**
 * 这也证明, 这存在编译器欺骗 ..
 * 但这无所谓,静态解析 不会产生类膨胀,没有其他强类型语言的缺点 ..
 */
type ValueType = typeof value;

let value1: ValueType = value;
let value2: ValueType = add;

console.log(value1(1, 2));
console.log(value2(1, 2));


/**
 * 拿取没有this的函数类型
 */

function valueThisFunc(this: string, x: number, y: number): number {
    return x + y;
}

// 放在这个类型上,和vscode不同,需要在具体的类型声明上的变量上才能看到具体类型
type PureAddFuncType = OmitThisParameter<typeof valueThisFunc>

// 例如 pureValue 能够看到类型是什么
let pureValue: PureAddFuncType = add;


/**
 * 上下文类型绑定,假设我有一个对象,但是我有许多方法,并且需要使用的是其他类型的this,也就是上下文需要再缩小一步 ..
 * 此时它就上场了 ..
 */

type ScopeType = ThisType<People[]>


interface Good {
    name: string,
    price: number
}


type People = {
    goods: Good[]
}

type PeopleCollection = {
    peoples: People[]
}

type CompanyGift = {
    collection: PeopleCollection,
    getGoods: () => People[]
}

const peopleInfos: CompanyGift & ThisType<PeopleCollection> = {
    collection: {
        peoples: [
            {
                goods: [
                    {
                        name: '123',
                        price: 234
                    }
                ]
            }
        ]
    },
    // 虽然这里的this 上下文类型已经是 PeopleCollection,但是真正在调用的时候,还是需要指定this ..
    // 并且如果 webstorm 无法提示这些类型,初始化tsConfig.json 即可 ..
    getGoods: function (): People[] {
        return this.peoples;
    }
}

console.log(peopleInfos.getGoods.call(peopleInfos.collection));

