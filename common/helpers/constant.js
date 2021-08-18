const md5 = require('md5');
const crypto = require('crypto');

function createHash(text) {
  return md5(text)
}

function createToken() {
  return crypto.randomBytes(64).toString('hex');
}

module.exports = {
  createHash,
  createToken
}
