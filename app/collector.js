/**
 * 爬取模块
 */

const request = require('request-promise')
const cheerio = require('cheerio')
// const ICONV = require('iconv-lite')
const filter = require('./filter')

const PROMPT = {
  'INVALID_URL': 'URL无效'
}

const parseOptions = {
  decodeEntities: false
}

module.exports = (options) => {
  if (!options.uri) {
    return Promise.reject(new Error(PROMPT['INVALID_URL']))
  }
  options.transform = (body) => {
    let $ = cheerio.load(body.toString(), parseOptions)
    $('script') && $('script').remove()
    return $
  }
  const selector = options.selector || {}
  return request(options)
    .then(($) => {
      let data = {}
      let result
      let sel
      Object.keys(selector).forEach(key => {
        sel = selector[key]
        result = filter($, sel, key)
        key = key.replace('[]', '')
        data[key] = result
      })
      return data
    })
}
