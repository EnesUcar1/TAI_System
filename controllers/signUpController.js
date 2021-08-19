const accountModel = require('../models/accountModel');

const sign_up_index = (req, res) => {
  res.render(__dirname + '/../views/home/sign-up.handlebars', {layout: false});
};

const sign_up_add_user = async (req, res) => {
  let account = await accountModel.getAccountByName(req.body.Name);
  let result = {"Message": null, "StatusTrue": null, "StatusFalse": null};

  if (account.length == 0) {
    let resultData = await accountModel.addAccount(req.body);
    if (resultData) {
      result.Message = "Account has been created successfully.";
      result.StatusTrue = true;
    } else {
      result.Message = "Error! Please try again later.";
      result.StatusFalse = true;
    }
  } else {
    result.Message = "The username is already available.";
    result.StatusFalse = true;
  }

  res.render(__dirname + '/../views/home/sign-up.handlebars', { layout: false, result: result });
};

module.exports = {
  sign_up_index,
  sign_up_add_user
};
