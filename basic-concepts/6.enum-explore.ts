/**
 * 枚举
 *
 * 枚举本身是有值的,它的值可以是数字或者字符串
 */

enum MyEnum {
    zero,
    one = 'one',
    two = 'two',
    three = 'three'
}

/**
 * 枚举如果值是数值,那么它的值将会自增(当前属性的后一个)
 *
 * 你能够根据提示看到他们的值 ..
 */
enum MyEnumm {
    one,
    two,
    three = 3,
    four = 10,
    ten
}