const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const accountModel = require('../models/accountModel.js');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true  });
router.use(bodyParser.json());

router.get('/', accountModel.isLogin, userController.user_index);

module.exports = router;
