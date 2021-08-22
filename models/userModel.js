const cache = require('memory-cache');
const helperConstant = require('../common/helpers/constant');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database/tais.db');

async function getUsersByAccountID(accountID) {
  return await new Promise((resolve, reject) => {
    db.all('Select * From Users Where AccountID = "' + accountID + '" And Deleted = 0', (err, row) => {
      return resolve(row);
    });
  }).then(async (value) => {
    let data = await helperConstant.setUsersDateTime(value);
    return value;
  });
}

function getUserByName(name) {
  return new Promise((resolve, reject) => {
    db.all('Select * From Users Where Name = "' + name + '" And Deleted = 0', (err, row) => {
      return resolve(row);
    });
  }).then(async (value) => {
    return value;
  });
}

async function getUsersSumCheese(accountID) {
  let users = await getUsersByAccountID(accountID);
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

async function getFullCheeseUserCount(accountID) {
  let users = await getUsersByAccountID(accountID);
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

async function addUser(user) {
  let created = new Date().toLocaleString();
  let accountID = user.AccountID;
  let name = user.Name;
  let cheese = user.Cheese;
  let email = user.Email;
  let deleted = 0;

  return new Promise((resolve, reject) => {
    db.run("INSERT INTO Users (Created, AccountID, Name, Cheese, Email, Deleted) VALUES ('" + created + "', '" + accountID + "', '" + name + "', '" + cheese + "', '" + email + "', '" + deleted + "');", (err, row) => {
      (err) ? resolve(false): resolve(true);
    });
  }).then(async (value) => {
    var data = await helperConstant.setUsersDateTime(await getUserByName(name));
    return data;
  });
}

function updateUser(user) {
  let id = user.ID;
  let name = user.Name;
  let email = user.Email
  let cheese = user.Cheese;

  return new Promise((resolve, reject) => {
    db.run("Update Users Set Name = '" + name + "' ,Email = '" + email + "' ,Cheese = '" + cheese + "' Where ID = '" + id + "'", (err, row) => {
      return resolve();
    });
  }).then(value => {
    return true;
  });
}

function updateSettings(data) {
  let id = data.AccountID;
  let entry = data.Entry;

  return new Promise((resolve, reject) => {
    db.run("Update Accounts Set ShowUserEntries = '" + entry + "' Where ID = '" + id + "'", (err, row) => {
      return resolve();
    });
  }).then(value => {
    return true;
  });
}

function deleteUser(ID) {
  let deleted = 1;
  return new Promise((resolve, reject) => {
    db.run("Update Users Set Deleted = '" + deleted + "' Where ID = '" + ID + "'", (err, row) => {
      return resolve();
    });
  }).then(value => {
    return true;
  });
}

module.exports = {
  getUsersByAccountID,
  getUserByName,
  getUsersSumCheese,
  getFullCheeseUserCount,
  addUser,
  updateUser,
  updateSettings,
  deleteUser
};
