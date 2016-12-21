const baseUrl = 'http://blog.lxstart.net/'
const pageSize = 4

const init = () => {
  let seed = []
  seed.push(baseUrl)
  for (let j = 2; j < pageSize; j++) {
    seed.push(baseUrl + 'page/' + j + '/')
  }
  return seed
}

module.exports = init
