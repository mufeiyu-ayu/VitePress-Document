## 数据类型检测

### typeof

基于 **typeof**  检测出的结果

1. 首先是一个字符串
2. 字符串中包含对于的类型

局限性：

1. typeof null = object 但是 null 并不是对象
2. 基于 typeof 无法细分出当前值是普通对象还是数组对象，因为只要是对象数据类型，返回的都是'object'

![image.png](/images/typeof.png)

有些时候，typeof 操作符会返回一些令人迷惑但技术上却正确的值：

- 对于基本类型，除 null 以外，均可以返回正确的结果。
- 对于引用类型，除 function 以外，一律返回 object 类型。
- 对于 null ，返回 object 类型。
- 对于 function 返回 function 类型。

其中，null 有属于自己的数据类型 Null ， 引用类型中的 数组、日期、正则 也都有属于自己的具体类型，而 typeof 对于这些类型的处理，只返回了处于其原型链最顶端的 Object 类型，没有错，但不是我们想要的结果。
