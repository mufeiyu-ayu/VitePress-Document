### 闭包的运行机制

**我们通过题目来详细了解闭包的运行机制，以及代码执行流程**

```javascript
var n = 0
function a() {
	var n = 10
	function b() {
		n++
		console.log(n)
	}
	b()
	return b //11
}
var c = a() //11
c() //12
console.log(n) //0
```

1.首先在全局作用域下，先变量提升，将带有 **var function**  的变量提到最前面 然后让 n 赋值为 0，等变量提升，和变量赋值关联结束时，到了函数 a （需了解函数底层运行机制）开辟了一块堆内存，里面包含的是函数 a 里面所有的代码，存储方式是字符串存储，a 指向的是函数 a（不过指向的是地址）然后执行 c = a(),即将函数 a 执行然后赋值给 a，则函数开辟块全新的私有栈内存，将函数堆内存中的字符串代码执行（里面也包含了形参赋值，和变量提升,然后又开辟了一块堆内存，里面包含的是函数 b 的字符串代码），然后执行代码 n = 10，然后执行函数 b，又开辟了一块全新的私有栈内存用来执行函数 b（n++，由于 n 不是私有的，需要往上级作用域中查找，即在函数 a 中查找 n，然后 n = 10+ 1= 11,然后 return b ，即返回了一个函数 b，此时 c 执行了函数 b，此时函数 a 的私有栈内存中的作用域是不能立即销毁的，因为 c 指向的是函数函数 b，而 b 又由函数 a 得到，然后执行 c(),既执行的是函数 b，然后到 n++,然后向上级作用域中查找，由于头开始执行函数 b 的时候，n 已经等于 11，所有此时 n++，n 等于 12<br />**图解** <br />![image.png](/images/closer1.png)<br />**练习**

```javascript
var a=10,b = 11,c = 12;
 function test(a) {
     a=1;  /
     var b =2;
     c= 3;
 }
 test(10);
 console.log(a); //10
 console.log(b); //11
 console.log(c) //3
```

现在来做这种题是不是觉得非常简单，这里我就不过多追溯了。

**再来一题** <br />![image.png](/images/closer2.png)

```javascript
var a = 9
function fn() {
	a = 0
	return function (b) {
		return b + a++
	}
}
var f = fn()
console.log(f(5)) //5
console.log(fn()(5)) //5
console.log(f(5)) //6
console.log(a) //2
```

**再来一题**

```javascript
function fn(i) {
	return function (n) {
		console.log(n + i++)
	}
}
var f = fn(10)
f(20) //30  i =11
fn(20)(40) //20+41 = 60
fn(30)(50) //80
f(30) // 41 30+11
```

**变态题**

```javascript
var num = 10 // 全局变量 10
var obj = {num: 20} // 开辟堆内存
obj.fn = (function (num) {
	this.num = num * 3
	num++
	return function (n) {
		this.num += n
		num++
		console.log(num)
	}
})(obj.num)
var fn = obj.fn
fn(5) // 22
obj.fn(10) //23
console.log(num, obj.num) //65 30
```

![Image Alt Text](/images/closer3.png)
