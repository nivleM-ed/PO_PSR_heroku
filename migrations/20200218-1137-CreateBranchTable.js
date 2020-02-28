//created by nivleM
//created on 18 Febuary 2020
//Table Name: branch

//for the sake of developement allowNull: true
//column name needs to be changed

'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('branch', {
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
            cd: { //branch code
                allowNull: false,
                type: Sequelize.STRING
            },
            name: { //branch name
                allowNull: true,
                type: Sequelize.STRING
            },
            address_1: { //address
                allowNull: true,
                type: Sequelize.STRING
            },
            address_2: { //address
                allowNull: true,
                type: Sequelize.STRING
            },
            address_3: { //address
                allowNull: true,
                type: Sequelize.STRING
            },
            address_4: { //address
                allowNull: true,
                type: Sequelize.STRING
            }
        }, {
            freezeTableName: true
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('branch');
    }
};

