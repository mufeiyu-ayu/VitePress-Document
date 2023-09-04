import Theme from "vitepress/theme";
// import DynamicLayout from "../components/DynamicLayout.vue";
import GlobalComponent from "../components/GlobalComponents.vue";
import Mylayout from "../components/Mylayout.vue";
import Outline from "../components/Outline.vue";
import "./custom.css";
import "nprogress/nprogress.css";
export default {
  ...Theme,
  // use our custom layout component that we'll create next
  Layout: Mylayout,
  // 注册全局组件
  enhanceApp(ctx) {
    // register your custom global components
    ctx.app.component("MyGlobalComponent", GlobalComponent /* ... */);
    ctx.app.component("Outline", Outline /* ... */);
  },
};
