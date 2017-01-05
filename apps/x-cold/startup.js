/**
 * startup.js
 */

const comander = require('comander')
const fs = require('fs')
const path = require('path')
const Crawler = require('./app/crawler')

const getTaskFiles = dir => {
  let list = fs.readdirSync(dir)
  list = list.map(file => {
    return require(path.join(__dirname, dir, file))
  })
  return list
}

const main = () => {
  comander.version('0.0.1')
    .option('-v, --version', 'version')
    .parse(process.argv)

  let taskList = getTaskFiles('./conf')

  taskList.forEach(conf => {
    let app = new Crawler(conf)
    if (conf.autorun) {
      app.start()
    }
  })
}

main()
