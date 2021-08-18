const express = require('express');
const router = express.Router();
const signInController = require('../controllers/signInController');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true  });
router.use(bodyParser.json());

router.get('/', signInController.sign_in_index);
router.post('/', urlencodedParser, signInController.sign_in_login);

module.exports = router;
