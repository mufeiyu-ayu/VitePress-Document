## DOM-节点操作

<details>
<summary>点击这里展开/折叠代码块</summary>

```javascript
// id获取元素
document.getElementById();
// 通过class查找
document.getElementsByClassName()
// 通过name名称获取（一组）
document.getElementsByName()
// 通过标签名获取(一组）
document.getElementsByTagName()
// 通过选择器获取
document.querySelector()
// 通过选择器获取全部
document.queySelectoAll()
// 获取指定元素所有的子元素
let div = document.querSelector('div')
div.children // 获取到的是div下的子元素
div.children[索引值] // 获取到的是所有的子元素（元素节点）
div.childNodes()// 返回的是div下的所有的子节点，包含文本节点，注释，元素节点啥的

// 以下方法只支持IE9及以上支持，但是工作中并不使用
--------------------------------------------------------------------------------------
// 获取第一个子元素
div.firstElementChild //返回父节点下第一个元素节点
// 获取最后一个子元素
div.  // 元素节点，可以偶尔使用，
// 获取子元素/父节点
div.parenElement
div.parentNode  //2者用法相同，需要浏览器版本不同
// 相邻上一个节点/元素
div.previousElementSibling //返回上一个元素节点，还不错
// 获取相邻的下一个节点/元素
div.nextElementSibling
----------------------------------------------------------------------------------------
div.firstChild  //
div.nextSibling   //
div.previousSibling  //
div.lastchild()

---------------------------------------------------------------------------------------------

// 创建节点
document.createElement("span")
// 添加节点
// 创建文档片段（碎片）
docuent.createDocumentFragment();
document.appendChild() // 会添加到最后
// 插入兄弟节点
document.insertBefore(新参，旧参)
// 替换节点
document.replaceChild(新参 , 旧参);
// 删除节点,只能通过父元素来删除
document.parentNode.removeChild(指定子元素)
// 克隆节点
document.cloneNode() //参数传true，表示子元素也克隆

/*
无论是创建还是查询出来的标签，系统都会将元素包装成一个对象返回给我们，
对象中包含了元素的属性
*/

// 获取元素属性
let div = document.querySelector('img')
div.src
div.getAttribute("alt") // 可以获取自定义属性
// 修改元素
div.title = "图片标题"
div.setAttribute("title","22") // 可以修改自定义属性
// 新增属性
div.setAttribute("it666","66666") // 存在修改，不存在新增
// 删除属性
div.removeAttribute("title")
div.removeChild('a') // 删除div下的a标签 // 只是剪切走，a节点还在堆内存中
a.remove() // 直接删除自己，并且从内存中移出


// 获取元素内容
let div =  document.querySelector('div')
div.innerHTML // 包含标签
div.innerText // 不包含标签，去除空格
div.textContent // 不包含标签，去除空格
// 设置内容
div.innerHTML
div.innerText
div.textContent

// 设置元素样式 拥有-采用驼峰转换，添加的样式都是行内样式，会覆盖同名css
let div =  document.querySelector('div')
div.className = ''
div.style.width = '300px'
// 获取样式
div.style.width // 只能获取行内样式的值
window.getComputedStyle(div) // 获取全部
```

</details>

<!--@include: ./domRender.md-->
<!--@include: ./text.md-->
