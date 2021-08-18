const express = require('express');
const router = express.Router();
const signUpController = require('../controllers/signUpController');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true  });
router.use(bodyParser.json());

router.get('/', signUpController.sign_up_index);
router.post('/', urlencodedParser, signUpController.sign_up_add_user);

module.exports = router;
