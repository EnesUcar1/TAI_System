const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const accountModel = require('../models/accountModel.js');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true  });
router.use(bodyParser.json());

router.get('/', accountModel.isLogin, dashboardController.dashboard_index);
router.get('/logout', accountModel.isLogin, dashboardController.dashboard_logout);

module.exports = router;
