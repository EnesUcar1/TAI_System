const accountModel = require('../models/accountModel');

const user_index = async (req, res) => {
  let account = await accountModel.getCurrentAccount(req.cookies.accountToken);
  if (Array.isArray(account)) {
    account = account[0]
  }
  res.render(__dirname + '/../views/home/user.handlebars', { userLeftSideClass: 'active', pageName: "Users", account: account });
};

module.exports = {
  user_index
};
