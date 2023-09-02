## innerHTML,inerText，textContent 的区别

### 1.innerHTML

#### 1.1 执行过程

当给 innerHTML 设置一个值的时候到底发生了什么？用户代理按照以下步骤：

1. 给定的值被解析为 HTML 或者 XML（取决于文档类型），结果就是 DocumentFragment 对象代表元素新设置的 DOM 节点。
2. 如果元素内容被替换成 &lt;template&gt; 元素，&lt;template&gt; 元素的 content 属性会被替换为步骤 1 中创建的新的 DocumentFragment。
3. 对于其他所有元素，元素的内容都被替换为新的 DocumentFragment 节点。

#### 1.2 安全问题

[HTML5](https://so.csdn.net/so/search?q=HTML5&spm=1001.2101.3001.7020)和现代的新的浏览器都会阻止这种通过 innerHTML 嵌入 script 脚本的程序执行

```javascript
const name = "John";
// assuming 'el' is an HTML DOM element
el.innerHTML = name; // harmless in this case

// ...

name = "<script>alert('I am John in an annoying alert!')</script>";
el.innerHTML = name; // harmless in this case
```

尽管这看上去像 [cross-site scripting](https://zh.wikipedia.org/wiki/cross-site_scripting) 攻击，结果并不会导致什么。HTML 5 中指定不执行由 innerHTML 插入的 &lt;script&gt;标签。<br />然而，有很多不依赖 &lt;script&gt; 标签去执行 JavaScript 的方式。所以当你使用 innerHTML 去设置你无法控制的字符串时，这仍然是一个安全问题。例如：

```javascript
const name = "<img src='x' onerror='alert(1)'>";
el.innerHTML = name; // shows the alert
```

基于这个原因，当插入纯文本时，建议不要使用 innerHTML 。取而代之的是使用 [Node.textContent](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent) ，它不会把给定的内容解析为 HTML，它仅仅是将原始文本插入给定的位置。

#### 1.3 优化方案

```javascript
const tr = document.createElement("tr");
tr.innerHTML = "<li>11</li>";
ul.appendchild(tr);
```

这样就只是把一个字符串放进了一个 dom 节点里，这个节点是在[内存](https://so.csdn.net/so/search?q=%E5%86%85%E5%AD%98&spm=1001.2101.3001.7020)里面的，并没有在 document 文档

### 2.textContent

#### 2.1[与 innerText 的区别](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent#%E4%B8%8E_innertext_%E7%9A%84%E5%8C%BA%E5%88%AB)

不要被 Node.textContent 和 [HTMLElement.innerText](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/innerText) 的区别搞混了。虽然名字看起来很相似，但有重要的不同之处：

- textContent 会获取*所有*元素的内容，包括 &lt;script&gt; 和 &lt;style&gt; 元素，然而 innerText 只展示给人看的元素。
- textContent 会返回节点中的每一个元素。相反，innerText 受 CSS 样式的影响，并且不会返回隐藏元素的文本，
  - 此外，由于 innerText 受 CSS 样式的影响，它会触发回流（ [reflow](https://developer.mozilla.org/zh-CN/docs/Glossary/Reflow) ）去确保是最新的计算样式。（回流在计算上可能会非常昂贵，因此应尽可能避免。）
- 与 textContent 不同的是，在 Internet Explorer (小于和等于 11 的版本) 中对 innerText 进行修改， 不仅会移除当前元素的子节点，而且还会*永久性地破坏*所有后代文本节点。在之后不可能再次将节点再次插入到任何其他元素或同一元素中。
- 优点;当改写 textContent 时，只会将文本插入到元素内部去，性能比 innerHTML 好
- 它不会被解析成 dom 节点，只解析为文本节点（减少回流次数）

### 3.innerText

给元素添加文本节点，只会获取给客户看的内容，script，以及 style 将会被隐藏

### 4.总结

innerHTML：性能不好，可以提取文本及 html 标签<br />innerText：性能好，只能提取文本，会剔除 html 标签及 script、style 内容，受 css 影响<br />textContent：性能好，可以提取文本及 script、style 内容，会剔除 html 标签，不受 css 影响
