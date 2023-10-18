## 手写 promise+方法

### 前言

在网上阅读过很多关于实现 promise 的文章，大致分为 2 类，一种是基于 promiseA+规范，一种是基于 ECMA 规范和 v8 引擎下的 promise，对于 A+规范可以快速让我们理解 promise 的核心，但对些许情况，难以理解，而 ECMA 规范的 promise 却很难理解，本文会分别对其经行分析

### 1.基于[PromiseA+规范](https://promisesaplus.com/)

### 1.1 前景概要 ：

首先要了解 promiseA+规范只是社区对于开发者实现 promise 提出的一个合理的规范而已，它与 ECMA 规范下的 promise（浏览器下的）有很多区别，但是可以满足大部分工作以及学习需求，而且理解比较简单，我们就来简单实现一个 promise 以及梳理它的流程

```js
let p1 = new Promise((resolve, reject) => {
  resolve('成功')
})
```

### 1.2 Promise 是构造函数

这是 promise 的起点，通过形式可以看到 promise 属于**构造函数** 我们需要通过 new 关键字来调用，内部接收一个回调函数(我们采用 executor 代理),内部有 2 个参数 resolve，reject 分别是 2 个回调函数，各携带一个参数，所以我们的雏形来了

```js
class MyPromise {
  constructor(executor) {
    const resolve = (value) => {}
    const reject = (reason) => {}
    executor(resolve, reject)
  }
}
```

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/sourcePromise1.webp)
继续通过一段代码了解 promise

### 1.3 Promise 的状态变更

```js
let p1 = new Promise((resolve, reject) => {
  resolve('成功')
  reject('失败')
})
p1.then(
  (value) => {
    console.log(value) //成功
  },
  (err) => {
    console.log(err)
  }
)
let p2 = new Promise((resolve, reject) => {
  reject('失败')
  resolve('成功')
})
p2.then(
  (value) => {
    console.log(value)
  },
  (err) => {
    console.log(err) //失败
  }
)
```

通过上述代码可以知道 Promise 返回一个实例，并且实例带有 then 方法，且 then 方法中包含 2 个回调函数，（我们以 onFulfilled 和 onRejected 代替）可以通过回调函数的参数获取，我们可以通过 resolve 和 reject 函数传递结果，并且通过 then 里面的回调函数接收对应的结果，而且**promise 会通过 resolve，reject 确定状态，一旦确定好状态，就只执行对应的回调函数，忽略其他的 resolve 或者 reject**

因此我们需要来指定状态，并且存储 resolve，reject 的值，从而传递给 then

```js
const [PENDING, FULFILLED, REJECTED] = ['PENDING', 'FULFILLED', 'REJECTED']
class MyPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
      }
    }
    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reaosn)
    }
  }
}
```

上述代码，我们声明了 PENDING(等待),FULFILLED(成功),REJECTED(失败)三个状态，来记录 promise 的状态，并且当 resolve 或者 reject 时，我们立即修改状态，并且将成功或者失败的值存储起来。在 then 的回调函数中通过状态判断来执行对应的回调函数

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/sourcePromise2.webp)

### 1.4 解决异步

