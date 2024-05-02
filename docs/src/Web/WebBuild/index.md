# 前端基建

### 为啥要做前端基建？
作为一个刚入行没多久的前端新人，在之前公司的项目中，我发现前端工程化的重要性。在项目中，我们需要不断的重复一些工作，比如：代码规范、代码风格、代码质量、代码的构建、代码的部署等等。这些工作虽然看起来不是很重要，但是却是我们在项目中必不可少的一部分。如果我们能够将这些工作自动化，那么我们就可以将更多的精力放在业务逻辑的开发上，提高我们的开发效率，减少我们的开发成本。

### 前端基建的内容
目前，我所应用公司的前端项目中，前端基建做了下面这些事情。
1. 前端命名规范（文件/文件夹命名规范、组件命名规范、类名命名规范、变量命名规范等）
2. 目录结构规范(项目目录结构规范、组件目录结构规范、页面目录结构规范等)
3. 代码规范（JavaScript代码规范、CSS代码规范、HTML代码规范等）
4. 工具自动化(Eslint，Prettier，Husky，Lint-staged，Stylelint等)
5. GIT规范(分支,commit,eslint校验，styleLint校验,prettier校验等)



### 公司前端基建
在2024.3我入职了一家公司，目前负责公司低代码框架的工作，在这个项目中我第一次见识了基建的强大，刚接受这个项目的时候，老实话，我是有点蒙蔽的，这个项目里面东西太多了，包含好几个项目，文档，脚手架，代码规范，公司内部的组件库，以及封装了很多工具函数，不像我之前接触项目一样，开局创个脚手架就开始干活了。<br/>
![image.png](https://nestdb.oss-cn-shenzhen.aliyuncs.com/web/project.png)

项目采用monorepo+workspace+turbo的方式管理.里面包含了git提交规范，代码规范，命令规范，css规范，等等，这对于公司来说前端保持一定的协调性肯定是不错，减少了很多问题。<br/>
**优点**
1. 项目结构清晰，不同的项目可以独立开发，独立部署，独立测试
2. 项目之间可以共享代码，共享组件，共享工具函数
3. 项目之间可以互相引用，互相依赖
4. 项目之间可以互相通信，互相调用

正好最近我也打算在闲暇之余做一个自己的项目,里面包含我封装的所有组件，工具函数，以及自己喜欢的代码规范，还有文档说明，以及后续的博客项目，所以我决定采用这种方式来管理我的项目，这样可以让我更好的管理我的项目，提高我的开发效率，减少我的开发成本。

### 我的项目
正好最近我也打算在闲暇之余做一个自己的项目,里面包含我封装的所有组件，工具函数，以及自己喜欢的代码规范，还有文档说明，以及后续的博客项目，所以我决定采用这种方式来管理我的项目，这样可以让我更好的管理我的项目，提高开发效率，减少开发成本。

#### script命令
```js
"scripts": {
    "lint": "eslint . --ext ts,tsx,vue --report-unused-disable-directives --max-warnings 0",   // 代码规范检查    
    "lint:fix": "eslint --fix --ext ts,tsx,vue --ignore-path .eslintignore .", // 代码规范检查并修复    
    "prettier:fix": "prettier --write .", // 代码格式化       
    "prettier": "prettier --check ."   // 代码格式化检查     
    "engines": {         // 项目运行环境 
    "node": ">=16.14.0",
    "npm": ">=8.3.1"
    "prepare": "husky install" //安装依赖后自动初始化 Husky，设置 Git 钩子，以便在提交代码时执行预定义的任务。
        "precommit": "lint-staged" // 在提交代码之前执行 lint-staged
         
  },
}

```
#### Prettier + Eslint

首先我使用prettier工具进行代码美化，美化如下
```javascript  
model.exports = {
  arrowParens: 'always', // 在箭头函数参数的周围加上括号
  bracketSameLine: false, // 在对象文字的括号之间打印空格
  bracketSpacing: true, // 在对象文字的括号之间打印空格
  semi: false, // 在语句末尾打印分号
  singleQuote: false, // 使用单引号而不是双引号
  jsxSingleQuote: true, // 在JSX中使用单引号而不是双引号
  trailingComma: 'all', // 多行时尽可能打印尾随逗号
  singleAttributePerLine: false, // 多个属性是否应该打印在同一行
  vueIndentScriptAndStyle: false, // 缩进Vue文件中的脚本和样式标签
  useTabs: false,
  embeddedLanguageFormatting: 'auto', // 控制Prettier格式嵌入式代码的方式
  printWidth: 120, // 每行代码的最大长度
  tabWidth: 2, // 每个缩进的空格数
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html',
      },
    },
  ],
}
```
##### Eslint-extends
然后需要使用eslint进行代码规范检查，自定义配置规则，因为prettier可能与eslint存在冲突问题，因此我们需要安装eslint-config-prettier插件，然后在.eslintrc.js文件中配置，因为eslint和prettier可能存在冲突问题，因此我们需要安装eslint-config-prettier插件，然后在.eslintrc.js文件中配置，如下
```javascript
module.exports = {
    extends: [
        'eslint:recommended',
        '@vue/prettier',
        'plugin:prettier/recommended'
    ]
}
```
通过  'plugin:prettier/recommended'  这个配置，我们可以让eslint和prettier共存，不会出现冲突题。

**解决tpescript问题**
对于ts文件类型，我们需要安装@typescript-eslint/parser @typescript-eslint/eslint-plugin，然后进行配置
```javascript
module.exports = {
    extends: [
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint']
}
```
##### Eslint-parserOptions配置解析器
parserOptions: 这个字段用于配置解析器的选项。解析器选项指定了解析器应该如何解析代码，并影响了解析过程中的行为。例如，你可以通过 parserOptions 指定解析器解析的 ECMAScript 版本、代码的来源类型等。这些选项通常是可选的，但在某些情况下可能是必需的，特别是当你使用非标准的语法或者特定的 JavaScript 变体时。
```javascript
module.exports = {
    parserOptions: {
        ecmaVersion: 'latest', // 使用最新的ECMAScript版本
        parser: '@typescript-eslint/parser', // 解析ts代码
        sourceType: 'module', // 使用ES模块解析
    },
}
```
##### Eslint-parser 配置解析器
通常情况下，如果代码是标准的 JavaScript（包括 ECMAScript 的各个版本），则可以使用 ESLint 默认的解析器。然而，如果代码包含了非标准的语法或者是一种特定的 JavaScript 变体（比如 TypeScript、Flow,Vue 等），你就需要指定相应的解析器来解析代码。<br/>

例如，在 Vue.js 项目中，你可能会使用 vue-eslint-parser 来解析 Vue 单文件组件（.vue 文件），因为这种文件包含了 HTML、JavaScript 和 CSS，需要特定的解析器来正确地解析其内容。
```javascript
module.exports = {
    // ...
    parser: 'vue-eslint-parser', // 解析vue文件
    // ....
}
```
##### Eslint-env配置环境
env 是 ESLint 配置中的一个字段，用于指定代码运行的环境。这个字段的作用是告诉 ESLint 在哪种环境下运行你的代码，以便它能够识别并正确地处理该环境下的全局变量。

```javascript
module.exports = {
    env: {
        browser: true, //这表示你的代码是在浏览器环境中运行的。通过设置为 true，ESLint 将会知道你的代码中可能会使用浏览器特有的全局变量，例如 window、document 等。
        node: true, // Node.js 环境，ESLint 将会知道你的代码中可能会使用 Node.js 特有的全局变量，例如 module、require 等。
        es2021: true, // ESLint 将会知道你的代码中可能会使用 ECMAScript 2021 中新增的语法特性，以便正确地解析和检查这些代码。
    },
}
```

##### Eslint-globals配置全局变量
globals 是 ESLint 配置中的一个字段，用于指定代码中所使用的全局变量。这个字段的作用是告诉 ESLint 你的代码中可能会使用的全局变量，以便它不会将这些变量当作未定义的变量而报错。

```javascript
module.exports = {
    globals: {
        // 这里列出的变量都是全局变量，ESLint 将不会对这些变量进行检查。
        // 例如，如果你的代码中使用了 jQuery，你可以在这里将 $ 和 jQuery 列为全局变量。
        defineEmits: true, // Vue 3 中的 defineEmits 函数
        document: true, // 浏览器环境中的 document 全局变量
        localStorage: true, // 浏览器环境中的 localStorage 全局变量
        GLOBAL_VAR: true, // 自定义全局变量
        window: true, // 浏览器环境中的 window 全局变量
        defineProps: true, // Vue 3 中的 defineProps 函数
        defineExpose: true, // Vue 3 中的 defineExpose 函数
        withDefaults: true, // Vue 3 中的 withDefaults 函数
    },
}
```
##### Eslint-ignorePatterns配置忽略文件
ignorePatterns 是 ESLint 配置中的一个字段，用于指定需要忽略的文件或目录。这个字段的作用是告诉 ESLint 忽略指定的文件或目录，不对其进行代码检查。

```javascript
module.exports = {
    ignorePatterns: ['node_modules/', 'dist/'],
}
```

##### Eslint-plugins配置插件
plugins 是 ESLint 配置中的一个字段，用于指定需要使用的插件。这个字段的作用是告诉 ESLint 使用指定的插件来检查代码，以便检查代码中可能存在的问题。

```javascript

module.exports = {
    plugins: ['@typescript-eslint', 'import'] // 使用@typescript-eslint和import插件
    // plugins: ['vue', 'prettier'], // 使用vue和prettier插件
}

```

##### Eslint-rules配置规则
rules 是 ESLint 配置中的一个字段，用于指定代码检查规则。这个字段的作用是告诉 ESLint 使用哪些规则来检查代码，以便检查代码中可能存在的问题。其中 rules 字段的值是一个对象，对象的键是规则名称，值是规则的配置。值可以是一个数字(0,1,2)，表示规则的严重程度，也可以是一个数组，数组的第一个元素是规则的严重程度，第二个元素是规则的配置。<br/>
其中0表示关闭规则，1表示警告，2表示错误。off, warn, error 也可以表示0,1,2 ，
```javascript
modules.exports = {
    rules:{
        indent: [
            2,
            2,
            {
                SwitchCase: 1,
            },
        ], //缩进2个空格
        quotes: [1, 'single'], // 必须使用单引号 （最先版本已被弃用)
        'no-plusplus': ['error'], // 禁止一元运算符
        'no-console': 'off', // 禁止console
        'no-param-reassign': 'off', // 不允许重新分配 function 参数
        'no-shadow': 'off', // 禁止变量声明与外层作用域的变量同名
        'no-underscore-dangle': 'off', // 禁止标识符中的悬空下划线_
        'no-restricted-syntax': 'off', // 禁止指定的语法
        'no-unused-expressions': 'off', // 禁止未使用的表达式
        'no-case-declarations': 'off', // 禁止 case 子句中的词法声明
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
            },
        ], // 确保导入的模块是否是项目依赖
        'import/no-unresolved': 'off', // 确保导入的模块是否需要解析(当使用别名建议关闭)
        'import/extensions': 'off', // 确保导入的模块是否需要文件扩展名
        'import/prefer-default-export': 'off', // 当模块只有一个导出时，更喜欢使用默认导出而不是命名导出
        'consistent-return': 'off', // 要求 return 语句始终或从不指定值
        'new-cap': 'off', // 要求构造函数名称以大写字母开头
        'guard-for-in': 'off', // 要求 for-in 循环包含 if 语句
        'class-methods-use-this': 'off', // 强制类方法使用 this
        camelcase: 'off', // 强制执行驼峰命名约定
        eqeqeq: ['error'], // 必须使用 ===
        'prefer-arrow-callback': ['error'], // 回调函数必须使用箭头函数
        'object-shorthand': ['error'], // 对象属性简写
        'max-params': [0, 3], // 函数的参数不能超过3个
        // "vue/multi-word-component-names": "off", // 关闭Vue3中要求.vue文件的名称必须为多个单词的检查
        "@typescript-eslint/no-unused-vars": "warn", // Typescript变量未使用时，仅发出警告，而不阻止程序运行
        
    }
}
```

完整的配置如下
```javascript
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    globals: {
        defineEmits: true,
        document: true,
        localStorage: true,
        GLOBAL_VAR: true,
        window: true,
        defineProps: true,
        defineExpose: true,
        withDefaults: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended' //
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    ignorePatterns: ['dist', '.eslintrc.cjs', '**/*.json'],
    parser: 'vue-eslint-parser',
    plugins: ['@typescript-eslint', 'import'],
    rules: {
        indent: [
            2,
            2,
            {
                SwitchCase: 1
            }
        ], //缩进2个空格
        quotes: [1, 'single'], // 必须使用单引号
        'no-console': 0, // 禁止console
        'no-param-reassign': 'off', // 不允许重新分配 function 参数
        'no-shadow': 'off', // 禁止变量声明与外层作用域的变量同名
        'no-underscore-dangle': 'off', // 禁止标识符中的悬空下划线_
        'no-restricted-syntax': 'off', // 禁止指定的语法
        'no-unused-expressions': 'off', // 禁止未使用的表达式
        'no-unused-vars': 'off', // 禁止未使用过的变量
        'no-case-declarations': 'off', // 禁止 case 子句中的词法声明
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true
            }
        ],
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        'consistent-return': 'off', // 要求 return 语句始终或从不指定值
        'new-cap': 'off', // 要求构造函数名称以大写字母开头
        'guard-for-in': 'off', // 要求 for-in 循环包含 if 语句
        'class-methods-use-this': 'off', // 强制类方法使用 this
        camelcase: 'off', // 强制执行驼峰命名约定
        eqeqeq: ['error'], // 必须使用 ===
        'prefer-arrow-callback': ['error'], // 回调函数必须使用箭头函数
        'object-shorthand': ['error'], // 对象属性简写
        'max-params': [0, 3] // 函数最多只能有3个参数
    }
}

```











#### husky
