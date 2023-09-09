"use strict";
/**
 * 3.参数的默认值
 *
 * 以及参数的可选值
 *
 *
 * 本质上,由于类型推断,如果一个形参具有默认值,那么它是可以接受undefined,也就是它在使用的时候,类型是一个number | undefined的联合类型
 */
function argumentExplore(x, y = 123) {
}
//合法的
argumentExplore(12, undefined);
/**
 * 可选参数的类型 同具有默认值的形参,例如下面的x 的类型是  number| undefined的联合类型
 * @param x
 */
function argumentOptionalExplore(x) {
}
// 合法的
argumentOptionalExplore(undefined);
