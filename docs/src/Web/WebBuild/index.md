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
正好最近我也打算在闲暇之余做一个自己的项目,里面包含我封装的所有组件，工具函数，以及自己喜欢的代码规范，还有文档说明，以及后续的博客项目，所以我决定采用这种方式来管理我的项目，这样可以让我更好的管理我的项目，提高开发效率，减少开发成本，
项目采用monorepo+workspace+turbo的方式管理.里面包含了git提交规范，代码规范，命令规范，css规范，配置是Eslint+Prettier+Husky+Lint-staged+Commitlint+Conventional-changelog等等，这对于公司来说前端保持一定的协调性肯定是不错，减少了很多问题。



#### script命令
```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
        "lint": "eslint . --ext ts,tsx,vue --report-unused-disable-directives --max-warnings 0",
        "lint:fix": "eslint --fix --ext ts,tsx,vue --ignore-path .eslintignore .",
        "prettier": "prettier --check .",
        "prettier:fix": "prettier --write .",
        "clean": "rd/s/q node_modules",
        "precommit": "lint-staged",
        "prepare": "husky",
        "cmt": "git add . && git-cz"
},
"config": {
    "commitizen": {
        "path": "node_modules/cz-git"
    }
},

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

#### husky + lint-staged + commitlint
husky是一个git hook工具，可以在git提交前执行一些操作，比如代码检查，代码格式化，单元测试等等，这样可以保证我们的代码质量，提高我们的开发效率，减少我们的开发成本。我只使用了husky的pre-commit钩子，用来在git提交前执行代码检查和代码格式化，这样可以保证我们的代码质量，以及commit-msg钩子，用来在git提交时执行commitlint校验，这样可以保证我们的commit信息符合规范，方便我们后续的版本管理。

```npm
pnpm install husky --save-dev # 安装
pnpm exec husky init # 初始化 执行此命令后会自动在scripts中添加prepare:husky
pnpm exec husky add .husky/pre-commit  # 添加pre-commit钩子
pnpm exec husky add .husky/commit-msg  # 添加commit-msg钩子
```

```commit-msg
#!/bin/sh

