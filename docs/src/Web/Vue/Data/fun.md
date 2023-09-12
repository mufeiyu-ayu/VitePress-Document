---
title: Vue 的 data 为啥是函数
lastUpdated: 1665825120
like: 85
Comment: 16
Collection: 88
img: https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/homeVue1.jpeg
des: 在学习vue的时候vue2只有在组件中严格要求data必须是一个函数，而在普通vue实例中，data可以是一个对象，但是在vue3出现后data必须一个函数，当时看着官方文档说的是好像是对象的引用问题，但是内部原理却不是很了解，今天通过一个简单的例子来说明为啥data必须是一个函数
---

## Vue 的 data 为啥是函数

### 前言

在学习 vue 的时候 vue2 只有在组件中严格要求 data 必须是一个函数，而在普通 vue 实例中，data 可以是一个对象，但是在 vue3 出现后 data 必须一个函数，当时看着官方文档说的是好像是对象的引用问题，但是内部原理却不是很了解，今天通过一个简单的例子来说明为啥 data 必须是一个函数

参考[ (vue2data 描述)](https://v2.cn.vuejs.org/v2/api/#data)

参考: [(vue3data 描述)](https://cn.vuejs.org/api/options-state.html#data)

### 1.Vue3 中的 data

```js
const {createApp} = Vue
const app = {
	data: {
		a: 1,
	},
	template: `
    <h1>{{a}}</h1>
    `,
}
createApp(app).mount('#app')
```

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/fu1.webp)
可以看到上来 vue 就给了警告说明 data**必须是一个函数** 下面直接抛错

### 2.vue 中的 data

```js
var app = new Vue({
	el: '#app',
	data: {a: 'hello world'},
})
```

这种写法是可以的，前面提过普通实例 data 可以是对象，但是在组件中必须是函数，
**那么在 vue2 中难道普通实例就没有缺陷嘛？** <br>
答案：是有缺陷的，
比如这样

```html
<div id="app1">{{ message }}</div>
<div id="app2">{{ message }}</div>
```

```js
const data = {message: 'hello world'}
const vue1 = new Vue({
	el: '#app1',
	data,
})

const vue2 = new Vue({
	el: '#app2',
	data,
})
```

这样在页面中会显示 2 个内容为 hello world 的 div 标签
那么当我们通过实例去改变 messag 呢？

```js
vue1.message = 'hello Vue'
```

![image.png](https://codfeather.oss-cn-shenzhen.aliyuncs.com/blog/fu2.webp)

奇怪的事情发生了，我知识改变了 vue1 的实例中的数据，但是其他实例的数据也发生了改变，相信很简单就能看出来这应该是共用同一个对象的引用而导致的，这在开放中是非常不友好的，开发者很容易就产生连串的错误，vue2 也知道这种缺陷只是没有在普通实例中去体现而已，只在组件中实现了对于 data 的约束

**为了让大家更好的立即为啥 data 必须是一个函数，黑猫在此简单实现一个 vue 的实例然后来证明为啥 data 是一个函数，以及如果 data 不是一个函数，我们应该如何处理**

### 3.证明 data 是函数以及原理实现

在实现简单原理之前，我们需要搞清楚 Vue 在创建实例之前，对于 data 到底做了什么事情简单来说就是:

<strong>vue 在创建实例的过程中调用 data 函数返回实例对象通过响应式包装后存储在实例的$data上并且实例可以直接越过$data 访问属性</strong>

1.通过这句描述可以知道 Vue 是一个构造函数，并且传入的参数中有一个 data 的属性，我们可以$data 去访问，也可以直接访问这个属性，并且我们需要对这个 data 做代理<br>
那么简单实现如下

```js
function Vue(options) {
	this.$data = proxy(options.data())
}
function proxy(options) {
	return new Proxy(options, {
		get(target, key, value, receiver) {
			return Reflect.get(target, key, value, receiver)
		},
		set(target, key, newValue, receiver) {
			Reflect.set(target, key, newValue, receiver)
		},
	})
}
const data = function () {
	return {
		a: 'hello world',
	}
}
const vue1 = new Vue({
	data,
})
const vue2 = new Vue({
	data,
})
vue1.$data.a = 'hello Vue'
console.log(vue1.$data.a) // hello Vue
console.log(vue2.$data.a) // hello world
```

通过简单实现可与看出来，当我们的 data 是一个函数的时候，在 Vue 的构造函数中，只有有实例创建就有执行 data 函数，然后返回一个特别的对象，所以当我们修改其中一个实例的时候并不会对其他实例的数据产生变化<br>
那么当 data 不是一个函数呢 ，我们简单改下代码，代码如下

```js
function Vue(options) {
	this.$data = proxy(options.data)
}
function proxy(options) {
	return new Proxy(options, {
		get(target, key, value, receiver) {
			return Reflect.get(target, key, value, receiver)
		},
		set(target, key, newValue, receiver) {
			Reflect.set(target, key, newValue, receiver)
		},
	})
}
const data = {
	a: 'hello world',
}
const vue1 = new Vue({
	data,
})
const vue2 = new Vue({
	data,
})
vue1.$data.a = 'hello Vue'
console.log(vue1.$data.a) // hello Vue
console.log(vue2.$data.a) // hello Vue
```

可以看出，由于共用一个对象，当代理的时候也是对同一个对象进行代理，那么当我们通过一个实例去改变数据的时候，就会影响其他实例的状态

### 4.如果 data 必须是一个对象呢？

假如有人提出如果 data 是一个对象，那么我们应该如何处理呢，其实也非常简单，在代理的时候我们可以将传入的 data 对象通过深拷贝即可，这样我们就不会使用相同引用的对象啦。<br>
[深拷贝牛逼封装参考我以前的文章]([不一样的深拷贝 - 掘金 (juejin.cn)](https://juejin.cn/post/7120893997718962213))
