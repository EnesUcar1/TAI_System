const accountModel = require('../models/accountModel');
const userModel = require('../models/userModel');
const cheeseCounterModel = require('../models/cheeseCounterModel');
const counterUsersModel = require('../models/counterUsersModel');
const furModel = require('../models/furModel');
const helperConstant = require('../common/helpers/constant');

const cheeseCounter_index = async (req, res) => {
  let account = await accountModel.getCurrentAccount(req.cookies.accountToken);
  if (Array.isArray(account)) {
    account = account[0]
  }
  let users = await userModel.getUsersByAccountID(account.ID);
  let counters = await cheeseCounterModel.getCounterByAccountID(account.ID);
  let length = counters.length;

  if (length > 0) {
    let furs = await furModel.getFavouriteFurs(account.ID);
    let fursCheeseSum = await furModel.getSumFurCheese(account.ID);
    fursCheeseSum = fursCheeseSum[0]['Sum(Cheese)'];

    for (var i = 0; i < length; i++) {
      counters[i].IsCounterEnded = (counters[i].Status == 1) ? (true) : (false);
      counters[i].IsCheckedUseSideUsers = (counters[i].UseSideUsers == 1) ? (true) : (false)
      counters[i].IsCheckedSomeoneUsers = (counters[i].UseSomeUsers == 1) ? (true) : (false)

      let startingDate = counters[i].StartingDate.replace(".", "/").replace(".", "/").split("/");
      startingDate = new Date(+startingDate[2], startingDate[1] - 1, + startingDate[0]);

      if (counters[i].UseSideUsers == 1 && counters[i].Status == 0)  {
        counters[i].UsersSumCheese = await userModel.getUsersSumCheese(account.ID);
        counters[i].FullCheeseCount = await userModel.getFullCheeseUserCount(account.ID);
      } else if (counters[i].UseSideUsers == 0 && counters[i].Status == 0) {
        counters[i].UsersSumCheese = await counterUsersModel.getUsersSumCheese(counters[i].ID);
        counters[i].FullCheeseCount = await userModel.getFullCheeseUserCount(counters[i].ID);
      } else if (counters[i].UseSideUsers == 1 && counters[i].Status == 1) {
        counters[i].UsersSumCheese = counters[i].SideUsersCheese;
        counters[i].FullCheeseCount = await userModel.getFullCheeseUserCount(account.ID);
      }

      counters[i].TotalCheese = (counters[i].MarketCheese - counters[i].StartingMarketCheese + counters[i].UsersSumCheese + counters[i].SpentCheese);
      counters[i].AverageCheese = Math.round(counters[i].TotalCheese / helperConstant.getDiffDays(startingDate) * 100) / 100;

      if (counters[i].Status == 1) {
        let endDate = counters[i].EndDate.replace(".", "/").replace(".", "/").split("/");
        endDate = new Date(+endDate[2], endDate[1] - 1, + endDate[0]);
        counters[i].AverageCheese = Math.round(counters[i].TotalCheese / helperConstant.getDiffDays(startingDate, endDate) * 100) / 100;
      }

      counters[i].EstimatedCheese = (counters[i].MarketCheese + counters[i].UsersSumCheese);
      counters[i].TargetCheesePercentage = Math.round((counters[i].TotalCheese / counters[i].TargetCheese * 100) * 100) / 100;
      //counters[i].FullCheeseCount = await userModel.getFullCheeseUserCount(account.ID);
      counters[i].FursCheeseRemainder = (fursCheeseSum - counters[i].EstimatedCheese < 0) ? ("+" + Math.abs(fursCheeseSum - counters[i].TotalCheese)) : (fursCheeseSum - counters[i].EstimatedCheese);
      console.log(counters[i])
    }
  }

  res.render(__dirname + '/../views/home/cheese-counter.handlebars', {
    cheeseCounterLeftSideClass: 'active',
    pageName: "Cheese Counters",
    account: account,
    users: users,
    cheeseCounters: counters
  });
};

const cheeseCounter_add = async (req, res) => {
  let account = await accountModel.getCurrentAccount(req.cookies.accountToken);
  if (Array.isArray(account)) {
    account = account[0]
  }
  req.body.AccountID = account.ID;
  await cheeseCounterModel.addCounter(req.body);
  res.redirect("/cheese-counters")
};

const cheeseCounter_update = async (req, res) => {
  let account = await accountModel.getCurrentAccount(req.cookies.accountToken);
  if (Array.isArray(account)) {
    account = account[0]
  }
  req.body.AccountID = account.ID;
  let result = await cheeseCounterModel.updateCounter(req.body);
  res.redirect("/cheese-counters")
};

const cheeseCounter_delete = async (req, res) => {
  let result = await cheeseCounterModel.deleteCounter(req.body.ID);
  res.redirect("/cheese-counters")
};

module.exports = {
  cheeseCounter_index,
  cheeseCounter_add,
  cheeseCounter_update,
  cheeseCounter_delete
};