但是 promise 是用来解决异步问题的，我们的代码全部是同步执行，还有很多缺陷，例如：

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve('成功')
  })
}, 3000)
p1.then((value) => {
  console.log(value)
})
```

正常情况下会等待 3 秒确定状态，然后执行对应 then 的回调函数，但是我们的代码却不会执行，因为刚才也说过我们的代码全部都是同步执行，没有对 PENDING 状态进行处理，因此我们需要额外对 pending 状态进行处理
代码如下

```js
const [PENDING, FULFILLED, REJECTED] = ['PENDING', 'FULFILLED', 'REJECTED']
class MyPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onFulfilled && this.onFulfilled(value)
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejected && this.onRejected(reason)
      }
    }
    executor(resolve, reject)
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reaosn)
    }
    if (this.status === PENDING) {
      // 存储回调函数
      this.onFulfilled = onFulfilled
      this.onRejected = onRejected
    }
  }
}
```

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/sourcePromise3.webp)
我们在 pending 状态下将 then 的回调函数存储下来，在 status 改变状态后立即执行达到支持异步的效果

### 1.5 then 的微任务？

我们在通过一个例子来完善代码

```js
let p1 = new Promise((resolve, reject) => {
  resolve('成功')
})
p1.then((value) => console.log(value))
console.log(11)
// 11 => 成功
```

通过上述代码，以及 promise 的知识我们应该知道 then 的回调函数实际是将这个回调加入到了微任务队列中
所以先打印 11 然后再打印成功,而我们的代码却并是同步执行，我们需要将 then 的回调函数模拟微任务的形式，这里我们使用 setTimeout 来模拟微任务，修改我们的代码

```js
then(onFulfilled, onRejected) {
        if (this.status === FULFILLED) {
            setTimeout(() => {
                onFulfilled(this.value)
            })
        }

        if (this.status === REJECTED) {
            setTimeout(() => {
                onRejected(this.reason)
            })
        }
        if (this.status === PENDING) {
            this.onFulfilled = onFulfilled
            this.onRejected = onRejected
        }
    }
