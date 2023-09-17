/**
 * 装饰器 学习
 *
 * 类似于其他语言中的注解
 *
 * 具有很多额外无侵入式的 代码增强特性...
 *
 * 使用这个特性的时候,需要开启tsconfig.json 中的配置来支持
 *
 *     "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators.
 *      "emitDecoratorMetadata":true,                    /* Emit design-type metadata for decorated declarations in source files.
 *
 *
 *      其次,本质上你可以理解为,装饰器中的@ 表示执行一个函数 ..
 *
 *      这个函数可以是其他函数的执行结果,.
 *
 *      也就是你可以通过调用一个函数去返回一个装饰器来作为装饰器函数调用 ..
 *
 *
 * ClassDecorator 类装饰器
 * MethodDecorator 方法装饰器
 *
 *
 *
 * 小知识,在console.log的时候,通过%c,来进行样式占位
 * 这样在打印的时候,即可打印出颜色
 *
 * 可以出打印出特定样式的字体
 * console.log(`%c${....text}`,'color: rea;font-size: 24px')
 */

const moveDecorator: ClassDecorator = (target: object) => {
    console.log(target)
}

const decoratorFactory: (type: string) => ClassDecorator = type => {
    return target => {
        switch (type) {
            case 'Tank':
                target.prototype.playGame = () => {
                    console.log("Tank game")
                }
                break;
            default:
                target.prototype.playGame = () => {
                    console.log('player game')
                }
        }
    }
}

// 虽然MethodDecorator 声明了一种类型, 具体的属性描述符是一个泛型,也就是说在使用的时候,我们可以明确指定属性描述符的具体类型
const methodDecorator: MethodDecorator = (target, propertyKey, descriptor: TypedPropertyDescriptor<any>) => {
    descriptor.value = () => {
        console.log("log")
    }
}

/**
 * 坦克
 */
@moveDecorator
@decoratorFactory('Tank')
class Tank {

}


@moveDecorator
@decoratorFactory('player')
class Player {


    @methodDecorator
    show() {

    }
}

const player = new Player()

player.show()