# shellcheck source=./_/husky.sh
. "$(dirname "$0")/_/husky.sh"
npx --no-install commitlint --config .commitlintrc.cjs --color --edit $1
```

```pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
npx lint-staged
```

```js
// lint-staged.config.js
module.exports = {
  '*.{js,jsx,ts,tsx}': ['pnpm eslint --fix', 'pnpm prettier --write'],
  '*.vue': ['pnpm eslint --fix', 'pnpm prettier --write']
  // '*.vue': ['pnpm eslint --fix', 'pnpm stylelint --fix', 'pnpm prettier --write']
  // '*.{scss,less,styl,html}': ['pnpm stylelint --fix', 'pnpm prettier --write']
}
```

```js
// .commitlintrc.cjs
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // header最大94字符
    'header-max-length': [0, 'always', 94],

    // subject不能为空
    'subject-empty': [2, 'never'],

    // type必须在指定范围内
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'chore', 'ci', 'perf', 'refactor', 'test', 'build', 'init']
    ],
    // type不能为空
    'type-empty': [2, 'never'],

    // type必须小写
    'type-case': [2, 'always', 'lowerCase'],

    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0],
    'subject-case': [0]
  },
  prompt: {
    messages: {
      type: '请选择提交类型:',
      customScope: '请输入修改范围(可选):',
      subject: '请简要描述提交(必填):',
      body: '请输入详细描述(可选):',
      footer: '请输入要关闭的issue(可选):',
      confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
    },
    types: [
      { value: 'feat', name: 'feat:     新功能' },
      { value: 'fix', name: 'fix:      修复' },
      { value: 'docs', name: 'docs:     文档变更' },
      { value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
      {
        value: 'refactor',
        name: 'refactor: 重构(既不是增加feature，也不是修复bug)'
      },
      { value: 'perf', name: 'perf:     性能优化' },
      { value: 'test', name: 'test:     增加测试' },
      { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
      { value: 'revert', name: 'revert:   回退' },
      { value: 'build', name: 'build:    打包' }
    ],
    // 跳过问题
    skipQuestions: ['body', 'footer', 'issues type', 'customScope', 'breaking', 'private', 'scope'],
    // subject文字长度默认是72
    subjectLimit: 72
  }
}
```


### git flow 

1.**常用命令**
```bash
git flow init  #初始化仓库
git flow feature start xxx # 开启feature [xxx]分支
git flow feature finish xxx # 完成feature [xxx]分支
git flow release start 1.1.5 # 开启release [1.1.5]分支
git flow release finish 1.1.5 # 完成release [1.1.5]分支
```

### package.josn
[package.json文档](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
```json
{
    "name": "vue3-admin-template", // 项目名称
    "version": "0.0.1", // 项目版本
    "description": "vue3-admin-template", // 项目描述
    "keywords": ['vue3-admin-template']" // 关键字
    "homepage": "https://github.com/zhangyuang/vue3-admin-template" // 项目主页
    "bug": "https://github.com/zhangyuang/vue3-admin-template/issues" // 错误报告
    "license": "MIT", // 许可证（MITK开源许可证）
    "private": true, // 私有项目(如设置为 true，则 npm 拒绝发布它)
     "author": "ayu" // 作者
    "contributors": [
        {
            "name": "mufeiyu-ayu",
            "email": "19986442013@163.com"
        }
    ],// 贡献者
    "files":['dist'], // 用于描述当您的包作为依赖项安装时要包含的条目,*代表包含所有文件   
    "exports": {
    ".": {
      "types": "./dist/index.d.ts", // 引用 ts 类型时查找以此路径为查找目标
      "import": "./dist/ai-lowcode-utils.js", // 引用 es 模块
      "require": "./dist/ai-lowcode-utils.cjs" // 引用 node 模块
      }
    }, // 提供了“main”的现代替代方案，允许定义多个入口点，支持环境之间的条件入口解析，并防止除“exports”中定义的入口点之外的任何其他入口点
  "main": "./dist/ai-lowcode-utils.cjs", // 默认入口
  "script": {
    "build": "rollup -c rollup.config.js", // 构建
  }, // 脚本
  "bin": "./dist/ai-lowcode-utils.js",//  or => key ：value 命令行入口
  "repository": "git@github.com:ai-lowcode/core.git",
  "config": {
    "commitizen": "cz-conventional-changelog" 
  }, //设置在升级过程中持续存在的包脚本中使用的配置参数
  "peerDependencies": {
    "vue": "^3.2.13"
  }, // 运行时依赖
  "engines": {
    "node": ">=18.20.3 <20.0.0"
  }, // 指定版本 (若未设置engine-strictconfig标志，否则此字段仅为建议字段，并且仅在将软件包作为依赖项安装时才会产生警告)
  
}
```
#### export
“exports”提供了“main”的现代替代方案，允许定义多个入口点，支持环境之间的条件入口解析，并防止除“exports”中定义的入口点之外的任何其他入口点。这种封装允许模块作者为他们的包清楚地定义公共接口。
对于针对当前支持的Node.js版本的新包，建议使用“exports”字段。对于支持Node.js 10及以下版本的包，“main”字段是必需的。如果同时定义了“exports”和“main”，则在支持的Node.js版本中，“exports”字段**优先于**“main”。

#### version
在使用 npm 安装包时，版本控制是非常灵活的。你可以指定特定版本或使用不同的符号来表示你接受的版本范围。版本号的控制一般遵循 语义化版本控制（SemVer），它的格式是 MAJOR.MINOR.PATCH（主版本号.次版本号.修补版本号）。
```npm
npm install vue3-admin-template@1.0.0 # 安装指定版本
npm install vue3-admin-template@^1.0.0 # 安装大于等于1.0.0的版本，但不包括2.0.0
npm install package-name@~1.2.3 # 安装大于等于1.2.3，但小于1.3.0的版本
npm install package-name@1.2.x # 允许升级到 1.2.x 的任意版本，类似于 >=1.2.0 <1.3.0。即只允许更新补丁版本，不会升级次版本
npm install package-name@1.x # 允许升级到 1.x.x 的任意版本，类似于 >=1.0.0 <2.0.0。只允许更新次版本和补丁版本，不会升级到 2.x
npm install package-name@* # 安装任何版本
npm install package-name@latest # 安装最新版本
npm install package-name@>=1.2.3 # 安装大于等于1.2.3的版本
npm install package-name@<=1.2.3 # 安装小于等于1.2.3的版本
npm install package-name@1.2.3 - 1.3.0 # 安装1.2.3到1.3.0之间的版本
npm install package-name@>=1.2.3 <2.0.0 # 安装大于等于1.2.3，小于2.0.0的版本
npm install package-name@next # 安装下一个版本，如1.2.3-beta.1，会安装1.2.3-beta.2，而不是1.3.0
npm install package-name # 如果不指定版本号，npm 会默认安装包的最新稳定版本，即 latest 标签所对应的版本。

```
**总结**
1. 精确版本（1.2.3）只安装指定的版本。
2. 你可以使用 >=、<= 等符号来定义版本范围，确保灵活性。
3. * 和 x 用于允许更大范围的版本。

### .npmrc
.npmrc 是一个配置文件，用于定义和自定义 npm（Node Package Manager）的行为和选项。它允许你通过编写配置参数来控制 npm 的操作，例如指定注册表、设置代理、管理缓存目录等。
配置级别
全局配置文件：位于用户的主目录下（例如：~/.npmrc），这是针对系统全局用户的配置，影响所有项目。

项目级配置文件：存储在项目的根目录下，影响该项目的 npm 行为。每个项目可以有自己独立的 .npmrc 文件来覆盖全局配置。

用户级配置文件：同样位于用户主目录中的 ~/.npmrc 文件中，可以影响当前用户的 npm 操作。

运行时配置：通过命令行传递选项（如 npm install --registry https://custom-registry.com），这些配置只会影响当前命令执行的过程。

环境变量：你也可以通过环境变量来覆盖 .npmrc 中的某些配置。

**示例配置**

```cmd
registry=https://registry.npmjs.org/ # 指定 npm 的注册表
strict-ssl=true # 禁用 SSL
proxy=http://proxy.company.com:8080 #
save-exact=true # 保存精确匹配
link-workspace-packages=true # 依赖关联（项目使用分包模型时，安装依赖优先从本地下载）
workspace-packages=true # 启用分包模型
strict-peer-dependencies=false # 严格依赖关联（用于指定一个包运行时所需的依赖，但这些依赖不由当前包来安装，而是由使用这个包的 宿主环境（如最终的应用程序或库）来提供。）
```

### Command
Commander 是一个流行的 Node.js 模块，用于创建命令行界面（CLI）应用程序。它提供了一种简单而强大的方式来定义和处理命令行参数、选项和命令。以下是 Commander 的主要用途和特点：

1. 定义命令行选项：
允许你轻松地为你的 CLI 应用定义各种命令行选项，包括短选项（如 -v）和长选项（如 --version）。
2. 解析命令行参数：
自动解析用户输入的命令行参数，并将它们转换为易于使用的 JavaScript 对象。
3. 子命令支持：
支持创建具有多个子命令的复杂 CLI 应用，类似于 git 这样的工具（如 git commit, git push 等）。
4. 自动生成帮助信息：
基于你定义的命令和选项，自动生成帮助文档，使用户可以通过 --help 选项查看使用说明。
5. 版本信息：
轻松添加和显示应用程序的版本信息。
6. 类型转换：
自动将命令行参数转换为适当的 JavaScript 类型。
7. 可定制性：
提供了丰富的 API 来自定义 CLI 的行为和输出。



#### 1.option
```js
.option(flags, description, [defaultValue|fn], [fn])
```
**参数解释**
-  flags: 定义选项的短标志和长标志
-  description: 选项的描述，在帮助信息中显示
-  defaultValue: （可选）选项的默认值
-  fn: （可选）用于处理或验证选项值的函数

**值处理**
- 默认情况下，选项值被视为字符串
- 可以提供一个函数作为最后一个参数来处理值

**特殊用法** 
- 布尔选项：不带值的选项默认为布尔类型
- 否定选项：使用 --no- 前缀可以创建否定的布尔选项
- 可重复选项：可以多次使用同一选项，值会被收集到一个数组中


**demo**
```js
// 基本布尔标志：-d, --debug 是一个简单的开关，不需要值。使用时，options.debug 将为 true。
program.option('-d, --debug', 'output extra debugging');

// 2. 必需值选项：-u, --user <name> 要求提供一个值。如果使用时没有提供值，Commander 会报错。
program.option('-u, --user <name>', 'user\'s name');
O
// 3. 可选值选项：-t, --tag [value] 的值是可选的。如果使用时没有提供值，options.tag 将为 true
program.option('-t, --tag [value]', 'tag to add');

// 4. 默认值选项：-p, --port <number> 有一个默认值 '3000'。如果不指定，将使用这个默认值。
program.option('-p, --port <number>', 'port number', '3000');

// 5. 选择列表：-s, --size <size> 限制了可选值为 'small'、'medium' 或 'large'。
program.option('-s, --size <size>', 'pizza size', ['small', 'medium', 'large']);

// 6. 自定义处理函数：-l, --list <items> 使用函数将逗号分隔的输入转换为数组
program.option('-l, --list <items>', 'comma separated list', (value) => value.split(','));

// 7. 否定布尔选项：--no-sauce 允许禁用一个默认为 true 的选项
program.option('--no-sauce', 'Remove sauce');

// 8. 可变参数选项：-i, --ingredient <ingredient> 可以多次指定，所有值都会被收集到一个数组中。
program.option('-i, --ingredient <ingredient>', 'pizza ingredient', (ingredient, previous) => previous.concat([ingredient]), []);

// 9. 自定义验证：-q, --quantity <number> 使用函数验证输入是否为有效的数字。
program.option('-q, --quantity <number>', 'number of pizzas', (value) => {
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error('Invalid quantity, must be a number.');
  }
  return parsed;
});

// 组合选项：-c, --cheese <type> 和 -C, --no-cheese 展示了如何处理相关的选项。
program.option('-c, --cheese <type>', 'add the specified type of cheese', 'mozzarella')
       .option('-C, --no-cheese', 'remove cheese');

program.parse(process.argv);

const options = program.opts();
console.log(options);
```

```cmd
node script.js -d -u Alice --tag important -p 8080 -s medium -l tomato,mushroom --ingredient pepperoni -i olives -q 2 -c cheddar
```

