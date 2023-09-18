/**
 * 自定义Promise 实现
 *
 * 但是还没有 进行类型定义 ...
 */
enum Status {
    FULFILLED,
    PENDING,
    REJECTED
}

// @ts-ignore
class MyPromise {

    private actions: [resolve?: any, reject?: any][] = []

    private status: Status = Status.PENDING;

    private value?: any;

    private error?: any;

    private catchFunc?: (err?: any) => any;

    constructor(context: (resolve: any, reject: any) => void) {

        const doResolve = (data: any): any => {
            if (data instanceof MyPromise) {
                return data.then(doResolve, doResolve)
            }
            return data;
        }

        const resolve = (data: any): any => {
            for (let i = 0; i < this.actions.length; i++) {
                let [resolveFunc, rejectFunc] = this.actions[i]
                if (data instanceof MyPromise) {
                    data = data.then((value: any) => {
                        return resolveFunc(value)
                    }, (err: any) => {
                        return rejectFunc(err)
                    })
                } else if (data instanceof Error) {
                    if (this.catchFunc) {
                        let catchFunc = this.catchFunc;
                        this.catchFunc = undefined;
                        data = catchFunc(data);
                    }

                    if (data instanceof Error) {
                        data = rejectFunc && rejectFunc(data)
                    } else if (data instanceof MyPromise) {
                        data = data.then((value: any) => {
                            resolveFunc(value)
                        }, (err: any) => {
                            rejectFunc(err)
                        })
                    } else {
                        data = resolveFunc(data)
                    }
                } else {
                    data = resolveFunc && resolveFunc(data)
                }
            }

            if (!(data instanceof MyPromise)) {
                if (data instanceof Error) {
                    this.status = Status.REJECTED;
                    this.error = data;
                } else {
                    this.status = Status.FULFILLED;
                    this.value = data;
                }
            } else {
                // 加上一个回调
                data.then(resolve, reject)
            }
        }

        const reject = (err: any) => {
            if (this.catchFunc) {
                let catchFunc = this.catchFunc;
                this.catchFunc = undefined;
                err = catchFunc(err)
            }
            if (err instanceof MyPromise) {
                resolve(err)
            } else {
                this.value = undefined;
                this.error = err;
                this.status = Status.REJECTED;
            }
        };

        context(resolve, reject)
    }


    then(resolve?: any, reject?: any): MyPromise {
        if (this.status === Status.PENDING) {
            this.actions.push([resolve, reject])
        } else if (this.status === Status.FULFILLED) {
            let value = resolve && resolve(this.value) || null;
            if (value instanceof MyPromise) {
                return value;
            }
            this.value = value;
            this.status = Status.FULFILLED;
            this.error = undefined;
        } else if (this.status === Status.REJECTED) {
            let error = reject && reject(this.error);
            if (error instanceof MyPromise) {
                // @ts-ignore
                return error;
            }
            this.error = error;
            this.status = Status.REJECTED;
            this.value = undefined;
        }
        // @ts-ignore
        return this;
    }

    catch<Z>(callback: (err?: any) => any): MyPromise {
        let doCallback = callback;
        callback = (error): Z => {
            try {
                return doCallback(error)
            } catch (e: any) {
                return e;
            }
        };
        if (this.status === Status.PENDING) {
            if (this.catchFunc) {
                return this.then((data: any) => data, callback)
            } else {
                this.catchFunc = callback;
            }
        } else if (this.status === Status.REJECTED) {
            // 作为then 的子句处理
            let value = callback(this.error)
            if (value instanceof MyPromise) {
                return value;
            }

            if (value instanceof Error) {
                this.error = value;
                this.value = undefined;
                this.status = Status.REJECTED;
            } else {
                this.error = undefined;
                this.value = value;
                this.status = Status.FULFILLED;
            }
        }

        return this;
    }

    static resolved(data?: any): MyPromise {
        return new MyPromise((resolve) => {
            resolve(data)
        })
    }

    static rejected(data?: any): MyPromise {
        return new MyPromise((_, reject) => {
            reject(data)
        })
    }

}


// let promise = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(123)
//     }, 300)
// })
//     .then((data: any) => {
//         console.log(data)
//     })
//
// let promise = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         reject(123)
//     }, 300)
// }).catch(err => {
//     console.log("error" + err)
// });


// let promise = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         reject(123)
//     }, 300)
// }).catch(err => {
//     console.log("error" + err)
//     return 123;
// }).catch(err => {
//     console.log("err2" + err)
// })
//     .then((data: any) => {
//         console.log("错误恢复的结果" + data)
//     })


// let promise  = MyPromise.resolved(123)
//     .then((data: any) => {
//         console.log("success " + data)
//     })


// let promise = MyPromise.rejected(123)
//     .then(undefined, (err: any) => {
//         console.log("error: " + err)
//     })


// let promise = MyPromise.rejected(123)
//     .catch(err => {
//         console.log("错误" + err)
//         throw new Error("12312")
//     })
//     .catch(err => {
//         console.log("错误处理2" + err)
//         return 2;
//     })
//     .then((data: any) => {
//         console.log("恢复数据为空," + data)
//     })


// let promise = MyPromise.resolved()
//     .then((data: any) => {
//         console.log("one")
//         return new MyPromise((resolve, reject) => {
//             console.log("two")
//             setTimeout(() => {
//                 console.log("four")
//                 resolve("345")
//             },2000)
//         })
//     })
//     .then((data: any) => {
//         console.log("three")
//         setTimeout(() => {
//             console.log("five")
//         })
//     })

