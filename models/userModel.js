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
    var data = await getUserByName(name);
    return data;
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
  addUser,
  deleteUser
};
