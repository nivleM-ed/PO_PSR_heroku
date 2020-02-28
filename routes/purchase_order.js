var express = require('express');
var router = express.Router();
let po = require('../controller/purchase_order');
let {isLoggedIn, auth_no_t1, auth_no_t1_t2} = require('../middleware/authenticate');

// po module
router.get('/all/:page', isLoggedIn, po.show_po_page); //show all with pagination
router.get('/own_po/:page', isLoggedIn, po.show_own_po_page); //show own po with pagination
router.get('/search/:po_no',  isLoggedIn, po.find); //find for specific po_no

router.get('/submits/:page', isLoggedIn, auth_no_t1, po.get_submits); //show all po submitted for approval
router.get('/pending/:page', isLoggedIn, auth_no_t1_t2, po.get_pending); //show all po that is pending for approval
router.get('/del_req/:page', isLoggedIn, auth_no_t1, po.get_del_req); //show all po that is requested for deletion

router.post('/add_po', isLoggedIn, po.po_add); //add po
router.post('/req_del_po/:po_id', isLoggedIn, po.po_req_del); //request to delete po
router.delete('/del/:po_id', isLoggedIn, auth_no_t1, po.po_del); //delete po
router.post('/dec_del/:po_id', isLoggedIn, auth_no_t1, po.po_decline_del); //decline delete request po
router.get('/:po_id', isLoggedIn, po.report); //show specific purchase order

router.post('/:po_id/upd_po', isLoggedIn, po.po_upd); //update purchase order
router.post('/:po_id/pending', isLoggedIn, auth_no_t1, po.po_stat_1); //po status to pending
router.post('/:po_id/approve', isLoggedIn, auth_no_t1_t2, po.po_stat_2); //po status to approved  
router.post('/:po_id/decline', isLoggedIn, auth_no_t1, po.po_stat_decline); //po status to declined  

//search 
router.post('/search', isLoggedIn, po.search_po);

//router.get('/user/:user_id/:page', isLoggedIn, auth_no_t1, po.search_user);


module.exports = router;

//submitted -> pending approval -> approved