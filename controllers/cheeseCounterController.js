const accountModel = require('../models/accountModel');

const cheeseCounter_index = async (req, res) => {
  let account = await accountModel.getCurrentAccount(req.cookies.accountToken);
  if (Array.isArray(account)) {
    account = account[0]
  }
  res.render(__dirname + '/../views/home/cheese-counter.handlebars', { cheeseCounterLeftSideClass: 'active', pageName: "Cheese Counters", account: account });
};

const cheeseCounter_add = async (req, res) => {
  console.log(req.body)
};

module.exports = {
  cheeseCounter_index,
  cheeseCounter_add
};
