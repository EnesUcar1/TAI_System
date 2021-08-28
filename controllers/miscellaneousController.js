const accountModel = require('../models/accountModel');

const miscellaneous_index = async (req, res) => {
  let account = await accountModel.getCurrentAccount(req.cookies.accountToken);
  if (Array.isArray(account)) {
    account = account[0]
  }
  res.render(__dirname + '/../views/home/miscellaneous.handlebars', { miscellaneousLeftSideClass: 'active', pageName: "Miscellaneous", account: account });
};

module.exports = {
  miscellaneous_index
};
