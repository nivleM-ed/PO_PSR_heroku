//created by nivleM
//created on 9 September 2019
//Table Name: purchase_order_data

'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('leave', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
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
            user_id: { 
                allowNull: false,
                type: Sequelize.STRING
            },
            date_from: {
                allowNull: false,
                type: Sequelize.DATEONLY
            },
            date_to: {
                allowNull: false,
                type: Sequelize.DATEONLY
            },
            reason: { 
                allowNull: false,
                type: Sequelize.STRING(1000)
            },
            del_reason: { 
                allowNull: true,
                type: Sequelize.STRING(1000)
            },
            emergency_contact: { 
                allowNull: true,
                type: Sequelize.INTEGER
            },
            replace_id: { 
                allowNull: true,
                type: Sequelize.STRING(1000)
            },
            approver_id: {
                allowNull: true,
                type: Sequelize.STRING
            },
            decline_id: {
                allowNull: true,
                type: Sequelize.STRING
            },
            group: {
                allowNull: true,
                type: Sequelize.STRING
            },
            branch: {
                allowNull: true,
                type: Sequelize.STRING
            },
            designation: {
                allowNull: true,
                type: Sequelize.STRING
            },
            leave_type: {
                allowNull: true,
                type: Sequelize.STRING
            },
            status: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            decline_status: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            date_approve: {
                allowNull: true,
                type: Sequelize.DATEONLY
            },
            date_decline: {
                allowNull: true,
                type: Sequelize.DATEONLY
            }
        }, {
            freezeTableName: true
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('leave');
    }
};

