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

const translate = $ => {
  clear($)

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
  return $.html()
}

exports.translate = translate
