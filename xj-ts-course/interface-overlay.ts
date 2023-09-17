/**
 * 接口重叠,也就是合并
 *
 * 多个相同接口,将合并定义
 *
 * 并且方法类型定义(组成要素: 方法名,方法参数)
 */

{


    interface B {

        printf(): void
    }


    interface B {
        printf(): any
    }


    let a: B  = {
        // 方法签名 根据名称和参数定义 ... 不依据返回值
        printf(): any {
            console.log("printf")
        }
    }

}