```

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/sourcePromise4.webp)

### 1.6 存储处理函数的数据结构

这样就可以解决上述 then 的回调要进入微任务的情况，
下一个我们要解决的问题是 promise 多次调用的问题

```js
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功')
  })
})
p1.then((value) => {
  console.log(value, 111)
})
p1.then((value) => {
  console.log(value, 222)
})
```

上述代码会依次打印成功,但是我们的代码不具备这种条件因为**我们的 then 方法中的 onFulfilled 会覆盖第一个 then 的方法的 OnFulfilled** 这个问题也比较好解决，我们只需要通过一个数组将函数存储起来，到时候遍历调用即可
此时完整代码如下

```js
const [PENDING, FULFILLED, REJECTED] = ['PENDING', 'FULFILLED', 'REJECTED']
class MyPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onFulfilledCallbacks.forEach((fn) => fn())
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }
    executor(resolve, reject)
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      setTimeout(() => {
        onFulfilled(this.value)
      }, 0)
    }

    if (this.status === REJECTED) {
      setTimeout(() => {
        onRejected(this.reason)
      }, 0)
    }
    if (this.status === PENDING) {
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}
```

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/sourcePromise5.webp)
接下来我们放松一下，处理点小问题，

### 1.7 trycatch 的引用

```js
let p1 = new MyPromise((resolve, reject) => {
  throw new Error('我要报错')
})
p1.then(
  (value) => {
    console.log(value, 111)
  },
  (err) => {
    console.log(err)
  }
)
```

在 executor 函数中如果报错，如果我们指定了 then 方法的接收函数的话，promise 将其定义为 REJECTED 状态，
那我们只需要简单的 try/catch 进行处理下，遇到错误直接 reject 就完事了（**其实其中大有文章，末尾发链接**）

```
try {
    executor(resolve, reject)
} catch (e) {
    reject(e)
}
```

好了放松完了，我们来点刺激的

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/sourcePromise6.webp)

### 2.Promise 的链式调用

promise 的核心以及最大特点就是链式调用，比如 then 回调函数的返回值会包裹成一个 promise

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/sourcePromise7.webp)
promiseA+规范
2.27 明确说明 then 方法必须返回一个 promsie，并且 onfulfilled 或者 onRejected 返回值需要再次进行处理(the Promise Resolution Procedure），如果出现异常我们需要 reject 出去

```js
then(onFulfilled, onRejected) {
    let promise2 = new MyPromise((resolve, reject) => {
        if (this.status === FULFILLED) {
            setTimeout(() => {
                try {
                    let x = onFulfilled(this.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            }, 0)
        }

        if (this.status === REJECTED) {
            setTimeout(() => {
                try {
                    let x = onRejected(this.reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            }, 0)
        }
        if (this.status === PENDING) {
            this.onFulfilledCallbacks.push(() => {
                try {
                    let x = onFulfilled(this.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
            this.onRejectedCallbacks.push(() => {
                try {
                    let x = onRejected(this.reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        }
    })
    return promise2
}
```

我们按照规范分别对 onFulfilled 以及 OnRejected 的函数返回值做了处理（ResolvePromise 后面再提作用）
也做错了异常检测
2.27.3 与 2.27.4 是对 then 的穿透做处理比较简单
如果 onfulfiled 不是一个函数并且这个 promise 的状态是 fulfilled，返回值 promise2 必须指定为一个 fulfilled 的函数并返回上一个 then 返回的相同的值
如果 onrejected 不是一个函数并且这个 promsie 的状态是 rejected，我们只需要将这个 rejected 的的错误继续抛出即可

```js
onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
onRejected =
  typeof onRejected === 'function'
    ? onRejected
    : (reason) => {
        throw reason
      }
```

这样就简单实现了 then 的穿透，但是只能验证 rejected 的情况，需要将 resolvePromise 函数完成才能达到效果

### 2.1 对 then 的返回值的封装(resolvePromsie)

我们直接从规范 2.3.1 开始

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/sourcePromise8.webp)
如果这个 promise 与返回值 x 相等，则需要 reject 这个类型错误
类似于这种情况：

```js
let p1 = new Promise((resolve, reject) => {
  resolve('成功')
}).then((value) => {
  return p1
  // Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>
})
```

那么我们开始封装 resolvePromise

```js
function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<MyPromise>')
    )
  }
}
```

2.3.2**是针对 x 如果是一个 promise 对象**

需要通过对 PENDING,FULFILLED,REJECTED3 个状态进行
如果 x 处于 pending 状态，那么在成功或者失败前，我们需要保存这个状态，
如果 x 处于 fulfilled 或者 rejected 状态我们只需要重新 resove 或者 reject 出去即可

2.3.3**如果 x 一个对象或者函数**
如果 x 不是一个对象或者函数，那么为普通值我们直接 resolve 出去

```js
function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<MyPromise>')
    )
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
  } else {
    resolve(x)
  }
}
```

初步的模型已经完成，此时关于前面 then 的穿透问题可以大致看出来已经解决

```js
let p1 = new MyPromise((resolve, reject) => {
  resolve('成功')
})
  .then()
  .then()
  .then(
    (value) => {
      console.log(value) // 成功
    },
    (err) => {
      console.log(err)
    }
  )
```

接下来继续按照规范来，从 2.3.1 处开始处理对象或者函数的情况
2.3.1 说假设 x 有一个 then 属性，
2.3.2：在读取属性的时候如果抛出异常则 reject 出去（Object.defineProerty(x,'then',{get(){throw new Error('err')}})）
则代码如下

```js
function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<MyPromise>')
    )
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let then = x.then
    try {
    } catch (e) {
      reject(e)
    }
  } else {
    resolve(x)
  }
}
```

2.3.3 开始对 then 进行处理，如果 then 是一个函数则认为 x 是一个 promise 对象，然后调用它（\
If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise`, where:）并且附带 2 个参数（函数）处理 resolve（参数 y）和 reject（参数 r）这里指的是 2.3.3.3.1 和 2.3.3.3.2
2.3.3.3 的意思是如果 r 和 y 被多次调用或者对某个函数重复调用，第一次调用优先，其他忽略，因此我们指定一个全局变量 called 来控制调用

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/sourcePromise9.webp)
2.3.3.4 的意思是如果调用后抛出异常，这个异常可能在调用 y 或者 r 函数后造成也可能是在之前就抛出的
因此也需要使用 called 来控制是否抛出异常
2.3.4 以及后面的指的是如果 then 不是一个函数或者对象，那么确定 fulfilled 状态 resolve 出去即可
至此完整 resolvePromise 函数封装如下

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/sourcePromise10.webp)

```js
function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<MyPromise>')
    )
  }
  let called = false
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let then = x.then
    try {
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          (r) => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}
```

对了突然想起来对于 executor 函数中的 resolve 封装中，如果 resolve 里面是多层嵌套的 promsie 对象的话例如这样

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/sourcePromise11.webp)

