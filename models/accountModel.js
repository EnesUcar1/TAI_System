const helperConstant = require('../common/helpers/constant');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database/tais.db');

async function getAccountByID(ID) {
  return await new Promise((resolve, reject) => {
    db.all('Select * From Accounts Where ID = "' + ID + '"', (err, row) => {
      return resolve(row);
    });
  }).then(value => {
    return value;
  });
}

async function getAccountByName(name) {
  return await new Promise((resolve, reject) => {
    db.all('Select * From Accounts Where Name = "' + name + '"', (err, row) => {
      return resolve(row);
    });
  }).then(value => {
    return value;
  });
}

async function getAccountByNameAndPassword(name, password) {
  return await new Promise((resolve, reject) => {
    db.all('Select * From Accounts Where Name = "' + name + '" And Password = "' + helperConstant.createHash(password) + '"', (err, row) => {
      return resolve(row);
    });
  }).then(value => {
    return value;
  });
}

async function getAccountByToken(accountToken) {
  return await new Promise((resolve, reject) => {
    db.all('Select * From Accounts Where Token = "' + accountToken + '"', (err, row) => {
      return resolve(row);
    });
  }).then(value => {
    return value;
  });
}

async function addAccount(account) {
  let created = new Date().toLocaleString();
  let name = account.Name;
  let password = helperConstant.createHash(account.Password);
  let deleted = 0;

  return new Promise((resolve, reject) => {
    db.run("INSERT INTO Accounts (Created, Name, Password, Deleted) VALUES ('" + created + "', '" + name + "', '" + password + "', '" + deleted + "');", (err, row) => {
      (err) ? resolve(false) : resolve(true);
    });
  }).then(async (value) => {
    return value;
  });
}

function isLogin(req, res, next) {
  if (req.cookies.accountToken != null) {
    next();
  } else {
    res.redirect("/sign-in");
  }
}

async function getCurrentAccount(accountToken) {
  if (!(cache.get('account_' + accountToken))) {
    let account = await getAccountByToken(accountToken);
    await cache.put('account_' + accountToken, account);
  }
  return await cache.get('account_' + accountToken)
}

module.exports = {
  getAccountByID,
  getAccountByName,
  getAccountByNameAndPassword,
  getCurrentAccount,
  isLogin,
  addAccount
};
