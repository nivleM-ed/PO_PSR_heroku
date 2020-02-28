var express = require('express');
var router = express.Router();
var leave = require('../controller/leave');

let {isLoggedIn, auth_no_t1, auth_no_t1_t2} = require('../middleware/authenticate');

//for t2 & t3 ONLY
router.get('/all/:page', isLoggedIn, leave.show_leave_page); //WITH pagination
router.get('/all_leave', isLoggedIn, auth_no_t1, leave.show_all_leave); //WITHOUT pagination
router.get('/pending_leave/:page', isLoggedIn, auth_no_t1, leave.show_pending_leave); //get pending leaves WITH pagination


//own leaves
router.get('/own/:page', isLoggedIn, leave.show_own_leave);

//router.get('/user/:user_id/:page', isLoggedIn, auth_no_t1, leave.search_user);

//single CRUD 
router.get('/:leave_id', isLoggedIn, leave.report);
router.post('/add_leave', isLoggedIn, leave.checkDuplicateDate, leave.add_leave);
router.post('/:leave_id/upd_leave', isLoggedIn, leave.checkDuplicateDate, leave.upd_leave);
router.post('/:leave_id/delreq_leave', isLoggedIn, leave.del_req_leave); //request to delete leave
router.delete('/:leave_id/del_leave', isLoggedIn, auth_no_t1, leave.del_leave);
router.post('/:leave_id/approve', isLoggedIn, auth_no_t1, leave.approve_leave);
router.post('/:leave_id/decline', isLoggedIn, auth_no_t1, leave.decline_leave);

//search 
router.post('/search', isLoggedIn, leave.search_leave);

module.exports = router;