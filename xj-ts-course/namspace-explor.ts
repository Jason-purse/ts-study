/**
 * 命名空间
 *
 * 是一种作用域范围的划分
 * 命名空间的东西 需要暴露你才能在外部进行使用
 */

namespace User {

    export namespace Books {

        export function getBooks() {
            return ['java','js','python']
        }
    }
}

console.log(User.Books.getBooks())

