'use strict';
module.exports = (sequelize, DataTypes) => {
    var department = sequelize.define('department', {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        cd: { //department code
            allowNull: false,
            type: DataTypes.STRING
        },
        name: { //department name
            allowNull: true,
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });

    return department;
};