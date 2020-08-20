'use strict';
module.exports = (sequelize, DataTypes) => {
    var psr = sequelize.define('psr', {
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
        psr_no: { //purchase order number
            allowNull: false,
            type: DataTypes.INTEGER
        },
        purchase_class: { //purchase class
            allowNull: true,
            type: DataTypes.STRING
        },
        purchase_typ: { //purchase type
            allowNull: true,
            type: DataTypes.STRING
        },
        purchase_just: { //justification for purchase
            allowNull: true,
            type: DataTypes.STRING
        },
        cost_typ: { //cost type
            allowNull: true,
            type: DataTypes.STRING
        },
        date_req: {  //date required
            allowNull: true,
            type: DataTypes.DATEONLY
        },
        project_title: {  //project title
            allowNull: true,
            type: DataTypes.STRING
        },
        vessel_code: {  //vessel code
            allowNull: true,
            type: DataTypes.STRING
        },
        delv: {  //address of buyer
            allowNull: true,
            type: DataTypes.STRING
        },
        psr_desc: {
            type: DataTypes.JSON,
            allowNull: true
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

    return psr;
};

//some values allowNull:false but changed to true for developement