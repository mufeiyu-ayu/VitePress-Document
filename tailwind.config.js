/** @type {import('tailwindcss').Config} */
export default {
  // 这里卡了很久，我这样写感觉和下面没啥区别啊
  // content: ["./docs/**/*.{vue,js}"],
  content: ['./docs/.vitepress/**/*.js', './docs/.vitepress/**/*.vue'],
  theme: {
    colors: {
      // 自定义颜色
      'transparent': 'transparent',
      'current': 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': 'red',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
    },
    lineClamp: {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
    },
    extend: {},
  },
  plugins: [require('./node_modules/tailwindcss-line-clamp')],
  corePlugins: {
    preflight: false,
  },
}
