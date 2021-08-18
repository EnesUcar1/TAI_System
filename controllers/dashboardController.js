const accountModel = require('../models/accountModel');
const cache = require('memory-cache');

const dashboard_index = (req, res) => {
  res.render(__dirname + '/../views/home/dashboard.handlebars');
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
