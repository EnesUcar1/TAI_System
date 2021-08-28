const express = require('express');
const router = express.Router();
const miscellaneousController = require('../controllers/miscellaneousController');
const accountModel = require('../models/accountModel.js');

router.get('/', accountModel.isLogin, miscellaneousController.miscellaneous_index);

module.exports = router;
