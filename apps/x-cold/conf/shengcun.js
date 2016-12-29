/**
 *  http://www.ttlsa.com/  
 */

module.exports = {
  // 根URL
  domain: 'http://www.ttlsa.com/',
  // 种子URL列表
  seedList: [
    'http://www.ttlsa.com/mysql/',
    // 'http://www.ttlsa.com/nginx/',
    // 'http://www.ttlsa.com/log-system/elk/'
  ],
  // 列表相关的配置
  list: {
    selector: {
      'list[]': 'h2.entry-title a@href'
    }
  },
  // 详情页相关的配置
  detail: {
    selector: {
      'title': 'h1.entry-title',
      'content': '.single-content@html'
    }
  },
  maxPage: 100,
  autorun: true
}
