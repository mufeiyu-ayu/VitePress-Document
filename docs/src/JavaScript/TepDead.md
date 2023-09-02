## let vs var 及暂时性死区问题

**let vs var**

1. let 没有变量提升（但是在词法解析阶段也得知某个变量是否为私有变量
2. let 不允许在相同作用域下重复声明
3. let 解决了 js 中的暂时性死区问题
4. let 创建的全局变量每一天给 window 设置对应的属性
5. let 会产生块级作用域

**暂时性死区问题** <br />暂时性死区：<span style="color: blueviolet;">在 ES6 之前，使用 typeof 运算符操作一个未声明的变量的时候，不会报错，该变量以 undefined 处理，而在 ES6 之后，使用 ES6 的变量声明方法（let const claa,）不可以在声明前使用 typeof ，否则会显示报错，ES6 变量声明前的代码区域，被称为暂时性死区</span>

**1.ES6 之前**

```javascript
console.log(typeof a); //undefined; （a并没有用var,function声明）但未报错
```

**2.ES6 之后**

```javascript
// 暂时性死区 start
consoloe.log(typeof a); //Uncaught ReferenceError: Cannot access 'a' before initialization
// 暂时性死区结束 end
let a;
```
