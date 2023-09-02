## 深拷贝与浅拷贝

### 1.区分深拷贝与浅拷贝

如何区分深拷贝与浅拷贝，简单点来说，就是假设 B 复制了 A，当修改 A 时，看 B 是否会发生变化，如果 B 也跟着变了，说明这是浅拷贝，拿人手短，如果 B 没变，那就是深拷贝，自食其力。

### 2.浅拷贝

```javascript
Object.prototype.num = 100;
const obj1 = {
  name: "anjing",
  age: 21,
  sex: "男",
  car: "bike",
  computer: "WEB",
  message: {
    address: "湖北",
    like: "吃火锅",
    girl: {
      fourYear: "jiajia",
      thressMonth: "no",
    },
  },
  learn: ["javaScript", "css", "HTML"],
};
// 封装浅拷贝函数
function copy(oldObj, newObj) {
  let target = newObj || {};
  for (let key in oldObj) {
    if (oldObj.hasOwnProperty(key)) {
      target[key] = oldObj[key];
    }
  }
  return target;
}
```

此时 obj2 中也跟着变了，因为只能处理第一层的属性，如果第一层属性后面存在引用类型，则无法达到效果

### 3. 简化版-深拷贝

```javascript
//    深拷贝
function deepClone(oldObj) {
  const targetObj = Array.isArray(oldObj) ? [] : {};
  for (let key in oldObj) {
    if (oldObj.hasOwnProperty(key)) {
      if (typeof oldObj[key] === "object" && oldObj[key] !== null) {
        targetObj[key] = Array.isArray(oldObj[key]) ? [] : {};
        targetObj[key] = deepClone(oldObj[key]);
      } else {
        targetObj[key] = oldObj[key];
      }
    }
  }
  return targetObj;
}
```

**深拷贝函数封装步骤**

1. 遍历刚开始将不属与私有属性的方法排除
2. 判断属性是否为引用类型，不是对象则正常拷贝
3. 如果属性为引用类型的对象，则 target[key] = {}，如果为数组则 target[key] = [];
4. 通过递归来逐步排查更深层次的属性类型问题（递归的出口为当属性为字符串则停止运行）
5. 将新对象返回

上面这种深拷贝只是简单实现，只对了原始 obj，aray 做了处理，<br />**那么对于 function，regexp，date 也需要做处理**

### 4.完善版深拷贝

```javascript
const isComplexDataType = (obj) =>
  (typeof obj === "object" || typeof obj === "function") && obj !== null;
const deepClone = function (obj, hash = new WeakMap()) {
  if (obj.constructor === Date) return new Date(obj); // 日期对象直接返回一个新的日期对象
  if (obj.constructor === RegExp) return new RegExp(obj); //正则对象直接返回一个新的正则对象
  //如果循环引用了就用 weakMap 来解决
  if (hash.has(obj)) return hash.get(obj);
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  //遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
  //继承原型链
  hash.set(obj, cloneObj);
  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] =
      isComplexDataType(obj[key]) && typeof obj[key] !== "function"
        ? deepClone(obj[key], hash)
        : obj[key];
  }
  return cloneObj;
};
```
