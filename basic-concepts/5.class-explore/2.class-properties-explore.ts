/**
 * 一个类支持 私有属性以及开放属性, 以及类属性和实例属性
 *
 * 私有和开放 通过修饰符来修饰 public / private protected,默认的属性都是public的 ..
 *
 * 其次 还可以通过readonly 声明只读属性
 *
 * 以及 属性的getter / setter
 *
 * 以及 参数属性(在构造器参数上添加 修饰符 或者 readonly 来自动作为一个类的属性)
 */

class ClassExplore {

    private _name: string;

    readonly value: string;

    constructor(name: string, value: string,
                private age: number) {
        this._name = name;
        this.value = value;
    }

    // getter / setter
    set name(name: string) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

}

/**
 * 通过参数属性  来直接设定一个类的属性
 */
class ClassProperties {
    constructor(private name: string,public age: number,protected  value: string,readonly email: string) {

    }
}



