const helperConstant = require('../common/helpers/constant');
const cheeseUserModel = require('./counterUsersModel.js');
const userModel = require('../models/userModel');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database/tais.db');

async function getCounterByID(ID) {
  return await new Promise((resolve, reject) => {
    db.all('Select * From CheeseCounters Where ID = "' + ID + '" And Deleted = 0', (err, row) => {
      return resolve(row);
    });
  }).then(value => {
    return value;
  });
}

async function getCounterByAccountID(accountID) {
  return await new Promise((resolve, reject) => {
    db.all('Select * From CheeseCounters Where AccountID = "' + accountID + '"  And Deleted = 0', (err, row) => {
      return resolve(row);
    });
  }).then(value => {
    return value;
  });
}

async function addCounter(counter) {
  let created = new Date().toLocaleString();
  let startingDate = counter.StartingDate;
  let accountID = counter.AccountID;
  let name = counter.Name;
  let marketCheese = counter.MarketCheese;
  let startingMarketCheese = counter.StartingMarketCheese;
  let spentCheese = counter.SpentCheese;
  let targetCheese = counter.TargetCheese;
  let status = 0; // 0: devam; 1: bitti
  let useSideUsers = 0; // 0: hayır, 1: evet
  let deleted = 0;

  if (counter.UseSideUsers == "on") {
    useSideUsers = 1
  }

  return new Promise((resolve, reject) => {
    db.run("INSERT INTO CheeseCounters (Created, StartingDate, AccountID, Name, MarketCheese, StartingMarketCheese, SpentCheese, TargetCheese, Status, UseSideUsers, Deleted) VALUES ('" + created + "', '" + startingDate + "', '" + accountID + "', '" + name + "', '" + marketCheese + "', '" + startingMarketCheese + "', '" + spentCheese + "', '" + targetCheese + "', '" + status + "', '" + useSideUsers + "', '" +  deleted + "');", function(err) {
      resolve(this)
    });
  }).then(async (value) => {
    if (useSideUsers == 0 && counter.CounterUsers) {
      let counterUserData = {
        "CounterUsers": counter.CounterUsers,
        "CounterID": value.lastID,
      };
      await cheeseUserModel.addCounterUsers(counterUserData);
      return true;
    }
  });
}

async function updateCounter(counter) {
  let id = counter.ID;
  let name = counter.Name;
  let startingDate = counter.StartingDate;
  let startingMarketCheese = counter.StartingMarketCheese;
  let marketCheese = counter.MarketCheese;
  let spentCheese = counter.SpentCheese;
  let targetCheese = counter.TargetCheese;
  let status = 0;
  let endDate = "";
  let sideUsersCheese = 0;
  let fullCheeseCount = 0;

  if (counter.closeCheeseCounter == 'on') {
    endDate = counter.EndDate;
    status = 1;
    if (counter.UseSideUsers == 'on') {
      sideUsersCheese = await userModel.getUsersSumCheese(counter.AccountID);
      fullCheeseCount = await userModel.getFullCheeseUserCount(counter.AccountID);
    }
  }

  return new Promise((resolve, reject) => {
    db.run("Update CheeseCounters Set Name = '" + name + "' ,StartingDate = '" + startingDate + "' ,startingMarketCheese = '" + startingMarketCheese + "', MarketCheese ='" + marketCheese + "', SpentCheese='" + spentCheese + "', Status='"  + status  + "', EndDate='" + endDate  + "', SideUsersCheese='" + sideUsersCheese  + "', TargetCheese='" + targetCheese +  "' Where ID = '" + id + "'", (err, row) => {
      return resolve(row);
    });
  }).then(value => {
    return true;
  });
}

function deleteCounter(counterID) {
  let deleted = 1;
  return new Promise((resolve, reject) => {
    db.run("Update CheeseCounters Set Deleted = '" + deleted + "' Where ID = '" + counterID + "'", (err, row) => {
      return resolve();
    });
  }).then(value => {
    return true;
  });
}

module.exports = {
  getCounterByID,
  getCounterByAccountID,
  addCounter,
  updateCounter,
  deleteCounter
};
