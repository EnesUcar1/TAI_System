const helperConstant = require('../common/helpers/constant');
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

  if (counter.UseSideUsers == on) {
    useSideUsers = 1
  }

  return new Promise((resolve, reject) => {
    db.run("INSERT INTO CheeseCounter (Created, StartingDate, AccountID, Name, MarketCheese, StartingMarketCheese, SpentCheese, TargetCheese, Status, UseSideUsers, Deleted) VALUES ('" + created + "', '" + startingDate + "', '" + accountID + "', '" + name + "', '" + marketCheese + "', '" + startingMarketCheese + "', '" + spentCheese + "', '" + targetCheese + "', '" + status + "', '" + useSideUsers + "', '" +  deleted + "');", (err, row) => {
      (err) ? resolve(false) : resolve(true);
    });
  }).then(async (value) => {
    return value;
  });
}

module.exports = {

};
