/**
 *  Storage.js
 */

const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')

let tmpDir = require('os').tmpDir()
tmpDir = path.join(tmpDir, '.result')
// 创建临时目录(/tmp/result)，所有产生的静态资源将在此目录下生成
try {
  fs.mkdirSync(tmpDir)
} catch (e) {}

const writeFile = (file, data, options) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, options, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const defaultTranslate = {
  start($, uri) {
    return $.html()
  }
}

const write = (filename, content, options) => {
  filename = path.join(tmpDir, filename + '.html')

  let $ = cheerio.load(content, {
    decodeEntities: false
  })

  const conf = options.config
  const translate = conf.translate || defaultTranslate

  try {
    content = translate.start($, options.uri)
  } catch (err) {
    return Promise.reject(err)
  }

  return writeFile(filename, content, {
    // default
    encoding: 'utf8'
  })
}

exports.write = write
