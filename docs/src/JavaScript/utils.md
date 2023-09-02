## 工具函数封装

#### 1.指定范围内的随机数

1）min ≤ r ≤ max （包含左右区间）

```javascript
function RandomNumBoth(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range); //四舍五入
  return num;
}
```

2）min ≤ r < max 只包含左端点

```javascript
function RandomNum(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.floor(Rand * Range); //舍去
  return num;
}
```

3. min < r ≤ max 只包含右端点

```javascript
function RandomNum(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  if (Math.round(Rand * Range) == 0) {
    return Min + 1;
  }
  var num = Min + Math.round(Rand * Range);
  return num;
}
```

4）min < r < max 不包含左右区间

```javascript
function RandomNum(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  if (Math.round(Rand * Range) == 0) {
    return Min + 1;
  } else if (Math.round(Rand * Max) == Max) {
    index++;
    return Max - 1;
  } else {
    var num = Min + Math.round(Rand * Range) - 1;
    return num;
  }
}
```

#### 2.**随机排列数组(洗牌)**

```javascript
var arr = ["A", "B", "C", "D", "E"];
console.log(arr.slice().sort(() => Math.random() - 0.5));
//[ 'C', 'B', 'A', 'D', 'E' ]
```

#### 3.**.获取随机布尔值**

```javascript
const randomBoolean = () => Math.random() >= 0.5;
console.log(randomBoolean()); ---------------------------------------false
```

#### 4.**生成随机十六进制代码**

```javascript
function RandomColor(){
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0'))
}
```

#### 5.对象的 map 函数

```javascript
const objectMap = function (key, value) {
  if (typeof value === "number") {
    return value * 2;
  }
  return value;
};

let obj = {
  a: 1,
  b: 2,
  c: 3,
  ada: "ces",
};
let newObj = JSON.parse(JSON.stringify(obj, objectMap));
console.log(newObj);
```