```js
let p1 = new Promise((resolve, reject) => {
  resolve(
    new Promise((resolve, reject) => {
      resolve(11)
    })
  )
}).then((value) => {
  console.log(value)
})
```

我们需要对 resolve 的参数做一个提前的判断处理，如果是 promsie 的实例我们应该调用 then 方法
添加起来非常简单，代码如下

```js
const resolve = (value) => {
  if (value instanceof MyPromise) {
    value.then(resolve, reject)
    return
  }
  if (this.status === PENDING) {
    this.status = FULFILLED
    this.value = value
    this.onFulfilledCallbacks.forEach((fn) => fn())
  }
}
```

至此完整的 promise 实现代码如下

```js
const [PENDING, FULFILLED, REJECTED] = ['PENDING', 'FULFILLED', 'REJECTED']
class MyPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
    const resolve = (value) => {
      if (value instanceof MyPromise) {
        value.then(resolve, reject)
        return
      }
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onFulfilledCallbacks.forEach((fn) => fn())
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })
    return promise2
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<MyPromise>')
    )
  }
  let called = false
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let then = x.then
    try {
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          (r) => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}
```

### 3.Promise 的静态方法以及原型方法

```js
console.log(Reflect.ownKeys(Promise))
console.log(Promise.prototype)
```

通过上述代码可查看 Promise 的静态方法以及原型上的方法

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/sourcePromise12.webp)

话不多说直接动手开干，都走到这一步了，麻烦亲坚持一下

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/sourcePromise13.webp)

### 3.1-Promise.resolve/Promise.reject

这 2 个方法比较简单，直接调用我们之前封装好的 promsie 里面的 resolve 和 reject 函数即可

```js
   static resolve(value) {
        return new MyPromise((resolve, reject) {
            resolve(value)
        })
    }

    static reject(reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason)
        })
    }
```

### 3.2-Promise.all

`不了解的同学点击参考[MDN-Promise.all](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

如果参数不是一个可迭代的对象，那么会报错，并且返回的值需要拿 promise 包裹出去，而且顺序不能变需要注意
代码如下

```js
  static all(promiseArr) {
        let resArr = [],
            idx = 0
        if (!isIterable(promiseArr)) {
            let type = typeof promiseArr
            throw TypeError(`${type} is not a iterable (cannot read property Symbol(Symbol.iterator))
    at Function.all (<anonymous>)`)
        }
        return new Promise((resolve, reject) => {
            promiseArr.map((promise, index) => {
                if (isPromise(promise)) {
                    promise.then((res) => {
                        formatArr(res, index, resolve)
                    }, reject)
                } else {
                    formatArr(promise, index, resolve)
                }
            })
        })

        function formatArr(value, index, resolve) {
            resArr[index] = value
            // if(resArr.length ===promiseArr.length) 在某些时刻不正确，比如数组最后一项先执行完 数组就为[empty,empty,value]
            if (++idx === promiseArr.length) {
                resolve(resArr)
            }
        }
    }
//工具函数封装
function isIterable(value) {
    return value !== null && value !== undefined && typeof value[Symbol.iterator] === 'function'
}

function isPromise(x) {
    if ((typeof x === 'object' && x !== null) || typeof x == 'function') {
        let then = x.then
        return typeof then === 'function'
    }
    return false
}


