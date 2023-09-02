---
next:
  text: "Css"
  link: "../Css/css.md"
---

## 一 外边距合并问题

**通常，大盒子中嵌套小盒子，如果给小盒子添加 margin-top 属性，则会出现大盒子和小盒子一起向下移动的现象**。

html 代码如下

```html
<div class="outer">
  <div class="inner"></div>
</div>
```

css 代码如下

```html
<style type="text/css">
  .outer {
    width: 400px;
    height: 400px;
    background-color: teal;
  }
  .inner {
    width: 200px;
    height: 200px;
    background-color: pink;
    margin-top: 100px;
  }
</style>
```

效果如图<br />![image.png](https://github.com/mufeiyu-ayu/onlineImg/blob/master/1.png?raw=true)<br />由上图可以看到并没有达到我们想要的效果，此时解决的方法如下：

1、给父级元素添加边框（border）<br/>
2、给父级设置 over-flow：hidden 属性<br/>
3、不给子级使用 margin 属性，给父级添加 padding<br/>
4、给子级或者父级一方添加浮动<br/>
5、给子级或者父级一方添加绝对定位<br/>
6、给子级或者父级一方添加属性：display：inline-block;
