/**
 * Node Runner
 */
const runner = require('./index')
exports.start = list => {
    return runner(list)
      .catch(err => {
        console.log(err.message || '')
      })
}
