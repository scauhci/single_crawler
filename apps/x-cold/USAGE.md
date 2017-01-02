### 基本配置示例

``` javascript
module.exports = {
  // 根URL
  domain: 'http://www.tuicool.com/',
  // 种子URL列表
  seedList: [
    'http://www.tuicool.com/'
  ],
  // 列表相关的配置
  list: {
    selector: {
      'list[]': '.index-item a@href'
    }
  },
  // 详情页相关的配置
  detail: {
    selector: {
      'title': '.article_detail_bg h1',
      'content': '.article_body@html',
      'time': '.article_meta .timestamp',
      'source': '.article_meta a@href'
    }
  },
  // 自动运行
  autorun: true,
  // 对content进行转码处理
  translate: require('./translate')
}
```

### selector 字段说明

> 列表配置

`list[]` 字段为必选字段，其他自定义字段暂时未作处理

> 详情页配置

`title` 和 `content` 为必选字段，其他字段暂时未作处理
