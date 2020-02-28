var express = require('express');
var router = express.Router();
let psr = require('../controller/psr');
let {isLoggedIn, auth_no_t1, auth_no_t1_t2} = require('../middleware/authenticate');

// psr module
router.get('/all/:page', isLoggedIn, psr.show_psr_page); //show all with pagination
router.get('/own_psr/:page', isLoggedIn, psr.show_own_psr_page); //show own psr with pagination
router.get('/search/:psr_no', isLoggedIn, psr.find); //find for specific psr_no

router.get('/approved_np', isLoggedIn, psr.approved_nopage); //find for psr WITHOUT pagination
router.get('/approved_psr/:page', isLoggedIn, psr.get_approved); //show all approved psr WITH PAGINATION
router.get('/submits/:page', isLoggedIn, auth_no_t1, psr.get_submits); //show all psr submitted for approval
router.get('/pending/:page', isLoggedIn, auth_no_t1_t2, psr.get_pending); //show all psr that is pending for approval
router.get('/del_req/:page', isLoggedIn, auth_no_t1, psr.get_del_req); //show all psr that is requested for deletion

router.post('/add_psr', isLoggedIn, psr.psr_add); //add psr
router.post('/req_del_psr/:psr_id', isLoggedIn, psr.psr_req_del); //request to delete psr
router.delete('/app_del/:psr_id', isLoggedIn, auth_no_t1, psr.psr_del); //approve delete request psr
router.post('/dec_del/:psr_id', isLoggedIn, auth_no_t1, psr.psr_decline_del); //decline delete request psr
router.get('/:psr_id', isLoggedIn, psr.report); //show specific psr

router.post('/:psr_id/upd_psr', isLoggedIn, psr.psr_upd); //update psr
router.post('/:psr_id/pending', isLoggedIn, auth_no_t1, psr.psr_stat_1); //psr status to pending
router.post('/:psr_id/approve', isLoggedIn, auth_no_t1_t2, psr.psr_stat_2); //psr status to approved  
router.post('/:psr_id/decline', isLoggedIn, auth_no_t1, psr.psr_stat_decline); //psr status to declined  

//search 
router.post('/search', isLoggedIn, psr.search_psr);

//router.get('/user/:user_id/:page', isLoggedIn, auth_no_t1, psr.search_user);


module.exports = router;

//submitted -> pending approval -> approved