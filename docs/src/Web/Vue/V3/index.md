## 重学 vue3

在我之前工作中我发现我对于 vue 的理解是简单的，只能去做简单业务，或者将业务复杂化，并没有使用到 vue 很多功能带给我们的便利，所以我决定重新学习 vue3，这次我会更加深入的学习 vue3。

### 1.createApp

createApp 是 vue3 的入口函数，我们可以通过 createApp 来创建一个 vue 实例，然后通过 mount 方法将 vue 实例挂载到 dom 上,如下所示：

```javascript
import { createApp } from 'vue'
import App from './App.vue'

//createApp类型
function createApp(rootComponent: Component, rootProps?: object): App

const app = createApp(App) // 创建一个vue实例
let componetnInstance = app.mount('#app') // componentInstance是一个组件实例

```

**createApp 的参数**

1. 通过官方描述，我们可以知道可以在传入第一个参数为组件的前提前传入第二个参数，即为该组件的 props，就可以去动态控制该组件的很多行为，目前当我封装全局组件比如 Message 的时候，通过传入 props 就可以很好的控制组件的行为。
2. 当我们只传入一个参数，即为组件的时候，我们可以通过 app.config.globalProperties 去挂载全局属性和方法，这样我们就可以在组件中直接使用这些属性和方法，而不需要在组件中引入，这样就可以减少代码量，提高代码的可读性。
3. 第一个参数不一定是我们通过 vue 创建的组件，因为组件其实就是一个对象，待续
4. createApp 返回的是一个应用实例主要是挂载以及卸载的，如果我们想要获取到组件的实例，我们可以通过 app.\_component 来获取到组件的实例，不过只能获取组件的 props 并不能获取到组件的方法，
5. 但是组件通过挂载之后返回的对象是一个组件实例，我们可以通过这个实例去获取到组件的方法，但是组件需要通过**defineExpose**暴露出来，才能在组件实例中获取到组件的方法。然后就可以通过方法去改变组件的行为。

上面提到通过获取组件实例进而通过实例操作该组件的情况，严格来说我们应该在大部分情况尽可能的情况下使用 props 和 emit 来操作组件，
但是如果想通过对组件实例来操作组件的化，则子组件必须是 optionsApi 风格的 vue 组件，compositionApi 的属性和方法默认是私有的必须通过 defineProps 主动暴露出来

### 设置全局自定义属性

**方法一** app.config.globalProperties

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

// test 是外部引入的方法
const test = () => {
  console.log('ccccc')
  return '测试成功001'
}

const app = createApp(App)
// 添加到全局中
app.config.globalProperties.$Test = test
app.use(test)
app.use(store)
app.use(router)
app.mount('#app')
```

**使用**

```js
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'Home',
  setup() {
    // ts proxy 使用
    const { proxy }: any = getCurrentInstance()
    // js
    /* const { proxy } = getCurrentInstance() */
    console.log(proxy, proxy.$Test())
    // ts appContext 使用
    const { $Test } = getCurrentInstance().appContext.config.globalProperties
    $Test()
    /*
        但是这种写法不行，打包之后不能正常使用
        const { ctx } = getCurrentInstance()
        ctx.$test
        */
  },
})
```

**方式二 依赖和注入（provide 和 inject**

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { TEST_SYMBOL } from './symbol'
// test 是外部引入的方法
const test = () => {
  console.log('ccccc')
  return '测试成功001'
}
const app = createApp(App)
// 使用 symbol 方式
app.provide(TEST_SYMBOL, test)
// 使用自定义字符串方式
app.provide('$Test', test)
app.use(store)
app.use(router)
app.mount('#app')
```

```js
import { defineComponent, inject } from 'vue'

import { TEST_SYMBOL } from '@/symbol'

export default defineComponent({
  setup() {
    // ts 中它的类型可能是个undefined
    // symbol 方式
    const $Test: (() => string) | undefined = inject(TEST_SYMBOL)
    $Test && $Test()
    // 自定义字符串方式
    const $Test2: (() => string) | undefined = inject('$Test')
    $Test2 && $Test2()
    // js
    /*
        const $Test = inject(TEST_SYMBOL)
        $Test()
        */
  },
})
```
