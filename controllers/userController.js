const accountModel = require('../models/accountModel');
const userModel = require('../models/userModel');
const cache = require('memory-cache');

const user_index = async (req, res) => {
  let account = await accountModel.getCurrentAccount(req.cookies.accountToken);
  if (Array.isArray(account)) {
    account = account[0]
  }
  let users = (await userModel.getUsersByAccountID(account.ID)).reverse();
  if (account.ShowUserEntries > 0)
    users = users.slice(0, account.ShowUserEntries);
  res.render(__dirname + '/../views/home/user.handlebars', { userLeftSideClass: 'active', pageName: "Users", users: users, account: account });
};

const user_add = async (req, res) => {
  let account = await accountModel.getCurrentAccount(req.cookies.accountToken);
  if (Array.isArray(account)) {
    account = account[0]
  }
  req.body.AccountID = account.ID;
  let result = await userModel.addUser(req.body);
  return res.send(result[0]).end();
};

const user_update = async (req, res) => {
  let result = await userModel.updateUser(req.body);
  return res.send(result).end();
};

const user_settings = async (req, res) => {
  let account = await accountModel.getCurrentAccount(req.cookies.accountToken);
  if (Array.isArray(account)) {
    account = account[0]
  }
  req.body.AccountID = account.ID;
  let result = await userModel.updateSettings(req.body);
  await cache.del('account_' + req.cookies.accountToken);
  return res.redirect("/users")
};

const user_delete = async (req, res) => {
  let result = await userModel.deleteUser(req.body.ID);
  return res.send(result).end();
};


module.exports = {
  user_index,
  user_add,
  user_update,
  user_settings,
  user_delete
};
