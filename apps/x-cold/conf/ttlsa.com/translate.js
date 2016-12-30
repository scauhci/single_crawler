/**
 * translate
 */

const clear = $ => {
  $('.ad-pc').remove()
  
  let _p = $('p')
  for (let i = _p.length - 1; i > 0; i--) {
    let node = $(_p[i])
    if (node.text().match('昵称')) {
      node.nextAll().remove()
      node.remove()
    }
  }
}

const start = ($, uri) => {
  clear($)

  // 处理代码块
  let codeBlocks = $('.crayon-syntax')
  codeBlocks.each((index, code) => {
    let res = $(code).text()
      .replace(/^\d+$/gm, '')
      .replace(/(\n){2,}/gm, '\n')
      .replace('&nbsp;', '')
    let list = res.split('\n')
    list.pop()
    list.pop()
    res = list.join('\n')
    $(code).after(`<pre>${res}</pre>`)
    $(code).remove()
  })

  // 处理标题 
  let _h3 = $('h3')
  _h3.each((index, el) => {
    $(el).after(`<div style="font-size: 14pt; color: white; background-color: black; border-left: red 10px solid; padding-left: 14px; margin-bottom: 20px; margin-top: 20px;"><strong>${$(el).text().trim()}</strong></div>`)
    $(el).remove()
  })

  // 处理外链
  let _a = $('a')
  _a.each((index, el) => {
    $(el).after($(el).text().trim())
    $(el).remove()
  })

  // 处理内联代码
  let _code = $('code')
  _code.each((index, el) => {
    $(el).after(`<span style="padding: 2px 4px; font-size: 90%; border-radius: 3px; color: #c7254e; background-color: #f9f2f4;">${$(el).text().trim()}</span>`)
    $(el).remove()
  })
  
  let html = $.html().trim()

  // 添加导读
  let guideText = $($('p')[0]) && $($('p')[0]).text()
  let guide = guideText && `<table><tbody><tr><td style="padding: 5px 12px; width: 25px; font-size: 22px; text-align: center; background: #E8E8E8; line-height: 30px; color: #999;">导读</td><td style="padding: 10px 10px 12px; line-height: 20px;"><strong>${guideText}</strong></td></tr></tbody></table>`

  // 添加小尾巴
  let copyright = `<blockquote><p style="text-align: left; color: #88a6a4;">原文来自：<a href="${uri}" target="_blank">${uri}</a></p><p style="text-align: left; color: #88a6a4;">本文地址：<a href="" target="_blank"></a><span style="float: right;">编辑：杨鹏飞，审核员：暂无</span></p></blockquote>`

  return guide + html + copyright
}

exports.start = start
