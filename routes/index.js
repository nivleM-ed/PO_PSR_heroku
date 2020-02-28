var express = require('express');
var router = express.Router();
var user = require('../controller/user');
let {isLoggedIn, auth_no_t1, auth_no_t1_t2} = require('../middleware/authenticate');


/* GET home page. */
router.post('/login', user.login);
router.post('/check_logged', user.check_logged);
router.post('/logout', isLoggedIn, user.logout);
router.post('/:user_id/reset_password', isLoggedIn, user.reset_password); //update password of user

// router.post('/search', isLoggedIn, auth_no_t1, user.search);
router.post('/search_user', user.search);
router.get('/get_all_user', user.get_all_username);

module.exports = router;
