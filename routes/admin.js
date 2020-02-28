var express = require('express');
var router = express.Router();
var admin = require('../controller/admin');

let {isLoggedIn, auth_admin} = require('../middleware/authenticate');

router.post('/admin_add', admin.add_admin); //ONLY FOR DEV 

// router.post('/login', admin.admin_login); //not needed
// router.post('/logout', isLoggedIn, admin.admin_logout);  //not needed
router.get('/:user_id/get', isLoggedIn, auth_admin, admin.get_user);
router.get('/get_all', isLoggedIn, auth_admin, admin.get_all_user); 
router.post('/new_user', isLoggedIn, auth_admin, admin.add_user); //add user
router.delete('/:user_id/del_user', isLoggedIn, auth_admin, admin.del_user); //delete user
router.post('/:user_id/adm_upd', isLoggedIn, auth_admin, admin.admin_update); //update tier/department/branch of user
router.post('/:user_id/edit', isLoggedIn, admin.user_update); //update user details
router.post('/:user_id/rndpass', isLoggedIn, auth_admin, admin.random_password); //set random password
 
module.exports = router;