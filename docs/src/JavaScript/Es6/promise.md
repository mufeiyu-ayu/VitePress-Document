## promise

#### 1. Promise.prototype.finally

finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作<br />finally 本质上是 then 方法的特例。

1. finally 无论外面的 promise 状态成功还是失败 都要走 并且回调函数不带参数
2. 正常走 finallu 之后 then 或者 catch
3. 如果 finally 内部有 promise 并且有延时处理，整个 finall 会等待执行
4. 如果 2 个都是成功，取外面结果
5. 如果外面是成功 里面是失败，取里面失败的结果
6. 如果外面是失败 里面是成功 取外面失败的结果
7. 如果外面和里面都是失败，取里面失败的结果
8. 如果外面成功，里面成功，取外面成功的结果

```javascript
promise.finally(() => {
  // 语句
});

// 等同于
promise.then(
  (result) => {
    // 语句
    return result;
  },
  (error) => {
    // 语句
    throw error;
  }
);
```

```javascript
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (reason) =>
      P.resolve(callback()).then(() => {
        throw reason;
      })
  );
};
```

```javascript
Promise.reject("value1")
  .finally(() => {
    return new Promise((resolve, reject) => {
      resolve("成功");
      reject("失败");
    });
  })
  .then(
    (value) => {
      console.log(value);
    },
    (err) => {
      console.log(err);
    }
  );
```

#### 2.Promise.all

```javascript
const p = Promise.all([p1, p2, p3]);
```

Promise.all()方法接受一个数组作为参数，如果不是，就会先调用下面讲到的 Promise.resolve 方法，将参数转为 Promise 实例，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例<br />（1）只有 p1、p2、p3 的状态都变成 fulfilled，p 的状态才会变成 fulfilled，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数。<br />（2）只要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数<br />**口诀：全真则真，一假则假**

#### 3.Promise.race

Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.race([p1, p2, p3]);
```

上面代码中，只要 p1、p2、p3 之中有一个实例率先改变状态，p 的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给 p 的回调函数。<br />**口诀：谁先确定选谁**

#### 4. Promise.allSettled

Promise.allSettled()方法接受一个数组作为参数，数组的每个成员都是一个 Promise 对象，并返回一个新的 Promise 对象。只有等到参数数组的所有 Promise 对象都发生状态变更（不管是 fulfilled 还是 rejected），返回的 Promise 对象才会发生状态变更。<br />该方法返回的新的 Promise 实例，一旦发生状态变更，状态总是 fulfilled，不会变成 rejected。状态变成 fulfilled 后，它的回调函数会接收到一个数组作为参数，该数组的每个成员对应前面数组的每个 Promise 对象。

```javascript
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(11);
  }, 3000);
});
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(22);
  }, 3000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(33);
  }, 1000);
});
Promise.allSettled([p1, p2, p3])
  .then(
    (value) => {
      console.log(value);
      let arr = [];
      for (let item of value) {
        arr.push(item.value);
      }
      return arr;
    },
    (err) => {
      console.log(err);
    }
  )
  .then((value) => {
    console.log(value);
  })
  .catch((err) => {
    console.log(err);
  });
```

**口诀： 等待所有状态**

#### 5.源码

<details>
<summary>点击这里展开/折叠代码块</summary>

```javascript
const PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED";

const resolvePromise = function (promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<MyPromise>")
    );
  }

  let called = false;
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let then = x.then;
    // 这里使用try的原因是访问x的then方法它有可能被劫持然后抛错
    // Object.defineProperty(x,'then',{throw new Error("this is a error")})
    try {
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
};

class MyPromise {
  constructor(excutor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolveCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (value instanceof MyPromise) {
        value.then(resolve, reject);
        return;
      }

      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolveCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      excutor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }

