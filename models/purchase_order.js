'use strict';
module.exports = (sequelize, DataTypes) => {
    var purchase_order = sequelize.define('purchase_order', {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        po_no: { //purchase order number
            allowNull: false,
            type: DataTypes.INTEGER
        },
        po_ref: { //purchase order reference
            allowNull: true,
            type: DataTypes.STRING
        },
        quotation: { //purchase order reference
            allowNull: true,
            type: DataTypes.STRING
        },
        delv_due: { //delivery due
            allowNull: true,
            type: DataTypes.DATEONLY //change to .DATE once moment.js work
        },
        ship_mode: { //mode of shipment
            allowNull: true,
            type: DataTypes.STRING
        },
        psr_id: { //purchase and service requisition
            allowNull: true,
            type: DataTypes.STRING
        },
        cca_no: { //cca number
            allowNull: true,
            type: DataTypes.STRING
        },
        pay_mode: { //mode of payment
            allowNull: true,
            type: DataTypes.STRING
        },
        address_1: { //address of buyer
            allowNull: true,
            type: DataTypes.STRING
        },
        address_2: { //address of buyer
            allowNull: true,
            type: DataTypes.STRING
        },
        address_3: { //address of buyer
            allowNull: true,
            type: DataTypes.STRING
        },
        address_4: { //address of buyer
            allowNull: true,
            type: DataTypes.STRING
        },
        po_desc: {
            type: DataTypes.JSON,
            allowNull: true
        },
        cl_name: { //client's name
            allowNull: true,
            type: DataTypes.STRING
        },
        cl_company: { //client's company
            allowNull: true,
            type: DataTypes.STRING
        },
        department_id: {  //department
            allowNull: true,
            type: DataTypes.STRING
        },
        branch_id: {  //branch
            allowNull: true,
            type: DataTypes.STRING
        },
        decline_reason: {
                allowNull: true,
                type: DataTypes.STRING
            },
        delete_req: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        status_t1_1: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        status_t1_2: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        status_t2: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        status_decline: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        create_user: { //user_id of creator
            allowNull: true,
            type: DataTypes.STRING
        },
        del_user: { //user_id of delete request
            allowNull: true,
            type: DataTypes.STRING
        },
        t2_user: { //user_id of 1st t2 user
            allowNull: true,
            type: DataTypes.STRING
        },
        t3_user: { //user_id of 1st t2 user
            allowNull: true,
            type: DataTypes.STRING
        },
        approver_user: { //user_id of approver user
            allowNull: true,
            type: DataTypes.STRING
        },
        decline_user: { //user_id of decline user
            allowNull: true,
            type: DataTypes.STRING
        },
        date_pending_1: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        date_pending_2: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        date_approve: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        date_decline: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
    }, {
        freezeTableName: true
    });

    return purchase_order;
};

//some values allowNull:false but changed to true for developement