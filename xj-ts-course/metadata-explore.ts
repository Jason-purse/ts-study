/**
 * 一个数据,我们也可以设置元数据
 *
 * 数据就是 对象
 *
 * 首先我们可以通过reflect-metadata感受一下
 */


import "reflect-metadata"

// 这种方式是错误的,因为导出任何东西,但是polyfill 能够 import ... 模块导入并引入
// import * as ReflectMetaData from 'reflect-metadata'

let obj = {
    value: '123'
}
Reflect.defineMetadata("meta1", {name: "value", value: '123'}, obj, 'value')

console.log(Reflect.getMetadata("meta1", obj, "value"));

// 和参数装饰器结合,下面是一个验证参数的方法装饰器和参数装饰器的结合

const RequiredArgDecorator: ParameterDecorator = (target, propertyKey, parameterIndex) => {
    Reflect.defineMetadata("validate", [parameterIndex], target, propertyKey);
}


//
// @ts-ignore
const validatorDecorator: MethodDecorator = (target, propertyKey, descriptor: TypedPropertyDescriptor<Function>) => {
    // let value: (... args: any) => void = descriptor.value;
    // descriptor.value = (...args: any[]) => {
    //     let indexs = Reflect.getMetadata('validate', target, propertyKey) || []
    //     if (indexs.length == 0 || indexs[0] > args.length) {
    //         throw new Error("请传递必要的参数")
    //     }
    //     value(args)
    // }
    console.log(descriptor.get())
}

class ValidatorForm {

    @validatorDecorator
    validate() {

    }
}

