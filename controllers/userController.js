const accountModel = require('../models/accountModel');
const userModel = require('../models/userModel');

const user_index = async (req, res) => {
  let account = await accountModel.getCurrentAccount(req.cookies.accountToken);
  if (Array.isArray(account)) {
    account = account[0]
  }
  let users = await userModel.getUsersByAccountID(account.ID);
  res.render(__dirname + '/../views/home/user.handlebars', { userLeftSideClass: 'active', pageName: "Users", users: users.reverse(), account: account });
};

const user_add = async (req, res) => {
  let account = await accountModel.getCurrentAccount(req.cookies.accountToken);
  if (Array.isArray(account)) {
    account = account[0]
  }
  req.body.AccountID = account.ID;
  let result = await userModel.addUser(req.body);
  return res.send(result).end();
};

const user_delete = async (req, res) => {
  let result = await userModel.deleteUser(req.body.ID);
  return res.send(result).end();
};


module.exports = {
  user_index,
  user_add,
  user_delete
};
