## 数据劫持

### 前言：

众所周知 vue2 是通过 Object.defineProperty,vue3 通过 proxy 实现对于数据也就是 data 的劫持，然后监听数据的变化也就是响应式，从而让页面与数据保持同步刷新，今天和大家聊一下 vue2 中数据劫持，通过原生实现让大家彻底搞懂，彻底了解，并且轻松过面试嘻嘻

### 思考

**Vue2 在创建一个实例后做了什么事呢?**
这里我们简单写点代码

```js
const vm = new Vue({
  el: '#app',
  data() {
    return {
      title: '标题',
      main: '研究数据劫持',
      author: '黑猫',
      list: [1, 2, 3, 4],
      info: {
        a: {
          b: 1,
        },
      },
    }
  },
})
console.log(vm)
```

由于是研究数据劫持，我们就不对其他方面过多讨论，也帮助大家把重点放在 data 上

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/data1.webp)

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/data2.webp)

### 1.初始化工作

从打印可以看出：<br> 1.我们在 data 定义的属性被放在了 Vue 的实例中，<br> 2.传入到这个 vue 的构造函数的对象(options)也被挂载到实例上<br> 3.我们可以通过\_data 以及$data 都可以访问到我们定义的属性，<br> 4.每个属性都被做了数据劫持，<br>
那么刚从这里看，这个数据劫持有什么意义呢？
先简单实现这一部分功能

```js
// 初始化Vue
function Vue(options) {
  this._init(options)
}
// 初始化操作
Vue.prototype._init = function (options) {
  const vm = this
  vm.$options = options
  initState(vm)
}

function initState(vm) {
  // 对后面的数据进行初始化操作
}
```

这里我们简单的将我们传入的对象挂载到了 Vue 的$options 属性上，然后调用一个 initState 函数准备对后面的数据进行劫持操作<br>
**为了让大家看的方便，这里我不采用模块化的写法，单文件搞定(莫说我菜)**

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/data3.webp)
刚才我们最后调用了 initState 函数并且把实例 vm 传递进去，传递 vm 是为了我们方便为它赋值，以及做代理

```js
console.log(vm.title) // 标题
console.log(vm._data.title) // 标题
vm._data.title = '修改标题1'
console.log(vm.title) // 修改标题1
vm.title = '修改标题2'
console.log(vm.title) // 修改标题2
```

### 2.初步代理

前面也说了 vue 会把数据渲染到 vue 实例，以及\_data 属性中，因此我们也可以通过上述代码去访问以及修改都是木得问题的，它依然是响应式刷新（因为做了数据劫持）,因此让我们来完善 initState 函数以及后面的操作吧

```js
function initState(vm) {
  const options = vm.$options
  if (options.data) initData(vm)
}

function initData(vm) {
  let data = vm.$options.data
  vm._data = data = typeof data === 'function' ? data.call(vm) : {}
  for (const key in data) proxy(vm, '_data', key)
}

function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key]
    },
    set(newValue) {
      vm[target][key] = newValue
      // 这里就可以做响应式刷新页面呀，做侦听器呀，等等操作，本次就不讨论了
    },
  })
}
```

这里我们将传入的对象挂载到了 vue 的实例中，并且判断有没有传入 data 这个属性呢，有的话我们就对其进行数据劫持<br>
然后我们将 data 的数据渲染到实例中，并且给每一个数据进行数据劫持，
初步的数据劫持就完成啦

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/data4.webp)

```js
console.log(vm.title)
vm.title = '设置标题'
```

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/data5.webp)<br>
初步工作已经完成，但是从上述图片看我们并没有对\_data 里面的属性做数据劫持呀，这是肯定不行的，我们下面继续完善

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/data6.webp)

### 3.完善\_data 数据中的数据劫持

那么这里非常简单，我们直接在 initData 这个函数顺便把\_data 里面的数据顺便做个劫持不就完事了嘛

```js
function initData(vm) {
  let data = vm.$options.data
  vm._data = data = typeof data === 'function' ? data.call(vm) : {}
  for (const key in data) proxy(vm, '_data', key)

  observe(vm._data) // 直接在这里添一行做处理啦
}
```

此时我们的代码完整如下

```js
// 初始化Vue
function Vue(options) {
  this._init(options)
}
// 初始化操作
Vue.prototype._init = function (options) {
  const vm = this
  vm.$options = options
  initState(vm)
}
// 初始化状态
function initState(vm) {
  const options = vm.$options
  if (options.data) initData(vm)
}
// 初始化data
function initData(vm) {
  let data = vm.$options.data
  vm._data = data = typeof data === 'function' ? data.call(vm) : {}
  for (const key in data) proxy(vm, '_data', key)

  observe(vm._data)
}
// 对全局访问data做数据劫持
function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      // console.log(`访问属性`)

      return vm[target][key]
    },
    set(newValue) {
      //  console.log(`设置属性`)
      vm[target][key] = newValue
    },
  })
}
```

