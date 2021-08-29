const accountModel = require('../models/accountModel');
const furModel = require('../models/furModel');

const fur_index = async (req, res) => {
  let account = await accountModel.getCurrentAccount(req.cookies.accountToken);
  let furCheese = {};
  if (Array.isArray(account)) {
    account = account[0]
  }

  let furs = await furModel.getFavouriteFurs(account.ID);
  furCheese.Total = (await furModel.getSumFurCheese(account.ID))[0]['Sum(Cheese)'];
  furCheese.TotalFivep = (await furModel.getSumFurCheese(account.ID, 5))[0]['Sum(Cheese)'];
  furCheese.TotalFourp = (await furModel.getSumFurCheese(account.ID, 4))[0]['Sum(Cheese)'];
  furCheese.TotalThreep = (await furModel.getSumFurCheese(account.ID, 3))[0]['Sum(Cheese)'];
  furCheese.TotalTwop = (await furModel.getSumFurCheese(account.ID, 2))[0]['Sum(Cheese)'];
  furCheese.TotalOnep = (await furModel.getSumFurCheese(account.ID, 1))[0]['Sum(Cheese)'];

  if (!furCheese.Total)
    furCheese.Total = 0;
  if (!furCheese.TotalFivep)
    furCheese.TotalFivep = 0;
  if (!furCheese.TotalFourp)
    furCheese.TotalFourp = 0;
  if (!furCheese.TotalThreep)
    furCheese.TotalThreep = 0;
  if (!furCheese.TotalTwop)
    furCheese.TotalTwop = 0;
  if (!furCheese.TotalOnep)
    furCheese.TotalOnep = 0;

  let length = furs.length;

  for (var i = 0; i < length; i++) {
    if (furs[i].IsBought == 1) {
      furs[i].IsBought = true;
    } else {
      furs[i].IsBought = false;
    }
  }


  res.render(__dirname + '/../views/home/favourite-furs.handlebars', {
    favouriteFurLeftSideClass: 'active',
    furs: furs,
    pageName: "Favourite Furs",
    account: account,
    furCheese: furCheese
  })
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

const fur_edit = async (req, res) => {
  await furModel.editFavouriteFur(req.body);
  res.redirect("/favourite-furs");
};

const fur_delete = async (req, res) => {
  await furModel.deleteFavouriteFur(req.query.ID);
  res.redirect("/favourite-furs");
};

module.exports = {
  fur_index,
  fur_add,
  fur_edit,
  fur_delete
};
