//created by nivleM
//created on 18 Febuary 2020
//Table Name: department

//for the sake of developement allowNull: true
//column name needs to be changed

'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('department', {
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
            cd: { //department code
                allowNull: false,
                type: Sequelize.STRING
            },
            name: { //department name
                allowNull: true,
                type: Sequelize.STRING
            }
        }, {
            freezeTableName: true
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('department');
    }
};