那我们就来完善这个 observe 函数以及后面的功能吧，而且请大家现在记住**observe 函数在做数据劫持，在做数据劫持，在做数据劫持**

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/data7.webp)

```js
function observe(data) {
  if (typeof data !== 'object' || data === null) return // 此判断后面解释
  return new Observer(data)
}

function Observer(data) {
  if (Array.isArray(data)) {
    // 先不了解，后面解释
  } else {
    this.walk(data)
  }
}
// 对_data的数据进行处理
Observer.prototype.walk = function (data) {
  const keys = Object.keys(data)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = data[key]
    defineReactiveData(data, key, value)
  }
}
// 数据劫持
function defineReactiveData(data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      console.log('获取数据', value)
      return value
    },
    set(newValue) {
      console.log('设置新值', newValue)
      if (newValue === value) return // 做点小优化嘻嘻
      observe(newValue)
      value = newValue
    },
  })
}
```

1. 首先请大家看看刚才打印的图片，这个 observe 传入的 data 是 data 函数执行后返回的 data 对象，可不要搞混淆了
2. 在这里可能有同学很奇怪为啥在这里对 data 做一个判断呢，为啥不直接在上面做了不就好了，现在我只能告诉大家这个函数它可能重复使用，因此我们必须要在这里判断 data 是对象的情况，
3. Observer 这个函数针对数组或对象做不同的操作来完成数据劫持，我们先把对象的搞好，后面来再叙述数组的情况
4. Observer 的原型 walk 方法来处理 data 是对象的情况，来做数据劫持，然后通过 defineReactiveData 来完成具体操作
5. 在 defineReactiveData 函数中我们对\_data 的每一个数据都做了数据劫持<br>

**为什么我们在 defineReactiveData 函数中要递归调用 observe 函数，以及在设置值的时候也要递归调用 observe 函数呢？** 请大家再回上面看看 observe 函数是用来做啥的
看看下面的代码

```js
// 这里info是个2层对象忘记可以看看开头模板
console.log(vm.info.a.b)
vm.info.a = 33
```

**请大家思考这个最里面的 b 应不应该走数据劫持，我们设置这个 a 对象应不应该走数据劫持？**<br>
答案是肯定应该呀，data 中的所有数据都递归做过数据劫持，大家可以去页面渲染，然后改变最深层的值验证是不是走了代理进而触发响应式重新渲染修改后数据的页面，这里不做演示，因此我们需要递归对它们进行数据劫持，那我们刚在 observe 函数中对 data 是不是对象的判断是不是就非常关键了呀，如果是个普通值得话我们就不需要递归了呀，嘻嘻，这样不就搞懂前面得意思啦<br>
此时完整代码如下

```js
// 初始化Vue
function Vue(options) {
  this._init(options)
}
// 初始化操作
Vue.prototype._init = function (options) {
  const vm = this
  vm.$options = options
  initState(vm)
}
// 挂载options以及处理data函数
function initState(vm) {
  const options = vm.$options
  if (options.data) initData(vm)
}
// 处理data
function initData(vm) {
  let data = vm.$options.data
  vm._data = data = typeof data === 'function' ? data.call(vm) : {}
  for (const key in data) proxy(vm, '_data', key)

  observe(vm._data)
}
// 给从Vue实例直接访问属性做代理
function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      // console.log(`访问属性`)
      return vm[target][key]
    },
    set(newValue) {
      //  console.log(`设置属性`)
      vm[target][key] = newValue
    },
  })
}

// 为vm的_data中的数据做数据劫持
function observe(data) {
  if (typeof data !== 'object' || data === null) return
  return new Observer(data)
}

// 数组对象处理方法不同
function Observer(data) {
  if (Array.isArray(data)) {
    // 先不了解，后面解释
  } else {
    this.walk(data)
  }
}
// 针对对象代理的准备工作
Observer.prototype.walk = function (data) {
  const keys = Object.keys(data)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = data[key]
    defineReactiveData(data, key, value)
  }
}

// 对data为对象的情况做数据劫持
function defineReactiveData(data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      console.log('获取数据', value)
      return value
    },
    set(newValue) {
      console.log('设置新值', newValue)
      if (newValue === value) return // 做点小优化嘻嘻
      observe(newValue)
      value = newValue
    },
  })
}
```

### 4.数组的数据劫持实现

当面试被问到 vue2 的数据劫持时，如果只说用到 Object.defineproperty 的话并不能说明你确实懂这个，比如对于数组，当它被做数据劫持的时候 Object.defineproperty 能检测到嘛，那我们使用数组的方法呢，又会怎么样呢？比如这段代码

