/**
 * 单进程爬虫模块
 *
 * @description 爬取 http://blog.lxstart.net/ 站点的所有文章
 *
 * @author: x-cold
 * @date: 2016-12-21
 *
 */
'use strict'

const collector = require('./collector.js')
const queuefun = require('queue-fun')
const url = require('url')
const Logger = console
const Queue = queuefun.Queue(Promise)
const storage = require('./storage')

const defaultDoneOperation = res => {
  Logger.info('Task Finished.')
}

class Runner {
  constructor (config) {
    this.config = config
    this.done = config.done || defaultDoneOperation
  }

  // 获取文章列表
  fetchList () {
    let config = this.config
    let seedList = config.seedList || []
    let promises = []

    seedList.forEach(uri => {
      promises.push(collector({
        uri: uri,
        selector: config.list.selector
      }).then(data => {
        let list = data.list

        if (!(list && list.length)) {
          return Promise.reject(new Error('FETCH LIST ERROR!'))
        }

        // URL转换为绝对路径
        list = list.map(item => {
          return url.resolve(config.domain, item)
        })

        // Logger.info('Success Fetch List: \n%s\n', list && list.join('\n') || '')
        return list
      }))
    })
    return Promise.all(promises).then(vals => {
      let list = []

      vals.forEach(item => {
        [].push.apply(list, item)
      })

      return list
    }).catch(err => {
      Logger.error(err)
    })
  }

  fetchDetail (seedUrl) {
    let config = this.config

    return collector({
      uri: seedUrl,
      selector: config.detail.selector
    }).then(data => {
      if (!(data && data.title)) {
        return Promise.reject(new Error('FETCH DETAIL ERROR!'))
      }

      Logger.info('Success Fetch Detail: %s', data.title)
      // Logger.info(data.content)
      return storage.write(data.title, data.content, {
        uri: seedUrl,
        config: config
      })
    }).catch(err => {
      Logger.error(err)
    })
  }

  start () {
    // console.time('FETCH')
    let self = this
    return this.fetchList().then(list => {
      list = list || []
      // 启动队列服务
      let queue = new Queue(20, {
        'event_end': res => {
          self.done(res)
        }
      })

      list.forEach(uri => {
        queue.push(self.fetchDetail.bind(self), [uri])
      })

      queue.start()
    }).catch(err => {
      Logger.error(err)
    })
  }
}

module.exports = Runner
