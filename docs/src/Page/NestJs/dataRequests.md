## nest 数据传输方式

对于前端来说，后端主要是提供 http 接口来传输数据，而这种数据传输的方式主要有 5 种：

1. url param
2. query
3. form-urlencoded
4. form-data
5. json

### url param

```javascript
http://guang.zxg/person/1111   // 参数为111
```

nest 解析

```typescript
@Controller('api/person')
export class PersonController {
  @Get(':id')
  urlParam(@Param('id') id: string) {
    return `received: id=${id}`
  }
}
```

@Controller('api/person') 的路由和 @Get(':id') 的路由会拼到一起，也就是只有 /api/person/xxx 的 get 请求才会走到这个方法。

前端代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://unpkg.com/axios@0.24.0/dist/axios.min.js"></script>
  </head>
  <body>
    <script>
      async function urlParam() {
        const res = await axios.get('/api/person/1')
        console.log(res)
      }
      urlParam()
    </script>
  </body>
</html>
```

### query

通过 url 中 ？后面的用 & 分隔的字符串传递数据。比如：

```
http://guang.zxg/person?name=guang&age=20
```

这里的 name 和 age 就是 query 传递的数据。

nest 解析

```typescript
@Controller('api/person')
export class PersonController {
  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return `received: name=${name},age=${age}`
  }
}
```

前端代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://unpkg.com/axios@0.24.0/dist/axios.min.js"></script>
  </head>
  <body>
    <script>
      async function query() {
        const res = await axios.get('/api/person/find', {
          params: {
            name: 'ayu',
            age: 20,
          },
        })
        console.log(res)
      }
      query()
    </script>
  </body>
</html>
```

### form urlencoded

form urlencoded 是通过 body 传输数据，其实是把 query 字符串放在了 body 里，所以需要做 url encode：

前端代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://unpkg.com/axios@0.24.0/dist/axios.min.js"></script>
    <script src="https://unpkg.com/qs@6.10.2/dist/qs.js"></script>
  </head>
  <body>
    <script>
      async function formUrlEncoded() {
        const res = await axios.post(
          '/api/person',
          Qs.stringify({
            name: '光',
            age: 20,
          }),
          {
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
          }
        )
        console.log(res)
      }

      formUrlEncoded()
    </script>
  </body>
</html>
```

nest 解析

```typescript
@Controller('api/person')
export class PersonController {
  @Post()
  body(@Body() createPersonDto) {
    return `received: ${JSON.stringify(createPersonDto)}`
  }
}
```

### json

nest 解析

```typescript
@Controller('api/person')
export class PersonController {
  @Post()
  body(@Body() createPersonDto) {
    return `received: ${JSON.stringify(createPersonDto)}`
  }
}
```

前端代码使用 axios 发送 post 请求，默认传输 json 就会指定 content type 为 application/json，不需要手动指定：

前端代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://unpkg.com/axios@0.24.0/dist/axios.min.js"></script>
  </head>
  <body>
    <script>
      async function json() {
        const res = await axios.post('/api/person', {
          name: 'ayu',
          age: 20,
        })
        console.log(res)
      }
      json()
    </script>
  </body>
</html>
```

**总结**
我们用 axios 发送请求，使用 Nest 起后端服务，实现了 4 种 http/https 的数据传输方式：

其中前两种是 url 中的：

url param： url 中的参数，Nest 中使用 @Param 来取
query：url 中 ? 后的字符串，Nest 中使用 @Query 来取
后三种是 body 中的：

form urlencoded： 类似 query 字符串，只不过是放在 body 中。Nest 中使用 @Body 来取，axios 中需要指定 content type 为 application/x-www-form-urlencoded，并且对数据用 qs 或者 query-string 库做 url encode
json： json 格式的数据。Nest 中使用 @Body 来取，axios 中不需要单独指定 content type，axios 内部会处理。
