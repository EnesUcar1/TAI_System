const accountModel = require('../models/accountModel');
const furModel = require('../models/furModel');
const helperConstant = require('../common/helpers/constant');
const cache = require('memory-cache');

const dashboard_index = async (req, res) => {
  let account = await accountModel.getCurrentAccount(req.cookies.accountToken);
  if (Array.isArray(account)) {
    account = account[0]
  }

  let fursData = await furModel.getPurchasedFurs(account.ID)
  let length = fursData.length;

  for (var i = 0; i < length; i++) {
    let purchasedDate = fursData[i].PurchasedDate.replace(".", "/").replace(".", "/").split("/");
    purchasedDate = new Date(+purchasedDate[2], purchasedDate[1] - 1, + purchasedDate[0]);
    fursData[i].OldDate = purchasedDate;
  }

  fursData.sort((a, b) => {
    return new Date(b.OldDate) - new Date(a.OldDate); // ascending
  });

  if (length > 0) {
    for (var i = 0; i < length; i++) {
      let purchasedDate = fursData[i].PurchasedDate.replace(".", "/").replace(".", "/").split("/");
      purchasedDate = new Date(+purchasedDate[2], purchasedDate[1] - 1, + purchasedDate[0]);

      if (helperConstant.getDiffDays(purchasedDate, new Date()) < 15) {
        fursData[i].IsNewest = true;
        fursData[i].IsOldest = false;
      } else {
        fursData[i].IsNewest = false;
        fursData[i].IsOldest = true;
      }

      if (fursData[i].BoughtType == 'Cheese') {
        fursData[i].PurchaseText = fursData[i].Cheese + " Cheese";
      } else if (fursData[i].BoughtType == 'Fraise') {
        fursData[i].PurchaseText = fursData[i].Fraise + " Fraise";
      } else if (fursData[i].BoughtType == 'Gift') {
        fursData[i].PurchaseText = "Gift";
      }
    }
  }

  let spentCheese = 0;
  let spentFraise = 0;

  for (var i = 0; i < length; i++) {
    if (fursData[i].BoughtType == 'Cheese') {
      spentCheese += fursData[i].Cheese;
    } else if (fursData[i].BoughtType == 'Fraise') {
      spentFraise += fursData[i].Fraise;
    }
  }

  res.render(__dirname + '/../views/home/dashboard.handlebars', { SpentCheese: spentCheese, SpentFraise: spentFraise, dashboardLeftSideClass: 'active', pageName:"Dashboard", account: account, purchasedFurs: fursData  });
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
