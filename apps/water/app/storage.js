/**
 * Storage.js
 */
var http = require('http')
var https = require('https')
var fs = require('fs')

function savedContent($, articlesTitle) {
  var text = $('.article-entry').html().trim()
  fs.appendFile('./app/data/' + articlesTitle + '.html', text, 'utf-8', function (err) {
    if (err) {
      console.log(err)
    }
    console.log('保存完成')
  })
}

function savedImgForHttp(url, index) {
  var subStr = url.substr(url.length - 4)
  http.get(url, function (res) {
    var data = ''
    res.setEncoding('binary')

    res.on('data', function (chunk) {
      data += chunk
    })
    res.on('end', function () {
      fs.appendFile('./app/images/' + index + subStr, data, 'binary', function (err) {
        if (err) {
          console.log(err)
        }
        console.log('pic保存完成')
      })
    })
  }).on('error', function (err) {
    console.log(err)
  })
}

function savedImgForHttps(url, index) {
  var subStr = url.substr(url.length - 4)
  https.get(url, function (res) {
    var data = ''
    res.setEncoding('binary')

    res.on('data', function (chunk) {
      data += chunk
    })
    res.on('end', function () {
      fs.appendFile('./app/images/' + index + subStr, data, 'binary', function (err) {
        if (err) {
          console.log(err)
        }
        console.log('pic保存完成')
      })
    })
  }).on('error', function (err) {
    console.log(err)
  })
}
exports.savedContent = savedContent
exports.savedImgForHttp = savedImgForHttp
exports.savedImgForHttps = savedImgForHttps
