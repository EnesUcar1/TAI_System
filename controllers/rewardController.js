const accountModel = require('../models/accountModel');

const reward_index = async (req, res) => {
  let account = await accountModel.getCurrentAccount(req.cookies.accountToken);
  if (Array.isArray(account)) {
    account = account[0]
  }
  res.render(__dirname + '/../views/home/reward.handlebars', { rewardLeftSideClass: 'active', pageName: "Users", account: account });
};

module.exports = {
  reward_index
};
