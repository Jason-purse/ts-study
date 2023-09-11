namespace objectPropertyDescriptorExplore {
    /**
     * 对象的属性描述符
     *
     * 前面我们已经知道了 只读属性 readonly ..
     *
     * 那么属性也可以是可选的
     *
     * 默认是非空属性
     */

    interface MyInterface {
        /**
         * 可选为空属性
         */
        name?: string
        /**
         * 非空属性
         */
        age: string

        /**
         * 只读属性 ...
         */
        readonly value: number
    }
}
