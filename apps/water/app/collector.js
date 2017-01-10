/**
 * 爬取模块
 */
var http = require('http')
var cheerio = require('cheerio')
var storage = require('./storage.js')
var id = 0

/**
 * @name fetchPage
 * @param x
 */
function fetchPage(x) {
  startRequest(x)
}
/**
 * @name startRequest
 * @param x
 */
function startRequest(x) {
  // 开启http服务器 向目标网站发起get请求
  http.get(x, function (res) {
    var html = '' // 存储请求网页的整个html内容
      // var titles = []
    res.setEncoding('utf-8') // 设置uft8编码 防止中文乱码
      // 监听data事件 每次取一块数据
    res.on('data', function (chunk) {
      html += chunk
    })
    res.on('end', function () {
      var $ = cheerio.load(html, { decodeEntities: false })

      var time = $('.article-date time').html().trim()
      var arrPic = []
      // 正则匹配url
      var reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/
      var regHttps = /^((https)?:\/\/)[^\s]+/
      $('.body-wrap img').each(function () {
        var that = $(this)
        var src = that.attr('src')
        var imgSrc = ''
        if (reg.test(src)) {
          imgSrc = src
        } else {
          imgSrc = 'http://blog.lxstart.net' + that.attr('src')
        }
        arrPic.push(imgSrc)
      })
      // 文章标题 编写的时间 当前文章的url
      var articlesItem = {
        title: $('header.article-header .article-title').text().trim(),
        Time: time,
        link: 'http://blog.lxstart.net' + $('.article-type-post div.article-meta a').attr('href'),
        pic: arrPic,
        id: id = id + 1
      }

      console.log(JSON.stringify(articlesItem, null, 4)) // 打印文章信息 http服务器
      var articlesTitle = $('header.article-header .article-title').text().trim()
      // 保存文章内容
      storage.savedContent($, articlesTitle)
      var nameImg = 0
      for (var i = 0, len = arrPic.length; i < len; i++) {
        if (regHttps.test(arrPic[i])) {
          storage.savedImgForHttps(arrPic[i], nameImg++)
        } else {
          storage.savedImgForHttp(arrPic[i], nameImg++)
        }
      }

      // 下一篇文章的链接
      var nextLink = 'http://blog.lxstart.net' + $('nav#article-nav #article-nav-older').attr('href')
      // 控制爬取文章的篇数
      if (id <= 500) {
        fetchPage(nextLink)
      }
    }).on('error', function (err) {
      console.log(err)
    })
  })
}

exports.fetchPage = fetchPage
