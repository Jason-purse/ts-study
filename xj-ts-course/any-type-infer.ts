/**
 * any 类型推断
 *
 * 在编译时进行提示
 */

class Persion {
    print() {

    }
}

let value = new Persion();

// 编译时保护
// 但是在编写的时候,却没有提示保护 ..
// 所以这是一点不足(tslint的问题???)
// 这也没办法处理 ...
value.show();


// 如果在value 为any的时候,那么编译会通过,在实际运行时才报错,那么这更可怕
let valuee: any = new Persion();
// 运行时 报错
valuee.show();