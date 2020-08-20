'use strict';
module.exports = (sequelize, DataTypes) => {
    var leave = sequelize.define('leave', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        user_id: { 
            allowNull: false,
            type: DataTypes.STRING
        },
        date_from: { 
            allowNull: false,
            type: DataTypes.DATEONLY
        },
        date_to: { 
            allowNull: false,
            type: DataTypes.DATEONLY
        },
        reason: { 
            allowNull: false,
            type: DataTypes.STRING(1000)
        },
        del_reason: { 
            allowNull: true,
            type: DataTypes.STRING(1000)
        },
        emergency_contact: { 
            allowNull: true,
            type: DataTypes.INTEGER
        },
        replace_id: { 
            allowNull: true,
            type: DataTypes.STRING(1000)
        },
        approver_id: {
            allowNull: true,
            type: DataTypes.STRING
        },
        decline_id: {
            allowNull: true,
            type: DataTypes.STRING
        },
        group: {
            allowNull: true,
            type: DataTypes.STRING
        },
        branch: {
            allowNull: true,
            type: DataTypes.STRING
        },
        designation: {
            allowNull: true,
            type: DataTypes.STRING
        },
        leave_type: {
            allowNull: true,
            type: DataTypes.STRING
        },
        status: { 
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        decline_status: { 
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        date_approve: {
            allowNull: true,
            type: DataTypes.DATEONLY
        },
        date_decline: {
            allowNull: true,
            type: DataTypes.DATEONLY
        }
    }, {
        freezeTableName: true
    });

    return leave;
};