```

### 3.3-Promise.allSettled

与 promise.all 的实现思想大差不多，只不过返回的数组里面包含的表明状态的对象，而且不管是成功或者失败都收集起来

```js
static allSettled(promiseArr) {
        let resArr = [],
            idx = 0
        if (!isIterable(promiseArr)) {
            let type = typeof promiseArr
            throw TypeError(`${type} is not a iterable (cannot read property Symbol(Symbol.iterator))
    at Function.all (<anonymous>)`)
        }

        return new MyPromise((resolve, reject) => {
            if (promiseArr.length === 0) {
                resolve([])
            }
            promiseArr.forEach((promise, index) => {
                if (isPromise(promise)) {
                    promise.then(
                        (value) => {
                            formatArr('fulfilled', value, index, resolve)
                        },
                        (err) => {
                            formatArr('rejected', err, index, resolve)
                        }
                    )
                } else {
                    formatArr('fulfilled', promise, index, resolve)
                }
            })
        })

        function formatArr(status, value, index, resolve) {
            switch (status) {
                case 'fulfilled':
                    resArr[index] = {
                        status,
                        value
                    }
                    break
                case 'rejected':
                    resArr[index] = {
                        status,
                        reason: value
                    }
                    break
                default:
                    break
            }
            if (++idx === promiseArr.length) {
                resolve(resArr)
            }
        }
    }
```

### 3.4-Promise.race

这个方法也比较简单，race 是赛跑的意思，当某一项确定状态后，直接包装成 promise 出去就好

```js
 static race(promiseArr) {
        if (!isIterable(promiseArr)) {
            let type = typeof promiseArr
            throw TypeError(`${type} is not a iterable (cannot read property Symbol(Symbol.iterator))
    at Function.all (<anonymous>)`)
        }
        return new Promise((resolve, reject) => {
            promiseArr.forEach((promise, index) => {
                if (isPromise(promise)) {
                    promise.then(resolve, reject)
                } else {
                    resolve(promise)
                }
            })
        })ise.then
    }
```

### 3.4-Promise.prototype.finally

这个方法其实要考虑的因素蛮多，在此我列举出来
finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作

finally 本质上是 then 方法的特例。

1.  finally 无论外面的 promise 状态成功还是失败 都要走 并且回调函数不带参数
2.  正常走 finallu 之后 then 或者 catch
3.  如果 finally 内部有 promise 并且有延时处理，整个 finall 会等待执行
4.  如果 2 个都是成功，取外面结果
5.  如果外面是成功 里面是失败，取里面失败的结果
6.  如果外面是失败 里面是成功 取外面失败的结果
7.  如果外面和里面都是失败，取里面失败的结果
8.  如果外面成功，里面成功，取外面成功的结果

我们首先要把上一次 promise 的值保存下来
这样只有当里面是失败的情况下，才取 finally 内部失败的值，其余取上一个 promise 的值

```js
 finally(callbacks) {
        return this.then(
            (value) => {
                return MyPromise.resolve(callbacks()).then(() => value)
            },
            (err) => {
                return MyPromise.resolve(callbacks()).then(() => {
                    throw err
                })
            }
        )
    }
```

### 3.5-Promise.prototype.catch

这个方法比较简单，相当于调用 then 的第二个回调而已

```js
 catch(callback) {
        return this.then(null.callback)
    }
```

**完整带代码**[ 链接](https://github.com/mufeiyu-ayu/promise)
大哥看完麻烦给个 star，创作不易，谢谢！！！！！！！！！

参考链接 2：<https://promisesaplus.com/> （promiseA+规范）

### 末尾

本文只是基于 romiseA+规范进行实现，掌握可胜任工作以及，中等偏下的面试题，**但是与 v8 引擎下的 promise 规范还是有很多差异** 掌握本文可参考月夕大佬的 promise 文章
参考链接 1：<https://juejin.cn/post/7055202073511460895> （ECMA 规范与 V8 引擎下的 promise）

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/sourcePromise14.webp)
