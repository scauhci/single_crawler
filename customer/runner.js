/**
 * Node Runner
 */
const runner = require('./index')
exports.start = list => {
    runner(list)
      .catch(err => {
        console.log(err.message || '')
      })
}
