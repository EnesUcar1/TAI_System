const accountModel = require('../models/accountModel');
const cache = require('memory-cache');

const dashboard_index = async (req, res) => {
  let account = await accountModel.getCurrentAccount(req.cookies.accountToken);
  if (Array.isArray(account)) {
    account = account[0]
  }
  res.render(__dirname + '/../views/home/dashboard.handlebars', { dashboardLeftSideClass: 'active', pageName:"Dashboard", account: account });
};

const dashboard_logout = (req, res) => {
  token = req.cookies.accountToken;
  res.clearCookie('accountToken');
  cache.del('account_' + token);
  res.redirect("/");
};

module.exports = {
  dashboard_index,
  dashboard_logout
};
