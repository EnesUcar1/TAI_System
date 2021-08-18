const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');
const accountModel = require('../models/accountModel.js');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true  });
router.use(bodyParser.json());

router.get('/', accountModel.isLogin, rewardController.reward_index);

module.exports = router;
