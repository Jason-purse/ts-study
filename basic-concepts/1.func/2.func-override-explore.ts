/**
 * 函数重载
 *
 * 先写多个函数重载签名,
 * 然后写一个通用重载函数(但是这个函数不能够被直接调用)
 */

function add(x: number, y: number): number

// 重载签名
function add(x: string, y: string): string

function add(x: Date,y: String): number

/**
 * 通用重载函数
 * @param x
 * @param y
 */
function add(x: any, y: any): any {
    return x + y;
}

// 这样是不合法的,不允许直接调用通用重载函数
// add(1,"23");

const numberResult = add(1, 2);


/**
 * 函数重载和 联合类型的碰撞
 *
 * 假设我们需要对一些类型做一些通用目的的操作,那么此时 这些类型的对象很明显都具有相同的特征来被函数所利用
 *
 * 假设,我们需要数组,字符串类型 计算这些类型的对象的长度
 */

function getLength(array: string[]): number

function getLength(string: string): number


function getLength(any: any): number {
    return any?.length || 0;
}

// 但是可以简写为 联合类型处理

function getLengthOfUnion(variable: string[] | string): number {
    return variable.length;
}

// 但是我们还可以更加通用(通过对象声明类型)
function getLengthOfObj(variable: { length: number }): number {
    return variable.length;
}

const p = {length: 12, name: "234"};

getLengthOfObj("")
getLengthOfObj(p)


