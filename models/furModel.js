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
  let priority = fur.Priority;
  let deleted = 0;

  return new Promise((resolve, reject) => {
    db.run("INSERT INTO FavouriteFurs (Created, AccountID, Name, Link, BadgeLink, Cheese, Priority, Deleted) VALUES ('" + created + "', '" + accountID + "', '" +  name + "', '" + link + "', '" +  badgeLink + "', '" + cheese + "', '" + priority + "', '" + deleted + "');", (err, row) => { return resolve(err); });
  }).then(value => { return true; });
}

function deleteFavouriteFur(favouriteFurID) {
  return new Promise((resolve, reject) => {
    db.run("Update FavouriteFurs Set Deleted = 1 Where ID = '" + furID + "'", (err, row) => {
      return resolve(row);
    });
  }).then(value => {
    return true;
  });
}

//function getSumFurCheese(userID) {
  //return new Promise((resolve, reject) => {
    //db.all('Select Sum(Cheese) From Furs Where UserID ="' + userID + '" And Deleted = "0"', (err, row) => { return resolve(row); });
  //}).then(async (value) => { return value; });
//}

module.exports = {
  getFavouriteFurs,
  addFavouriteFur,
  deleteFavouriteFur
};
