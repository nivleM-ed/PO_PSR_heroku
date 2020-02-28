'use strict';
module.exports = (sequelize, DataTypes) => {
    var branch = sequelize.define('branch', {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        cd: { //branch code
            allowNull: false,
            type: DataTypes.STRING
        },
        name: { //branch name
            allowNull: true,
            type: DataTypes.STRING
        },
        address_1: { //address
            allowNull: true,
            type: DataTypes.STRING
        },
        address_2: { //address
            allowNull: true,
            type: DataTypes.STRING
        },
        address_3: { //address
            allowNull: true,
            type: DataTypes.STRING
        },
        address_4: { //address
            allowNull: true,
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });

    return branch;
};