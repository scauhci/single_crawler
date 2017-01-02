/**
 *  www.linuxprobe.com
 */

module.exports = {
  // 根URL
  domain: 'http://www.linuxprobe.com/',
  // 种子URL列表
  seedList: [
    'http://www.linuxprobe.com/news',
    'http://www.linuxprobe.com/news/page/2',
    'http://www.linuxprobe.com/news/page/3',
    'http://www.linuxprobe.com/news/page/4'
  ],
  // 列表相关的配置
  list: {
    selector: {
      'list[]': 'h1.post-title a@href'
    }
  },
  // 详情页相关的配置
  detail: {
    selector: {
      'title': 'h1.post-title',
      'content': '.post-content@html'
    }
  },
  autorun: true
}