// 比较之后发现两者一致 ...
console.log("real promise print")
let realPromise = Promise.resolve()
    .then((data: any) => {
        console.log("one")
        return new Promise((resolve, reject) => {
            console.log("two")
            setTimeout(() => {
                console.log("four")
                resolve("345")
            }, 2000)
        })
    })
    .then((data: any) => {
        console.log("three")
        setTimeout(() => {
            console.log("five")
        })
    });


type ContextCallback<S extends any> = {
    (resolve: (value: S) => void, reject: (value: S) => void): void
}
type ResolveFunc<S, Y extends (S | HPromise<any> | any)> = {
    (data: S): Y extends HPromise<infer V> ? HPromise<V> : Y;
}

type RejectFunc<S, Y extends (S |  HPromise<any> | Error | any)> = {
    (data: S): Y extends HPromise<infer V> ? HPromise<V> : Y;
}


/**
 * 尝试对Promise 进行 类型声明
 */

type HPromiseConstructor<S> = {

    new(contextCallback: ContextCallback<S>): HPromise<S>

    then<X>(resolve: ResolveFunc<S, X>, reject: RejectFunc<S,X>): HPromise<X>
}

type  HPromise<S> = {

    // 使用分发类型(类型分发)
    then<X,Y>(resolve?: ResolveFunc<S,X>, reject?: RejectFunc<S,  Y>):X extends  HPromise<infer V> ? Y extends HPromise<infer U>? HPromise<V | U> :  HPromise<V | Y> : Y extends HPromise<infer U> ? X extends HPromise<infer V> ? HPromise<V | U> : HPromise<U | X>: HPromise<Y | X>

}

class HPromiseInternal<S extends Error | any> implements HPromise<S>, HPromise<S> {

    private value: any;

    private status: Status = Status.PENDING;

    private error?: any;

    private catchCallback: any;

    private actions: [ResolveFunc<S, any>?, RejectFunc<S, any>?][] = []

    constructor(context: ContextCallback<S>) {
        const doResolve = (data: any): any => {
            if (data instanceof HPromiseInternal) {
                return data.then(doResolve, doResolve)
            }
            return data;
        }

        const resolve = (data: any): any => {
            for (let i = 0; i < this.actions.length; i++) {
                let [resolveFunc, rejectFunc] = this.actions[i]
                if (data instanceof HPromiseInternal) {
                    data = data.then((value: any) => {
                        return resolveFunc && resolveFunc(value)
                    }, (err: any) => {
                        return resolveFunc && rejectFunc(err)
                    })
                } else if (data instanceof Error) {
                    if (this.catchCallback) {
                        let catchFunc = this.catchCallback;
                        this.catchCallback = undefined;
                        data = catchFunc(data);
                    }

                    if (data instanceof Error) {
                        data = rejectFunc && rejectFunc(data as any)
                    } else if (data instanceof HPromiseInternal) {
                        data = data.then((value: any) => {
                            resolveFunc(value)
                        }, (err: any) => {
                            rejectFunc(err)
                        })
                    } else {
                        data = resolveFunc(data)
                    }
                } else {
                    data = resolveFunc && resolveFunc(data)
                }
            }

            if (!(data instanceof HPromiseInternal)) {
                if (data instanceof Error) {
                    this.status = Status.REJECTED;
                    this.error = data;
                } else {
                    this.status = Status.FULFILLED;
                    this.value = data;
                }
            } else {
                // 加上一个回调
                data.then(resolve, reject)
            }
        }

        const reject = (err: any) => {
            if (this.catchCallback) {
                let catchFunc = this.catchCallback;
                this.catchCallback = undefined;
                err = catchFunc(err)
            }
            if (err instanceof HPromiseInternal) {
                resolve(err)
            } else {
                this.value = undefined;
                this.error = err;
                this.status = Status.REJECTED;
            }
        };

        context(resolve, reject)
    }

    then<X,Y>(resolve?: ResolveFunc<S, X>, reject?: RejectFunc<S, Y>):X extends  HPromise<infer V> ? Y extends HPromise<infer U>? HPromise<V | U> :  HPromise<V | Y> : Y extends HPromise<infer U> ? X extends HPromise<infer V> ? HPromise<V | U> : HPromise<U | X>: HPromise<Y | X>{
        let resolved = resolve&& resolve(this.value);
        if (this.status === Status.PENDING) {
            this.actions.push([resolve, reject])
        } else if (this.status === Status.FULFILLED) {
            let value = resolve && resolve(this.value);
            if (value instanceof HPromiseInternal) {
                return value as any;
            }
            this.value = value;
            this.status = Status.FULFILLED;
            this.error = undefined;
        } else if (this.status === Status.REJECTED) {
            let error = reject && reject(this.error);
            if (error instanceof HPromiseInternal) {
                return error as any;
            }
            this.error = error;
            this.status = Status.REJECTED;
            this.value = undefined;
        }
        return this as any;
    }


}

// 种类确实实现了至少就两种联合类型的提醒,但是写了大量的类型分发, 这种已经远远大于 需求值了 ..
// 还不如any 结合 as Type来实现编程 。。。

let promise = new HPromiseInternal<number>((resolve, reject) => {
    resolve(123)
})
    .then(data => {
        return 234;
    }, err => {
        return new HPromiseInternal<string>(resolve => {
            resolve("234234")
        })
    })
    .then(value => {

    }, err => {

    })

