import{_ as s,o as n,c as a,a4 as p}from"./chunks/framework.f8637b7f.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Page/NestJs/provider.md","filePath":"Page/NestJs/provider.md","lastUpdated":1695313434000}'),l={name:"Page/NestJs/provider.md"},o=p(`<h2 id="provider" tabindex="-1">provider <a class="header-anchor" href="#provider" aria-label="Permalink to &quot;provider&quot;">​</a></h2><p>Nest 实现了 IOC 容器，会从入口模块开始扫描，分析 Module 之间的引用关系，对象之间的依赖关系，自动把 provider 注入到目标对象。<br> provider 一般都是用 @Injectable 修饰的 class：</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Injectable } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@nestjs/common&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Injectable</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PersonService</span><span style="color:#E1E4E8;"> {}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Injectable } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@nestjs/common&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Injectable</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PersonService</span><span style="color:#24292E;"> {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>在 module 里面的 provide 声明</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// app.modules.ts</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Module } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@nestjs/common&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { AppController } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./app.controller&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { AppService } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./app.service&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { PersonModule } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./person/person.module&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Module</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  imports: [PersonModule],</span></span>
<span class="line"><span style="color:#E1E4E8;">  controllers: [AppController],</span></span>
<span class="line"><span style="color:#E1E4E8;">  providers: [AppService],</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AppModule</span><span style="color:#E1E4E8;"> {}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// app.modules.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Module } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@nestjs/common&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { AppController } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./app.controller&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { AppService } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./app.service&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { PersonModule } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./person/person.module&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Module</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  imports: [PersonModule],</span></span>
<span class="line"><span style="color:#24292E;">  controllers: [AppController],</span></span>
<span class="line"><span style="color:#24292E;">  providers: [AppService],</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppModule</span><span style="color:#24292E;"> {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>此外 provide 还可以自定义名字以及自定义值</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Module</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  controllers: [UserController],</span></span>
<span class="line"><span style="color:#E1E4E8;">  providers: [{</span></span>
<span class="line"><span style="color:#E1E4E8;">    provide: </span><span style="color:#9ECBFF;">&quot;Xiaoman&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// inject参数</span></span>
<span class="line"><span style="color:#E1E4E8;">    useClass: UserService </span><span style="color:#6A737D;">// 值</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    provide: </span><span style="color:#9ECBFF;">&quot;JD&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    useValue: [</span><span style="color:#9ECBFF;">&#39;TB&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;PDD&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;JD&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#6A737D;">// 自定义值</span></span>
<span class="line"><span style="color:#E1E4E8;">  }]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Module</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  controllers: [UserController],</span></span>
<span class="line"><span style="color:#24292E;">  providers: [{</span></span>
<span class="line"><span style="color:#24292E;">    provide: </span><span style="color:#032F62;">&quot;Xiaoman&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// inject参数</span></span>
<span class="line"><span style="color:#24292E;">    useClass: UserService </span><span style="color:#6A737D;">// 值</span></span>
<span class="line"><span style="color:#24292E;">  }, {</span></span>
<span class="line"><span style="color:#24292E;">    provide: </span><span style="color:#032F62;">&quot;JD&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    useValue: [</span><span style="color:#032F62;">&#39;TB&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;PDD&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;JD&#39;</span><span style="color:#24292E;">] </span><span style="color:#6A737D;">// 自定义值</span></span>
<span class="line"><span style="color:#24292E;">  }]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>使用 provide 内注入的值</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// User.controller.ts</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Controller</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AppController</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">appService</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AppService</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#B392F0;">Inject</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Xiaoman&#39;</span><span style="color:#E1E4E8;">)  </span><span style="color:#B392F0;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">userService</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserService</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#B392F0;">Inject</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Xiaoman&#39;</span><span style="color:#E1E4E8;">)  </span><span style="color:#B392F0;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">JD</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">[]</span></span>
<span class="line"><span style="color:#E1E4E8;">    ) {}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// User.controller.ts</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Controller</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppController</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> </span><span style="color:#E36209;">appService</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppService</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#6F42C1;">Inject</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Xiaoman&#39;</span><span style="color:#24292E;">)  </span><span style="color:#6F42C1;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">userService</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserService</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#6F42C1;">Inject</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Xiaoman&#39;</span><span style="color:#24292E;">)  </span><span style="color:#6F42C1;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">JD</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">[]</span></span>
<span class="line"><span style="color:#24292E;">    ) {}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>在此使用@inject 修饰器，会自动帮我们把 provide 的值设为 controller 的实例属性/方法,因此我们也可以不设置 constructor，直接使用修饰器即可，对上面代码做简单修改</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// User.controller.ts</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">Controller</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AppController</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">Inject</span><span style="color:#E1E4E8;">(AppService) </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">appService</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AppService</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">Inject</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Xiaoman&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">userService</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserService</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">Inject</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Xiaoman&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">JD</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">[]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 这样也是完全相同的，可以正常使用注入的方法</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// User.controller.ts</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">Controller</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppController</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">Inject</span><span style="color:#24292E;">(AppService) </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> </span><span style="color:#E36209;">appService</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppService</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">Inject</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Xiaoman&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> </span><span style="color:#E36209;">userService</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserService</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">Inject</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Xiaoman&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> </span><span style="color:#E36209;">JD</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">[]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 这样也是完全相同的，可以正常使用注入的方法</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><strong>总结</strong> 一般情况下，provider 是通过 @Injectable 声明，然后在 @Module 的 providers 数组里注册的 class。</p><p>默认的 token 就是 class，这样不用使用 @Inject 来指定注入的 token。</p><p>但也可以用字符串类型的 token，不过注入的时候要用 @Inject 单独指定。</p><p>除了可以用 useClass 指定注入的 class，还可以用 useValue 直接指定注入的对象。</p><p>如果想动态生成对象，可以使用 useFactory，它的参数也注入 IOC 容器中的对象，然后动态返回 provider 的对象。</p><p>如果想起别名，可以用 useExisting 给已有的 token，指定一个新 token。</p><p>灵活运用这些 provider 类型，就可以利用 Nest 的 IOC 容器中注入任何对象。</p>`,18),e=[o];function r(c,t,y,E,i,d){return n(),a("div",null,e)}const b=s(l,[["render",r]]);export{F as __pageData,b as default};