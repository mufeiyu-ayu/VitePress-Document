## 重学vue3
在我之前工作中我发现我对于vue的理解是简单的，只能去做简单业务，或者将业务复杂化，并没有使用到vue很多功能带给我们的便利，所以我决定重新学习vue3，这次我会更加深入的学习vue3。

### 1.createApp
createApp是vue3的入口函数，我们可以通过createApp来创建一个vue实例，然后通过mount方法将vue实例挂载到dom上,如下所示：
```javascript
import { createApp } from 'vue'
import App from './App.vue'

//createApp类型
function createApp(rootComponent: Component, rootProps?: object): App

const app = createApp(App) // 创建一个vue实例
let componetnInstance = app.mount('#app') // componentInstance是一个组件实例

```
**createApp的参数**
1. 通过官方描述，我们可以知道可以在传入第一个参数为组件的前提前传入第二个参数，即为该组件的props，就可以去动态控制该组件的很多行为，目前当我封装全局组件比如Message的时候，通过传入props就可以很好的控制组件的行为。
2. 当我们只传入一个参数，即为组件的时候，我们可以通过app.config.globalProperties去挂载全局属性和方法，这样我们就可以在组件中直接使用这些属性和方法，而不需要在组件中引入，这样就可以减少代码量，提高代码的可读性。
3. 第一个参数不一定是我们通过vue创建的组件，因为组件其实就是一个对象，待续
4. createApp返回的是一个应用实例主要是挂载以及卸载的，如果我们想要获取到组件的实例，我们可以通过app._component来获取到组件的实例，不过只能获取组件的props并不能获取到组件的方法，
5. 但是组件通过挂载之后返回的对象是一个组件实例，我们可以通过这个实例去获取到组件的方法，但是组件需要通过**defineExpose**暴露出来，才能在组件实例中获取到组件的方法。然后就可以通过方法去改变组件的行为。

上面提到通过获取组件实例进而通过实例操作该组件的情况，严格来说我们应该在大部分情况尽可能的情况下使用props和emit来操作组件，
但是如果想通过对组件实例来操作组件的化，则子组件必须是optionsApi风格的vue组件，compositionApi的属性和方法默认是私有的必须通过defineProps主动暴露出来