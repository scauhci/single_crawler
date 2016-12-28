/**
 * startup.js
 */

const commander = require('commander')
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
  commander.version('0.0.1')
    .option('-v, --version', 'version')
    .parse(process.argv)

  let taskList = getTaskFiles('./conf')

  taskList.forEach(conf => {
    let app = new Crawler(conf)
    app.start()
  })
}

main()
