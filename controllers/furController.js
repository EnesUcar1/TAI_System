const accountModel = require('../models/accountModel');

const fur_index = async (req, res) => {
  let account = await accountModel.getCurrentAccount(req.cookies.accountToken);
  if (Array.isArray(account)) {
    account = account[0]
  }
  res.render(__dirname + '/../views/home/fur.handlebars', { furLeftSideClass: 'active', pageName: "Users", account: account });
};

module.exports = {
  fur_index
};
