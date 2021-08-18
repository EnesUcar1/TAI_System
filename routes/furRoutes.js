const express = require('express');
const router = express.Router();
const furController = require('../controllers/furController');
const accountModel = require('../models/accountModel.js');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true  });
router.use(bodyParser.json());

router.get('/', accountModel.isLogin, furController.fur_index);

module.exports = router;
