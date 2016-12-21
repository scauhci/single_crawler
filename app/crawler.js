/**
 * 单进程爬虫模块
 * 
 * @description 爬取 http://blog.lxstart.net/ 站点的所有文章
 * 
 * @author: x-cold
 * @date: 2016-12-21
 * 
 */

const collector = require('./collector.js')
const request = require('request-promise')
const queuefun = require('queue-fun')
const url = require('url')
const Logger = console

const ROOT = 'http://blog.lxstart.net/'
const seedList = require('./seed')
const Queue = queuefun.Queue(Promise)

// 获取文章列表
const fetchList = function (seedList) {
  seedList = seedList || []
  let promises = []
  seedList.forEach(uri => {
    promises.push(collector({
      uri: uri,
      selector: {
        'list[]': '.article-title@href'
      }
    }).then(data => {
      let list = data.list
      if (!(list && list.length)) {
        Logger.error('FETCH LIST ERROR!')
        return []
      }
      list = list.map(item => {
        return url.resolve(ROOT, item)
      })
      Logger.info('Success Fetch List: \n%s\n', list && list.join('\n') || '')
      return list
    }))
  })
  return Promise.all(promises).then(vals => {
    let list = []
    vals.forEach(item => {
      ;[].push.apply(list, item)
    })
    return list
  })
}

const fetchDetail = function (seedUrl) {
  return collector({
    uri: seedUrl,
    selector: {
      'title': '.article-title',
      'content': '.article-entry@html'
    }
  }).then(data => {
    Logger.info('Success Fetch Detail: %s', data.title || '')
    return data
  })
}

const main = (function () {
  console.time('FETCH')
  fetchList(seedList).then(list => {
    // 启动队列服务
    queue = new Queue(20, {
      'event_end': res => {
        console.timeEnd('FETCH')
      }
    })
    for (let i = 0; i < list.length; i++) {
      queue.push(fetchDetail, [list[i]])
    }
    queue.start()
  }).catch(err => {
    Logger.error(err)
  })
})()
