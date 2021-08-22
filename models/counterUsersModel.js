const helperConstant = require('../common/helpers/constant');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database/tais.db');

async function getCounterUsersByCheeseCounterID(cheeseCounterID) {
  return await new Promise((resolve, reject) => {
    db.all('Select * From CounterUsers Where CounterID = "' + cheeseCounterID + '" And Deleted = 0', (err, row) => {
      return resolve(row);
    });
  }).then(value => {
    return value;
  });
}

async function getUsersSumCheese(counterID) {
  let users = await getCounterUsersByCheeseCounterID(counterID);
  let totalCheese = 0;

  return new Promise(async (resolve, reject) => {
    let totalCheese = 0;
    let i = 0;
    await users.forEach((user) => {
      totalCheese += user.Cheese;
      ++i;
      if (i == users.length)
        resolve(totalCheese);
    });
    if(users.length == 0)
      resolve(totalCheese)
  }).then(value => {
    return value;
  });
}

async function getFullCheeseUserCount(counterID) {
  let users = await getCounterUsersByCheeseCounterID(counterID);
  return new Promise(async (resolve, reject) => {
    let totalFullCheese = 0;
    let i = 0;
    await users.forEach((user) => {
      if (user.Cheese == 200)
        totalFullCheese += 1;
        i++;
      if(i == users.length) {
        resolve(totalFullCheese)
      }
    });
    if(users.length == 0) {
      resolve(totalFullCheese)
    }
  }).then(value => {
    return value;
  });
}

async function addCounterUsers(users) {
  let created = new Date().toLocaleString();
  let counterID = users.CounterID;
  let deleted = 0;

  let values = users.CounterUsers.map((user) => '("' + created + '", ' + counterID + ', '+ user + ', ' + deleted +')').join(',');
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO CounterUsers (Created, CounterID, UserID, Deleted) VALUES " + values + ";", (err, row) => {
      (err) ? resolve(false) : resolve(true);
    });
  }).then(async (value) => {
    return true;
  });
}

module.exports = {
  getCounterUsersByCheeseCounterID,
  getUsersSumCheese,
  getFullCheeseUserCount,
  addCounterUsers
};
