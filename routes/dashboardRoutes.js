const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const accountModel = require('../models/accountModel.js');

router.get('/', accountModel.isLogin, dashboardController.dashboard_index);
router.get('/logout', accountModel.isLogin, dashboardController.dashboard_logout);

module.exports = router;
