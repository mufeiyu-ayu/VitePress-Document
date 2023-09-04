## 变量提升

当浏览器开辟出宫代码执行的占内存后，代码并没有自上而言下立即执行，而是继续做了一些事情： **把当前作用域中所有带 var funcion 关键字的进行提前声明和定义=>变量提升机制**

- 带 var 的只是提前声明 var a 如果只声明并没有赋值，默认为 undefined
- 带 function 的不仅是声明，而且还定义了 a = 13 定义其实就是赋值，准确来说就是让变量和某个值进行关联

  1.let const 不存在变量提升机制<br />创建变量的种方式中，var function 有变量提升，而 let const import class 不存在这个机制<br />2.var 运行重复声明（或执行上下文中）<br />在相同的作用域中或执行上下文中 如果使用 var function 关键词声明变量并且重复声明，是不会影响的 ，但是使用 let const 就不行，浏览器会效验当前作用域中是否已经存在这个变量了，如果已经存在了，则再次基于 let 重新声明就会报错<br />（在浏览器开辟占内存供代码自上而下执行之前，不仅有变量提升的操作，还有很多其他的操作，如词法解析或者词法检测，如果发现错误，则所有代码不执行<br />3.let 可以解决 typeof 坚持时出现的暂时性死区问题

```javascript
let a = 12;
function fn() {
  console.log(a); // uncaught referenceError:cannot access 'a' before initialization
  let a = 13; //词法解析，类似于变量提升，已经知道了当前私有栈中有个 Let a ，此时的私有栈中出现的A都是私有的形参赋值&变量提升
}
fn();
console.log(a); //12
// 在当前作用域下，如果创建变量，使用的是let const,一定不能再创建代码前面使用这些变量，否则报错referenceError:cannot access 'a' before initialization
```

**Let**

```javascript
// let 所在的大括号是一个块作用域（私有作用域）
if(1===1) {
  var a= 12;
   let b = 13; //有块级作用域。私有块
}
]
console.log(a)
console.log(b) //b is noe defined
```

let 具有块级作用域还体现在

```javascript
let n = 12;
function fn() {
  if (1) {
    let n = 123;
    console.log(n);
  }
  console.log(n); //12
}
fn();
```

当大括号包裹变量时，外部是无法访问到大括号内部的变量信息的
