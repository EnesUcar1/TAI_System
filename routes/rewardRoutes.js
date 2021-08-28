const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');
const accountModel = require('../models/accountModel.js');

router.get('/', accountModel.isLogin, rewardController.reward_index);

module.exports = router;
