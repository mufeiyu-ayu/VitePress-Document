### instanceof

```javascript
function CreatePerson(name, age) {
  this.name = name;
  this.age = age;
}
let Person1 = new CreatePerson("安静", 12);
console.log(Person1 instanceof CreatePerson); //True
```

**instanceof** :用来检测某个实例是否属于这个类<br />实例 instanceof 类 ，属于则返回 true，不属于返回 false<br />**局限性** ：<br />1.要求检测的实例必须是对象数据类型，基本数据类型的实例是无法检测出来的

```javascript
function CreatePerson(name, age) {
  this.name = name;
  this.age = age;
}
let Person1 = new CreatePerson("安静", 12);
console.log(Person1 instanceof CreatePerson); //True
let ary = [11];
console.log(ary instanceof Array); //true
console.log(ary instanceof Object); //true
//基本数据类型在js中的特殊性，
/* 1.一定是自己所属类的实例，
       2. 但是不一定是对象数学类型
       
     */
let n = 10;
console.log(n instanceof Number); //false ?
console.log(typeof n); //'number'

//    构造函数创建模式（创建出来的实例是对象类型的）
let c = new Number("10");
console.log(c instanceof Object); //true
```
