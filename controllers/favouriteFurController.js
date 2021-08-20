const accountModel = require('../models/accountModel');
const furModel = require('../models/furModel');

const fur_index = async (req, res) => {
  let account = await accountModel.getCurrentAccount(req.cookies.accountToken);
  if (Array.isArray(account)) {
    account = account[0]
  }
  let furs = await furModel.getFavouriteFurs(account.ID);
  res.render(__dirname + '/../views/home/favourite-furs.handlebars', {favouriteFurLeftSideClass: 'active', furs: furs, pageName: "Favourite Furs", account: account})
};

const fur_add = async (req, res) => {
  let account = await accountModel.getCurrentAccount(req.cookies.accountToken);
  if (Array.isArray(account)) {
    account = account[0]
  }
  req.body.AccountID = account.ID;
  await furModel.addFavouriteFur(req.body);
  res.redirect("/favourite-furs");
};


module.exports = {
  fur_index,
  fur_add
};
