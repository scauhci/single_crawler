/**
 *  blog.lxstart.net
 *  暂时不支持：mode maxPage
 */

module.exports = {
  // 根URL
  domain: 'http://blog.lxstart.net',
  // 种子URL列表
  seedList: [
    'http://blog.lxstart.net/',
    'http://blog.lxstart.net/page/2/',
    'http://blog.lxstart.net/page/3/'
  ],
  // 列表相关的配置
  list: {
    mode: /http:\/\/blog\.lxstart\.net\/page\/\d+/i,
    selector: {
      'list[]': '.article-title@href'
    }
  },
  // 详情页相关的配置
  detail: {
    mode: /http:\/\/blog\.lxstart\.net\/\d{4}\/\d+\/\d+\/\w+/i,
    selector: {
      'title': '.article-title',
      'content': '.article-entry@html'
    }
  },
  autorun: true
}
