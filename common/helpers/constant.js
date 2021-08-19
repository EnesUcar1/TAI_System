const md5 = require('md5');
const crypto = require('crypto');

function createHash(text) {
  return md5(text)
}

function createToken() {
  return crypto.randomBytes(64).toString('hex');
}

function setUsersDateTime(users) {
  return new Promise(async (resolve, reject) => {
    let i = 0;
    await users.forEach((user) => {
      users[i].Date = user.Created.toString().split(' ')[0];
      users[i].Time = user.Created.toString().split(' ')[1];
      ++i;
    });
    resolve(users)
  }).then(value => { return value; });
}

module.exports = {
  createHash,
  createToken,
  setUsersDateTime
}
