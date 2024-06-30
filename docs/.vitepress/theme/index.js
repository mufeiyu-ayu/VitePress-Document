import Theme from 'vitepress/theme'

// import DynamicLayout from "../components/DynamicLayout.vue";
import GlobalComponent from '../components/GlobalComponents.vue'
import Mylayout from '../components/Mylayout.vue'
import Outline from '../components/Outline.vue'
import Image from '../components/Image.vue'
import Particles from 'vue3-particles'
import 'nprogress/nprogress.css'
import 'animate.css'

import './custom.css'

export default {
  ...Theme,
  // use our custom layout component that we'll create next
  Layout: Mylayout,
  // 注册全局组件
  enhanceApp(ctx) {
    // register your custom global components
    ctx.app.component('MyGlobalComponent', GlobalComponent /* ... */)
    ctx.app.component('Outline', Outline /* ... */)
    ctx.app.component('Image', Image /* ... */)
    ctx.app.use(Particles)
  },
}
