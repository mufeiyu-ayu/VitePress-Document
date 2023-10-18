## promise 后续

### 前言

上个文章我们利用 promsieA+规范实现了 promise，这可以帮助我们理解大部分的 promise 知识并且做解决大部分的面试题以及开发问题，但是却还有很多瑕疵，我会用简单的篇幅让大家了解，让 promise 在大家眼里变的简单

### 引用

了解 V8 Promise 源码全过程，世界上不再有能困住你的 Promise 题目，[我就是这么肯定这篇文章的干货]([引用月夕大佬的话 (juejin.cn)](https://juejin.cn/post/7055202073511460895#heading-29))
对于月夕关于 promise 在 v8 引擎下的描述，从源码到例题，身为菜鸡的我不得不重复看很多遍，也只是感受到了皮毛，但是也总结了一些让大家容易理解，并且可以在面试，或者面试题中有很大信息

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/resovePromise1.webp)
图为根据大佬的文章总结的片段导图，接下来为大家阐述

### promiseA+关于 then 的处理

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/resovePromise2.webp)
上一篇文章简单描述过 A+关于 then 的回调函数中关于返回值 x 的处理，我再次带领大家回顾一遍

A+规范判断 x 是不是一个 promise 采用假设给 x 一个 then 的属性，如果 then 是一个函数那么就认定它是一个 promise，并且给这个 then 赋值（2 个函数，相当于 executor 函数中的 resolve，或者 reject）并且立马确定好函数中的状态 ，如果不是则在没有抛出错误的情况下通过 promise 的 resolve 函数包裹出去（确定为 fulfilled 状态）如以下代码

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/resovePromise3.webp)
A+规范的意思是直接同步执行 return 里面的代码，然后将其的 promise 对象确定好，然后 return 出去，按照这种说法，只有下面的 then 方法的回调函数才会加入到微任务队列中，我们通过一个例子来演示看看其中到底有什么不一样的地方

### 2.1 return 普通值

```js
let p1 = Promise.resolve(1)
let p2 = p1
  .then((value) => {
    console.log('第一个进入微任务队列')
    return '返回一个普通值'
  })
  .then((value) => {
    console.log('接收返回值:', value)
  })

let p3 = p1
  .then((value) => {
    console.log('第二个进入微任务队列')
    return '我也return一个普通值'
  })
  .then((value) => {
    console.log('接收返回值:', value)
  })
```

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/resovePromise4.webp)
通过执行结果可以看出再 return 一个普通值的时候好像确实是同步的把 1 包装成 fulfilled 状态的 promise 对象传递下去，我们再通过一个例子来看

### 2.2 return 包含 then 方法的对象

```js
let p1 = Promise.resolve(1)
// 测试用例
let p2 = p1
  .then((value) => {
    console.log('我第一个进入任务队列')
    return {
      then(resolve) {
        resolve('测试值1')
      },
    }
  })
  .then((value) => {
    console.log(value)
  })
// 对比用例
let p3 = p1
  .then((value) => {
    console.log('我第二个进入任务队列')
    return '对比值1'
  })
  .then((value) => {
    console.log(value)
  })
```

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/resovePromise5.webp)
![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/resovePromise6.webp)
如图所示：（resolve1 不用注释，主要是可以切换 3 种状态，调用 rekject 就是失败，什么都不写就是 pending）

(注释部分同上一行效果一样)，我们惊奇的发现这和 return 普通值得情况不一样，分析如下

1. 首先测试用例 p1.then 进入微任务队列，然后对比用例 p1.then 进入微任务队列 任务队列:[测试 p1.then,对比 p1.then]
2. 然后执行 p1.then 的代码打印 1，然后返回一个对象且有 then 方法，并且 resolve（1），这里如果大家在上一篇文章看过以后就会知道，A+规范在这里通过 resovlePromise 函数处理这个对象时，已经认定它是一个 promise 对象，于是将它变为一个 fufiled 状态的 promise 对象（因为里面 resove 了，如果有 reject 则是 rejected 的状态，如果啥也没有则是 pending 状态的 promise 对象）到这里与浏览器的处理几乎一样，**不同的是 A+规范认为这是同步的让这个对象转化为 promise 对象，而 V8 引擎却是看到这个对象时，开辟了一个微任务队列，将其放入**
3. 所以在执行完 p1 的微任务队列后，此时微任务队列为：[对比 p2.then,测试返回值为对象的函数]
4. 然后执行对比 p1 的微任务，然后将对比 p1 末尾的 then 的回调函数存入微任务队列，此时微任务队列为：[测试返回值为对象的函数，对比 p1 末尾 then 的回调函数]
5. 后面就是执行测试返回值为对象的函数，然后将测试末尾 then 的回调函数推入微任务队列，
6. 到这里按照正常逻辑就推出这个答案

这是第一个不同的地方

**总结：当 return 一个包含 then 方法对象的时候会为其创建一个微任务队列**

### 2.3 return 一个 promise 对象

如下面代码

```js
let p1 = Promise.resolve(1)
// 测试用例
let p2 = p1
  .then((value) => {
    console.log(1)
    return new Promise((resolve, reject) => {
      resolve(2)
    })
  })
  .then((value) => {
    console.log(value)
  })
// 对比用例
let p3 = p1
  .then((value) => {
    console.log(3)
    return 4
  })
  .then((value) => {
    console.log(value)
    return 5
  })
  .then((value) => {
    console.log(value)
  })
// 1 3 4 5 2
```

这个例子 p1.then 返回的是一个 promise 状态为 fulfilled 状态的对象，如果我们按照上面那个题的想法，return 一个对象或者是 promise 对象的时候会新创建一个微任务，那么应该打印 1 3 4 2 5
可 2 却在最后打印，**因为当返回一个 promise 对象加入微任务队列以后，当执行它的时候，会执行它的 then 方法再创建一个微任务出来，（简单来说就是 return 一个 promsie 对象会创建 2 个微任务，当然肯定不是一次性创建 2 个微任务哈）**
如图

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/resovePromise7.webp)

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/resovePromise8.webp)
这是月夕大佬在他的文章中描述的，在这里我也思考了很久，虽然用 c++实现的源码我也看不太懂
不过感觉掌握这些已经能够应对大部分的面试题了，比如这 2 道

```js
Promise.resolve()
  .then(() => {
    console.log(0)
    return Promise.resolve(4)
  })
  .then((res) => {
    console.log(res)
  })

Promise.resolve()
  .then(() => {
    console.log(1)
  })
  .then(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(5)
  })
  .then(() => {
    console.log(6)
  })
```

[类似的题目都在月夕大佬那片]([V8 Promise 源码全面解读 - 掘金 (juejin.cn)](https://juejin.cn/post/7055202073511460895#heading-28))中，大家可以去参考大佬的文章，多读几遍，尤其是重点部分就可以了，开篇的思维导图就是我根据此文章大致总结的需要的可以去我的 github 仓库获取
[mufeiyu-ayu/promise: 对于 promise 的实现以及研究 v8 与 ECMA 规范的 promise 与 promiseA+的探讨 (github.com)](https://github.com/mufeiyu-ayu/promise)

### 3. 最后

这可能就是语言的魅力吧，遇到奇怪的知识总想把它搞懂，也欢迎大家拿出比较有意思的 promise 题目和我一起分享。