      if (this.status === PENDING) {
        this.onResolveCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });
    return promise2;
  }
  catch(callbackErros) {
    return this.then(null, callbackErros);
  }

  finally(finallyCallback) {
    return this.then(
      // value 和 reason 是上一个promise的值，我们需要缓存下来
      (value) => {
        return MyPromise.resolve(finallyCallback()).then(() => value);
      },
      (reason) => {
        console.log(reason);
        return MyPromise.resolve(finallyCallback()).then(() => {
          throw reason;
        });
      }
    );
  }

  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(promiseArr) {
    if (!isIterable(promiseArr)) {
      let type = typeof promiseArr;
      throw TypeError(`${type} is not a iterable (cannot read property Symbol(Symbol.iterator))
    at Function.all (<anonymous>)`);
    }
    let resArr = [],
      idx = 0;
    return new Promise((resolve, reject) => {
      promiseArr.map((promise, index) => {
        if (isPromise(promise)) {
          promise.then((res) => {
            formatArr(res, index, resolve);
          }, reject);
        } else {
          formatArr(promise, index, resolve);
        }
      });
    });

    function formatArr(value, index, resolve) {
      resArr[index] = value;
      // if(resArr.length ===promiseArr.length) 在某些时刻不正确，比如数组最后一项先执行完 数组就为[empty,empty,value]
      if (++idx === promiseArr.length) {
        resolve(resArr);
      }
    }
  }

  static allSettled(promiseArr) {
    let resArr = [],
      idx = 0;
    if (!isIterable(promiseArr)) {
      throw new TypeError(`${promiseArr} is not a iterable`);
    }
    return new Promise((resolve, reject) => {
      if (promiseArr.length === 0) {
        resolve([]);
      }
      promiseArr.forEach((promise, index) => {
        if (isPromise(promise)) {
          promise.then(
            (value) => {
              formatResArr("fulfilled", promise, index, resolve);
            },
            (reason) => {
              formatResArr("rejected", reason, index, resolve);
            }
          );
        } else {
          //普通值
          formatResArr("fulfilled", promise, index, resolve);
        }
      });
    });

    function formatResArr(status, value, index, resolve) {
      switch (status) {
        case "fulfilled":
          resArr[index] = {
            status,
            value,
          };
          break;
        case "rejected":
          resArr[index] = {
            status,
            reason: value,
          };
          break;
        default:
          break;
      }
      if (++idx === promiseArr.length) {
        resolve(resArr);
      }
    }
  }

  static race(promiseArr) {
    if (!isIterable(promiseArr)) {
      let type = typeof promiseArr;
      throw TypeError(`${type} is not a iterable (cannot read property Symbol(Symbol.iterator))
    at Function.all (<anonymous>)`);
    }
    return new Promise((resolve, reject) => {
      promiseArr.forEach((promise) => {
        if (isPromise(promise)) {
          promise.then(resolve, reject);
        } else {
          resolve(promise);
        }
      });
    });
  }
}

function isPromise(x) {
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let then = x.then;
    return typeof then === "function";
  }
  return false;
}

function isIterable(value) {
  return (
    value !== null &&
    value !== undefined &&
    typeof value[Symbol.iterator] === "function"
  );
}
// MyPromise.defer = MyPromise.deferred = function () {
//     let dfd = {}
//     dfd.promise = new MyPromise((resolve, reject) => {
//         dfd.resolve = resolve
//         dfd.reject = reject
//     })
//     return dfd
// }
// module.exports = MyPromise
```

</details>

#### 6.v8 引擎下的 promise

```javascript
Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });
// 0 1 2 3 4 5 6
```

```javascript
new Promise((resolve, reject) => {
  Promise.resolve().then(() => {
    resolve({
      then: (resolve, reject) => resolve(1),
    });
    Promise.resolve().then(() => console.log(2));
  });
}).then((v) => console.log(v));
// 2 1
```

回顾 PromsieA+对于 then 方法回调函数的返回值的规范描述<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/21696332/1665219414524-7bf28b8b-41ce-4cfc-8ce3-8bd84cdbafe2.png#averageHue=%23e7e7e7&clientId=uefe99aa8-257a-4&from=paste&height=553&id=u2cc63342&originHeight=691&originWidth=1013&originalType=binary&ratio=1&rotation=0&showTitle=false&size=187644&status=done&style=none&taskId=ufab4ef4d-39ae-4527-8928-3b5aaf1bc96&title=&width=810.4)<br />如果 then 方法回调函数的返回值是一个 promise 则直接确定好状态（pending，fulfilled，rejected），并且将值确定，<br />如果 x 是一个对象或者函数，然后看它有没有 then 这个属性，且这个属性是一个函数，如果是则认为它是一个 promise（里面已经很难判断了），并且在访问 then 的时候可能 then 被提前定义（Object.defineproperty(x,'then',{throw new Error}) 所以加上 try catch ,抛出错误则直接 reject 出去
