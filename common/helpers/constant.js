const md5 = require('md5');

function createHash(text) {
  return md5(text)
}

module.exports = {
  createHash
}
