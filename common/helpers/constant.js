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

function getDiffDays(date, secondDate = null) {
  let date1 = new Date(date);
  let date2 = null;

  if (secondDate == null) {
    date2 = new Date();
  } else {
    date2 = new Date(secondDate);
  }

  let diffTime = Math.abs(date2 - date1);
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

module.exports = {
  createHash,
  createToken,
  setUsersDateTime,
  getDiffDays
}
