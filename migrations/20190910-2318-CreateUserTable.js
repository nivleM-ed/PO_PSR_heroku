'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING, //UUID
                defaultValue: Sequelize.UUIDV4,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING
            },
            firstname: {
                allowNull: true,
                type: Sequelize.STRING
            },
            lastname: {
                allowNull: true,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            email: {
                allowNull: true,
                type: Sequelize.STRING
            },
            department_id: {
                allowNull: true,
                type: Sequelize.STRING
            },
            branch_id: {
                allowNull: true,
                type: Sequelize.STRING
            },
            contact_no: {
                allowNull: true,
                type: Sequelize.STRING
            },
            address_1: {
                allowNull: true,
                type: Sequelize.STRING
            },
            address_2: {
                allowNull: true,
                type: Sequelize.STRING
            },
            address_3: {
                allowNull: true,
                type: Sequelize.STRING
            },
            address_4: {
                allowNull: true,
                type: Sequelize.STRING
            },
            acct_t: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            t1: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            t2: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            t3: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            t4: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            is_admin: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            }
        }, {
            freezeTableName: true
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};


