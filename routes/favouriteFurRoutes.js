const express = require('express');
const router = express.Router();
const favouriteFurController = require('../controllers/favouriteFurController');
const accountModel = require('../models/accountModel.js');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true  });
router.use(bodyParser.json());

router.get('/', accountModel.isLogin, favouriteFurController.fur_index);
router.post('/', [accountModel.isLogin, urlencodedParser], favouriteFurController.fur_add);
router.get('/delete-fur', [accountModel.isLogin, urlencodedParser], favouriteFurController.fur_delete);

module.exports = router;
