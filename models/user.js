'use strict';
module.exports = (sequelize, DataTypes) => {
    var Users = sequelize.define('Users', {
        id: {
            type: DataTypes.STRING, //UUID
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        department_id: {
            allowNull: true,
            type: DataTypes.STRING
        },
        branch_id: {
            allowNull: true,
            type: DataTypes.STRING
        },
        contact_no: {
            allowNull: true,
            type: DataTypes.STRING
        },
        address_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        address_2: {
            allowNull: true,
            type: DataTypes.STRING
        },
        address_3: {
            allowNull: true,
            type: DataTypes.STRING
        },
        address_4: {
            allowNull: true,
            type: DataTypes.STRING
        },
        acct_t: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        t1: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        t2: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        t3: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        t4: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

    return Users;
}