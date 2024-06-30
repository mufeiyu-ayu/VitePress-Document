import {
  tsParticles
} from "./chunk-TBLUOB55.js";
import {
  createElementBlock,
  defineComponent,
  nextTick,
  openBlock
} from "./chunk-67UUJLDS.js";
import "./chunk-5WWUZCGV.js";

// node_modules/.pnpm/vue3-particles@2.12.0/node_modules/vue3-particles/dist/vue3-particles.es.js
var e;
var u = defineComponent({
  props: {
    id: {
      type: String,
      required: true
    },
    options: {
      type: Object
    },
    url: {
      type: String
    },
    particlesLoaded: {
      type: Function
    },
    particlesInit: {
      type: Function
    }
  },
  mounted() {
    nextTick(async () => {
      if (!this.id)
        throw new Error("Prop 'id' is required!");
      tsParticles.init(), this.particlesInit && await this.particlesInit(tsParticles), e = await tsParticles.load({
        id: this.id,
        url: this.url,
        options: this.options
      }), this.particlesLoaded && e && this.particlesLoaded(e);
    });
  },
  unmounted() {
    e && (e.destroy(), e = void 0);
  }
});
var f = (t, n) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of n)
    i[r] = s;
  return i;
};
var m = ["id"];
function h(t, n, i, r, s, _) {
  return openBlock(), createElementBlock("div", { id: t.id }, null, 8, m);
}
var c = f(u, [["render", h]]);
var P = (t) => {
  t.component("vue-particles", c), t.component("Particles", c);
};
export {
  c as ParticlesComponent,
  P as default
};
//# sourceMappingURL=vue3-particles.js.map
