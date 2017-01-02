/**
 *  http://www.ttlsa.com/  
 */

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
  autorun: true,
  translate: require('./translate')
}
