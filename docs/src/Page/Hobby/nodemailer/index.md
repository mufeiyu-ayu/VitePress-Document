## nodemailer 发邮件

当我们需要发送邮件时，可以使用 nodemailer 这个库。 然后再使用邮箱的 smtp 服务。我这里使用的是 aliyun 的邮箱服务。

### 安装

```bash
npm install nodemailer
```

### 使用

```js
var nodemailer = require('nodemailer')
const fs = require('fs')
const cheerio = require('cheerio') // 处理html文件
const path = require('path')
const htmlTemplate = fs.readFileSync('./HAL/aaa.html', 'utf8')
const htmlFilePath = './HAL/aaa.html'
const $ = cheerio.load(htmlTemplate)
$('img').each((index, element) => {
  const imgSrc = $(element).attr('src')

  if (imgSrc) {
    const imageData = fs.readFileSync(`./HAL/${imgSrc}`)
    //
    const base64Image = Buffer.from(imageData).toString('base64')
    //
    $(element).attr('src', `data:image/jpeg;base64,${base64Image}`)
  }
})
// 68db7964-f8da-4734-913d-88098a5f43da

$('*[style*=background-image]').each((index, element) => {
  const styleAttr = $(element).attr('style')
  const matches = styleAttr.match(/background-image:\s*url\(['"]?(.*?)['"]?\)/)
  if (matches && matches[1]) {
    const imageUrl = matches[1]
    const imagePath = path.resolve(path.dirname(htmlFilePath), imageUrl)
    const imageData = fs.readFileSync(imagePath)
    const base64Image = Buffer.from(imageData).toString('base64')

    const updatedStyle = styleAttr.replace(
      /(background-image:\s*url\()(.*?)(\))/,
      (match, p1, p2, p3) => {
        return `${p1}data:image/jpeg;base64,${base64Image}${p3}`
      }
    )
    $(element).attr('style', updatedStyle)
  }
})
const htmlWithBase64Images = $.html()

var transporter = nodemailer.createTransport({
  host: 'smtpdm.aliyun.com',
  port: 25,
  auth: {
    user: 'jiaxiaoyi@mufeiyua.com',
    pass: '###', // aliyun stmp 密码
  },
})

var mailOptions = {
  from: '阿羽<jiaxiaoyi@mufeiyua.com>',
  // to:"19986442013@163.com",
  to: '2382839439@qq.com',
  subject: '再来一封',
  replyTo: '2382839439@qq.com',
  text: '哈哈哈',
  html: htmlWithBase64Images,
}
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    // do something
  }
  // success
  console.log('Message sent: ' + info.response)
})
```

**总结**
由于使用的是阿里云的邮箱服务，所以使用的是阿里云的 smtp 服务。如果使用的是其他邮箱服务，那么需要修改 host 和 port。如果使用的是其他邮箱服务，那么需要修改 host 和 port。如果使用的是其他邮箱服务，那么需要修改 host 和 port。重要的事情说三遍。
并且在 nodenodemailer 中我们可以对 html 文件进行处理，比如将图片转换成 base64 格式，这样就不用再发送邮件的时候再去请求图片了。，不过不同企业的邮箱服务对 html 文件的处理方式不一样，所以需要根据不同的邮箱服务进行处理。比如当我处理 qq 邮箱的时候 base64 图片只支持 data:image/jpeg
