const express = require('express');
const router = express.Router();
const cheeseCounterController = require('../controllers/cheeseCounterController');
const accountModel = require('../models/accountModel.js');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true  });
router.use(bodyParser.json());

router.get('/', accountModel.isLogin, cheeseCounterController.cheeseCounter_index);
router.post('/', [accountModel.isLogin, urlencodedParser], cheeseCounterController.cheeseCounter_add);
router.put('/', [accountModel.isLogin, urlencodedParser], cheeseCounterController.cheeseCounter_update);
router.post('/delete-counter', [accountModel.isLogin, urlencodedParser], cheeseCounterController.cheeseCounter_delete);

module.exports = router;
