//created by nivleM
//created on 9 September 2019
//Table Name: purchase_order

//updated on 17 September
//UPDATES:
//add new columns to fulfill requirements

//for the sake of developement allowNull: true

'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('purchase_order', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
                defaultValue: Sequelize.UUIDV4
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }, //needed
            po_no: { //purchase order number
                allowNull: false,
                type: Sequelize.INTEGER
            },
            po_ref: { //purchase order reference
                allowNull: true,
                type: Sequelize.STRING
            },
            quotation: { //quotation
                allowNull: true,
                type: Sequelize.STRING
            },
            delv_due: { //delivery due
                allowNull: true,
                type: Sequelize.DATEONLY //change to .DATE once moment.js work
            },
            ship_mode: { //mode of shipment
                allowNull: true,
                type: Sequelize.STRING
            },
            psr_id: { //purchase and service requisition
                allowNull: true,
                type: Sequelize.STRING
            },
            cca_no: { //cca number
                allowNull: true,
                type: Sequelize.STRING
            },
            pay_mode: { //mode of payment
                allowNull: true,
                type: Sequelize.STRING
            },
            address_1: { //address of buyer
                allowNull: true,
                type: Sequelize.STRING
            },
            address_2: { //address of buyer
                allowNull: true,
                type: Sequelize.STRING
            },
            address_3: { //address of buyer
                allowNull: true,
                type: Sequelize.STRING
            },
            address_4: { //address of buyer
                allowNull: true,
                type: Sequelize.STRING
            },
            po_desc: {
                type: Sequelize.JSON, //json file
                allowNull: true //expected format   {quantity:quantity,description:"description",price:price,total:total}
            },
            cl_name: { //client's name
                allowNull: true,
                type: Sequelize.STRING
            },
            cl_company: { //client's company
                allowNull: true,
                type: Sequelize.STRING
            },
            department_id: {  //department
                allowNull: true,
                type: Sequelize.STRING
            },
            branch_id: {  //branch
                allowNull: true,
                type: Sequelize.STRING
            },
            decline_reason: {
                allowNull: true,
                type: Sequelize.STRING
            },
            delete_req: {
                type: Sequelize.BOOLEAN, //request for deletion
                defaultValue: false,
                allowNull: false
            },
            status_t1_1: { //everyone can see - need to be approved by t2 user#1 -for manager to set to pending
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            status_t1_2: { //everyone can see - need to be approved by t2 user#2 -for manager to set to pending
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            status_t2: { //for manager to set to approve
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            status_decline: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            create_user: { //user_id of creator
                allowNull: true,
                type: Sequelize.STRING
            },
            del_user: { //user_id of delete request
                allowNull: true,
                type: Sequelize.STRING
            },
            t2_user: { //user_id of 1st t2 user
                allowNull: true,
                type: Sequelize.STRING
            },
            t3_user: { //user_id of 1st t2 user
                allowNull: true,
                type: Sequelize.STRING
            },
            approver_user: { //user_id of approver user
                allowNull: true,
                type: Sequelize.STRING
            },
            decline_user: { //user_id of approver user
                allowNull: true,
                type: Sequelize.STRING
            },
            date_pending_1: {
                type: Sequelize.DATEONLY,
                allowNull: true
            },
            date_pending_2: { //for higher ups to approve
                type: Sequelize.DATEONLY,
                allowNull: true
            },
            date_approve: {
                type: Sequelize.DATEONLY,
                allowNull: true
            },
            date_decline: {
                type: Sequelize.DATEONLY,
                allowNull: true
            },
        }, {
            freezeTableName: true
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('purchase_order');
    }
};