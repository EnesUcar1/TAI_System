const cache = require('memory-cache');
const accountModel = require('../models/accountModel');
const helperConstant = require('../common/helpers/constant');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database/tais.db');

const sign_in_index = (req, res) => {
  res.render(__dirname + '/../views/home/sign-in.handlebars', {
    layout: false
  });
};

const sign_in_login = async (req, res) => {
  let account = await accountModel.getAccountByNameAndPassword(req.body.Name, req.body.Password);
  let result = {
    "Message": null,
    "StatusTrue": null,
    "StatusFalse": null
  };

  if (account.length != 0) {
    let token = helperConstant.createToken();
    return new Promise((resolve, reject) => {
      db.run("Update Accounts Set Token = '" + token + "' Where Name = '" + account[0].Name + "'", (err, row) => {
        return resolve();
      });
    }).then(async () => {
      account[0].Token = token;
      await res.cookie('accountToken', token)
      await cache.put('account_' + token, account[0]);
      res.redirect("/");
    });
  } else {
    result.Message = "You are entered wrong name or password.";
    result.StatusFalse = true;
  }

  res.render(__dirname + '/../views/home/sign-in.handlebars', {
    layout: false,
    result: result
  });
};

module.exports = {
  sign_in_index,
  sign_in_login
};
