//created by nivleM
//created on 14 September 2019
//Table Name: psr

//Updated on 17 September 2019
//UPDATES:
//added columns to fullfill requirements

//for the sake of developement allowNull: true
//column name needs to be changed

'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('psr', {
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
            },
            psr_no: { //purchase order number
                allowNull: false,
                type: Sequelize.INTEGER
            },
            purchase_class: { //purchase class
                allowNull: true,
                type: Sequelize.STRING
            },
            purchase_typ: { //purchase type
                allowNull: true,
                type: Sequelize.STRING  
            },
            purchase_just: { //justification for purchase
                allowNull: true,
                type: Sequelize.STRING
            },
            cost_typ: { //cost type
                allowNull: true,
                type: Sequelize.STRING
            },
            date_req: {  //date required
                allowNull: true,
                type: Sequelize.DATEONLY  //cannot be Sequelize.DATE(timestamp)
            },
            project_title: {  //project title
                allowNull: true,
                type: Sequelize.STRING
            },
            vessel_code: {  //vessel code
                allowNull: true,
                type: Sequelize.STRING
            },
            delv: {  //address of buyer
                allowNull: true,
                type: Sequelize.STRING
            },
            psr_desc: {
                type: Sequelize.JSON,   //json file
                allowNull: true        // expected format {desc:desc,qty:qty,unit:unit,cost_code:cost_code,remarks:"remarks"}
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
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            status_t1_1: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            status_t1_2: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            status_t2: {
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
            date_pending_2: {
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
        return queryInterface.dropTable('psr');
    }
};

