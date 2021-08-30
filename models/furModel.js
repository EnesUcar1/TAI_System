const sqlite3 = require('sqlite3').verbose();
const accountModel = require('./accountModel.js');

let db = new sqlite3.Database('./database/tais.db');

function getFavouriteFurs(accountID) {
  return new Promise((resolve, reject) => {
    db.all('Select * From FavouriteFurs Where AccountID ="' + accountID + '" And Deleted = "0" Order By Priority DESC, Cheese DESC', (err, row) => { return resolve(row); });
  }).then(async (value) => { return value; });
}

function getPurchasedFurs(accountID) {
  return new Promise((resolve, reject) => {
    db.all('Select * From FavouriteFurs Where AccountID ="' + accountID + '" And Deleted = "0" And IsBought = 1', (err, row) => { return resolve(row); });
  }).then(async (value) => { return value; });
}

function addFavouriteFur(fur) {
  let created = new Date().toLocaleString();
  let accountID = fur.AccountID;
  let name = fur.Name;
  let link = fur.Link;
  let badgeLink = fur.BadgeLink;
  let cheese = fur.Cheese;
  let fraise = fur.Fraise;
  let isBought = (fur.Bought == 'Yes') ? 1 : 0;
  let priority = fur.Priority;
  let boughtType = fur.BoughtType;
  let purchasedDate = fur.PurchasedDate;
  let deleted = 0;

  return new Promise((resolve, reject) => {
    db.run("INSERT INTO FavouriteFurs (Created, AccountID, Name, Link, BadgeLink, Cheese, Fraise, IsBought, Priority, BoughtType, PurchasedDate, Deleted) VALUES ('" + created + "', '" + accountID + "', '" +  name + "', '" + link + "', '" +  badgeLink + "', '" + cheese + "', '" +  fraise + "', '" + isBought + "', '" + priority + "', '" +  boughtType + "', '" + purchasedDate + "', '" + deleted + "');", (err, row) => { return resolve(err); });
  }).then(value => { return true; });
}

function deleteFavouriteFur(favouriteFurID) {
  return new Promise((resolve, reject) => {
    db.run("Update FavouriteFurs Set Deleted = 1 Where ID = '" + favouriteFurID + "'", (err, row) => {
      return resolve(row);
    });
  }).then(value => {
    return true;
  });
}

function editFavouriteFur(fur) {
  let ID = fur.ID;
  let link = fur.Link;
  let badgeLink = fur.BadgeLink;
  let name = fur.Name;
  let cheese = fur.Cheese;
  let fraise = fur.Fraise;
  let priority = fur.Priority;
  let isBought = (fur.Bought == 'Yes') ? 1 : 0;
  let boughtType = fur.BoughtType;
  let purchasedDate = fur.PurchasedDate;

  return new Promise((resolve, reject) => {
    db.run("Update FavouriteFurs Set Link = '" + link + "', BadgeLink = '"  + badgeLink + "', Name =  '" + name + "', Cheese = " + cheese + " , Fraise = " + fraise + ", Priority = " + priority +  ", IsBought = '" + isBought + "', BoughtType = '" + boughtType + "', PurchasedDate = '" + purchasedDate + "' Where ID = '" + ID + "'", (err, row) => {
      return resolve(row);
    });
  }).then(value => {
    return true;
  });
}

function getSumFurCheese(accountID, priority = null) {
  if (priority == null)
  {
    return new Promise((resolve, reject) => {
      db.all('Select Sum(Cheese) From FavouriteFurs Where AccountID ="' + accountID + '" And Deleted = "0" And IsBought = "0"', (err, row) => { return resolve(row); });
    }).then(async (value) => { return value; });
  } else {
    return new Promise((resolve, reject) => {
      db.all('Select Sum(Cheese) From FavouriteFurs Where AccountID ="' + accountID + '" And Priority = "' + priority +  '" And Deleted = "0" And IsBought = "0"', (err, row) => { return resolve(row); });
    }).then(async (value) => { return value; });
  }
}

module.exports = {
  getFavouriteFurs,
  getPurchasedFurs,
  addFavouriteFur,
  editFavouriteFur,
  deleteFavouriteFur,
  getSumFurCheese
};
