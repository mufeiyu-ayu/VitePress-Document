## ES-14 种对象操作方法

### 1.获取原型

```javascript
const obj = { a: 1, b: 2 };
const proto = Object.getPrototypeOf(obj);
console.log(proto);
console.log(obj.__proto__);
console.log(Object.prototype);
```

### 2.设置原型

```javascript
const obj = { a: 1, b: 2 };
Object.setPrototypeOf(obj, { c: 3, d: 4 });
console.log(obj.__proto__);
```

### 3.获取对象的可扩展性

```javascript
const obj = { a: 1, b: 2 };
const isexensible = Object.isExtensible(obj);
console.log(" isexensible: ", isexensible);
```

### 4.获取自有属性

```javascript
const obj = { a: 1, b: 2 };
Object.getOwnPropertyNames(obj);
console.log(
  "Object.getOwnPropertyNames(obj): ",
  Object.getOwnPropertyNames(obj)
);
```

### 5.禁止扩展对象

```javascript
const obj = { a: 1, b: 2 };
Object.preventExtensions(obj);
obj.c = 3;
console.log(obj); // {a:1.b:2}
```

### 6.拦截对象操作

```javascript
Object.defineProperty();
```

### 7.判断是否为自身属性

```javascript
const obj = { a: 1 };
console.log(obj.hasOwnProperty("a")); // true
```

### 8.[[GET]]

```javascript
const obj = { a: 1 };
console.log(a in obj);
console.log(obj.a);
```

### 9.[[SET]]

```javascript
const obj = { a: 3 };
obj.a = 4;
```

### 10.delete

```javascript
const obj = { a: 1 };
delete obj.a;
```

### 11.Enumerate

```javascript
const obj = { a: 1, b: 2 };
for (key in obj) {
  console.log(obj[key]);
}
```

### 12.获取键集合

```javascript
const obj = { a: 1, b: 2 };
let a = Object.keys(obj); // ['a','c']
console.log(obj);
console.log(a[0]);
```

### 13.函数调用

```javascript
const obj = { a: "i am is a obj" };
var a = "globalContext";
function fn() {
  console.log(this.a);
}
fn(); // globalContext

obj.fn = fn;
obj.fn(); // i am is a obj
```

### 14.new

```javascript
function Person() {}
const person1 = new Person();
```
