const sqlite3 = require('sqlite3').verbose();
const accountModel = require('./accountModel.js');

let db = new sqlite3.Database('./database/tais.db');

function getFavouriteFurs(accountID) {
  return new Promise((resolve, reject) => {
    db.all('Select * From FavouriteFurs Where AccountID ="' + accountID + '" And Deleted = "0" Order By Priority DESC, Cheese DESC', (err, row) => { return resolve(row); });
  }).then(async (value) => { return value; });
}

function addFavouriteFur(fur) {
  let created = new Date().toLocaleString();
  let accountID = fur.AccountID;
  let name = fur.Name;
  let link = fur.Link;
  let badgeLink = fur.BadgeLink;
  let cheese = fur.Cheese;
  let isBought = 0;
  let priority = fur.Priority;
  let deleted = 0;

  return new Promise((resolve, reject) => {
    db.run("INSERT INTO FavouriteFurs (Created, AccountID, Name, Link, BadgeLink, Cheese, IsBought, Priority, Deleted) VALUES ('" + created + "', '" + accountID + "', '" +  name + "', '" + link + "', '" +  badgeLink + "', '" + cheese + "', '" + isBought + "', '" + priority + "', '" + deleted + "');", (err, row) => { return resolve(err); });
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

function buyFavouriteFur(favouriteFurID) {
  return new Promise((resolve, reject) => {
    db.run("Update FavouriteFurs Set IsBought = 1 Where ID = '" + favouriteFurID + "'", (err, row) => {
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
  addFavouriteFur,
  buyFavouriteFur,
  deleteFavouriteFur,
  getSumFurCheese
};
