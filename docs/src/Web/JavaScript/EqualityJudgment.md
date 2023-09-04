## 相等，严格相等，通值相等

**1.抽象等式比较算**

比较 x == y，其中 x 和 y 是值，产生**true**或 **false**。如下进行这样的比较：

1. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 与[Type]() ( _y_ ) 相同，则
   1. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 为 undefined，则返回**true**。
   2. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 为 Null，则返回**true**。
   3. 如果[类型](https://262.ecma-international.org/5.1/#sec-8)( _x_ ) 是数字，那么
      1. 如果*x*是**NaN**，则返回**false**。
      2. 如果*y*是**NaN**，则返回**false**。
      3. 如果*x 与 y*是相同的 Number 值，则返回**true**。
      4. 如果*x*为**+0**且*y*为**-0**，则返回**true**。
      5. 如果*x*为**-0**且*y*为**+0**，则返回**true**。
      6. 返回**假**。
   4. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 是字符串，则如果*x*和*y*是完全相同的字符序列（相同长度和对应位置的相同字符），则返回**true 。**否则，返回 **false**。
   5. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 是 Boolean ，如果*x*和*y*都为 **true**或都为**false ，则返回 true**。否则，返回**false**。
   6. 如果*x*和*y*引用同一个对象，则返回**true 。**否则，返回**false**。
2. 如果*x*为**null**且\*y**\*未定义**，则返回**true**。
3. 如果\*x**\*未定义**且*y*为**null** ，则返回**true**。
4. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 是 Number 并且[Type](https://262.ecma-international.org/5.1/#sec-8) ( _y_ ) 是 String，则<br />返回比较结果*x* == [ToNumber](https://262.ecma-international.org/5.1/#sec-9.3) ( _y_ )。
5. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 是 String 并且[Type](https://262.ecma-international.org/5.1/#sec-8) ( _y_ ) 是 Number ，则<br />返回比较结果[ToNumber](https://262.ecma-international.org/5.1/#sec-9.3) ( _x_ ) == _y_。
6. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 是 Boolean ，则返回比较结果[ToNumber](https://262.ecma-international.org/5.1/#sec-9.3) ( _x_ ) == _y_。
7. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _y_ ) 是 Boolean，则返回比较结果*x* == [ToNumber](https://262.ecma-international.org/5.1/#sec-9.3) ( _y_ )。
8. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 是 String 或 Number 并且[Type](https://262.ecma-international.org/5.1/#sec-8) ( _y_ ) 是 Object，则<br />返回比较结果*x* == [ToPrimitive](https://262.ecma-international.org/5.1/#sec-9.1) ( _y_ )。 //将对象类型转化为非对象类型
9. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 是 Object 并且[Type](https://262.ecma-international.org/5.1/#sec-8) ( _y_ ) 是 String 或 Number ，<br />则返回比较[ToPrimitive](https://262.ecma-international.org/5.1/#sec-9.1) ( _x_ ) == *y*的结果。
10. 返回**假**。

注 1 鉴于上述平等的定义：

- 可以通过以下方式强制进行字符串比较：**"" + a == "" + b**。
- 可以通过以下方式强制进行数字比较：**+a == +b**。
- 可以通过以下方式强制进行布尔比较：**!a == !b**.

笔记 2 等式运算符保持以下不变量：

- **A** **!=** **B**相当于**!(A** **==** **B)**。
- **A** **==** **B**等价于，除了和**B** **==** **A**的求值顺序。**AB**

注 3 等式运算符并不总是可传递的。例如，可能有两个不同的 String 对象，每个对象代表相同的 String 值；操作员会认为每个 String 对象都等于 String 值**==**，但两个 String 对象不会彼此相等。例如：

- **new String("a")** **==** **"a"**并且**"a"** **==** **new String("a")**都是**真实的**。
- **new String("a")** **==** **new String("a")**是**假**的。

注 4 字符串比较对代码单元值序列使用简单的相等性测试。没有尝试使用 Unicode 规范中定义的更复杂的、面向语义的字符或字符串相等和整理顺序定义。因此，根据 Unicode 标准规范相等的字符串值可以测试为不相等。实际上，这个算法假设两个字符串都已经是规范化的形式。

<hr/>

**2.严格等于运算符 ( === )**

产生式 EqualityExpression **: **_EqualityExpression _**===** *RelationalExpression*的评估如下：

1. 令*lref*为评估*EqualityExpression*的结果。
2. 令*lval*为[GetValue](https://262.ecma-international.org/5.1/#sec-8.7.1) ( _lref_ )。
3. 令*rref*为评估*RelationalExpression*的结果。
4. 设*rval*为[GetValue](https://262.ecma-international.org/5.1/#sec-8.7.1) ( _rref_ )。
5. 返回执行严格相等比较的结果*rval* === _lval_。（见[11.9.6](https://262.ecma-international.org/5.1/#sec-11.9.6)）

<hr/>

**3.严格不等于运算符 ( !== )**

产生式 EqualityExpression **: **_EqualityExpression _**!==** *RelationalExpression*的评估如下：

1. 令*lref*为评估*EqualityExpression*的结果。
2. 令*lval*为[GetValue](https://262.ecma-international.org/5.1/#sec-8.7.1) ( _lref_ )。
3. 令*rref*为评估*RelationalExpression*的结果。
4. 设*rval*为[GetValue](https://262.ecma-international.org/5.1/#sec-8.7.1) ( _rref_ )。
5. 令*r*为执行严格相等比较*rval* === *lval*的结果。（见[11.9.6](https://262.ecma-international.org/5.1/#sec-11.9.6)）
6. 如果*r*为**true**，则返回**false**。否则，返回**true**。

<hr/>

**4.严格等式比较算法**

比较 x === y（其中 x 和 y 是值）产生**true**或 **false**。如下进行这样的比较：

1. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 与[Type](https://262.ecma-international.org/5.1/#sec-8) ( _y_ ) 不同，则返回 **false**。
2. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 未定义，则返回**true**。
3. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 为 Null，则返回**true**。
4. 如果[类型](https://262.ecma-international.org/5.1/#sec-8)( _x_ ) 是数字，那么
   1. 如果*x*是**NaN**，则返回**false**。
   2. 如果*y*是**NaN**，则返回**false**。
   3. 如果*x 与 y*是相同的 Number 值，则返回**true**。
   4. 如果*x*为**+0**且*y*为**-0**，则返回**true**。
   5. 如果*x*为**-0**且*y*为**+0**，则返回**true**。
   6. 返回**假**。
5. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 是 String ，则如果*x*和*y*是完全相同的字符序列（相同长度和对应位置的相同字符），则返回**true ；**否则，返回 **false**。
6. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 是 Boolean ，如果*x*和*y*都为**true**或都为**false ，则返回 true**；否则，返回**false**。
7. 如果*x*和*y*引用同一个对象，则返回**true 。**否则，返回**false**。

笔记该算法在处理有符号零和 NaN 方面[与 SameValue 算法 (9.12)不同。](https://262.ecma-international.org/5.1/#sec-9.12)

<hr/>

**5.The SameValue Algorithm**

内部比较抽象操作 SameValue( x , y )，其中 x 和 y 是 ECMAScript 语言值，产生**true**或**false**。如下进行这样的比较：

1. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 与[Type](https://262.ecma-international.org/5.1/#sec-8) ( _y_ ) 不同，则返回**false**。
2. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 未定义，则返回**true**。
3. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 为 Null，则返回**true**。
4. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 是 Number，那么。
   1. 如果*x*是 NaN 并且*y*是 NaN，则返回**true**。
   2. 如果*x*为 +0 且*y*为 -0，则返回**false**。
   3. 如果*x*为 -0 且*y*为 +0，则返回**false**。
   4. 如果*x 与 y*是相同的 Number 值，则返回**true**。
   5. 返回**假**。
5. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 是 String ，则如果*x*和*y*是完全相同的字符序列（相同长度和对应位置的相同字符），则返回**true ；**否则，返回 **false**。
6. 如果[Type](https://262.ecma-international.org/5.1/#sec-8) ( _x_ ) 是 Boolean ，如果*x*和*y*都为**true**或都为**false ，则返回 true**；否则，返回**false**。
7. *如果 x*和*y*引用同一个对象，则返回 true 。否则，返回**false**。