```js
const vm = {
  data: {
    list: [1, 2, 3, 4],
  },
}
for (const key in vm.data) {
  Object.defineProperty(vm, key, {
    get() {
      console.log('数组被读')

      return vm.data[key]
    },
    set(newValue) {
      console.log('数组被写')
      vm.data[key] = newValue
    },
  })
}
console.log(vm.list)
vm.list = 3
vm.list = [1, 2, 3]
vm.list.push(1)
vm.list.pop()
console.log(vm.list)
```

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/data8.webp)<br>
从打印的图上我们可以看出**当我们使用 push,pop,unshift,shift,...等方法的时候只触发了读取操作，并没有触及写入操作，** 这个问题是非常严重的，想象当我们操作数组的时候，如果使用数组的方法，但是检测不到，那何来的响应式？那么 Vue 是如何做到当使用方法操作数组，也能捕获到，或者响应页面变化呢？

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/data9.webp)
这个是 vue 的处理，代码是顶部的模板，我们通过控制台可以看出 vue 在数组上面多加了一层原型，改写了数组的 pop,push,reverse,shift,sort,splice,unshit 方法，这一层原型的原型才是数组原来的方法，很显然 Vue 内部对这几个方法做了改写，所以我们在操作数组的时候使用这些方法的时候才能被检测到，比如最直观的页面响应变化嘻嘻。
那我们就来实现一下这个过程，直接从刚才实现 Observer 这个函数中来对数组这种情况进行处理

```js
function Observer(data) {
  if (Array.isArray(data)) {
    data.__proto__ = arrMethods
    observeArr(data)
  } else {
    this.walk(data)
  }
}
const ARR_METHODS = [
  'push',
  'pop',
  'unshift',
  'shift',
  'splice',
  'sort',
  'reverse',
]
const originArray = Array.prototype
const arrMethods = Object.create(originArray)

ARR_METHODS.forEach((item) => {
  arrMethods[item] = function (...arg) {
    // 执行原来数组的方法
    const rt = originArray[item].apply(this, arg)
    console.log('数组新方法', arg) // 在这里就可以检测到
    let newArr
    switch (item) {
      case 'push':
      case 'unshit':
        newArr = arg
        break
      case 'splice':
        newArr = arg.slice(2)
      default:
        break
    }
    newArr && observeArr(newArr)
  }
})
function observeArr(arr) {
  for (let i = 0; i < arr.length; i++) observe(arr[i])
}
```

我们直接在这里在这给数组改写原型来检测这些方法，同时又因为数组里面可能也出现嵌套的可能因此我们多调用 observeArr 这个函数来处理嵌套就可以监听深层次的数据写入操作啦<br>
此时完整代码如下

```js
// 初始化Vue
function Vue(options) {
  this._init(options)
}
// 初始化操作
Vue.prototype._init = function (options) {
  const vm = this
  vm.$options = options
  initState(vm)
}

// 初始化状态
function initState(vm) {
  const options = vm.$options
  if (options.data) initData(vm)
}
// data的初始化函数
function initData(vm) {
  let data = vm.$options.data
  vm._data = data = typeof data === 'function' ? data.call(vm) : {}
  for (const key in data) proxy(vm, '_data', key)

  observe(vm._data)
}

// 对于vm实例第一层的数据劫持
function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      // console.log(`访问属性`)
      return vm[target][key]
    },
    set(newValue) {
      //  console.log(`设置属性`)
      vm[target][key] = newValue
    },
  })
}

// 对于vm._data
function observe(data) {
  if (typeof data !== 'object' || data === null) return
  return new Observer(data)
}
// 要改写的数组方法
const ARR_METHODS = [
  'push',
  'pop',
  'unshift',
  'shift',
  'splice',
  'sort',
  'reverse',
]
const originArray = Array.prototype
const arrMethods = Object.create(originArray)

// 改写数组方法
ARR_METHODS.forEach((item) => {
  arrMethods[item] = function (...arg) {
    // 执行原来数组的方法
    const rt = originArray[item].apply(this, arg)
    console.log('数组新方法', arg)
    let newArr
    switch (item) {
      case 'push':
      case 'unshit':
        newArr = arg
        break
      case 'splice':
        newArr = arg.slice(2)
      default:
        break
    }
    newArr && observeArr(newArr)
  }
})

function observeArr(arr) {
  for (let i = 0; i < arr.length; i++) observe(arr[i])
}
// 对于数组和对象分别处理劫持
function Observer(data) {
  console.log(data)
  if (Array.isArray(data)) {
    data.__proto__ = arrMethods
    observeArr(data)
  } else {
    this.walk(data)
  }
}
Observer.prototype.walk = function (data) {
  const keys = Object.keys(data)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = data[key]
    defineReactiveData(data, key, value)
  }
}
function defineReactiveData(data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      console.log('获取数据', value)
      return value
    },
    set(newValue) {
      console.log('设置新值', newValue)
      if (newValue === value) return // 做点小优化嘻嘻
      observe(newValue)
      value = newValue
    },
  })
}
```

### 结语

到这里，vue2 的数据劫持差不多就结束啦，如果大家看这个代码不方便理解可以到
[源码链接](https://github.com/mufeiyu-ayu/The-understanding-of-the-vue-)查看，别忘记点个 star
