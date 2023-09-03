/** @type {import('tailwindcss').Config} */
export default {
  // 这里卡了很久，我这样写感觉和下面没啥区别啊
  // content: ["./docs/**/*.{vue,js}"],
  content: ["./docs/.vitepress/**/*.js", "./docs/.vitepress/**/*.vue"],
  theme: {
    extend: {},
  },
  plugins: [],
};
