let models = require('./models');
var sequelize = require('sequelize');

exports.run_db = function() {
    //user can create many leaves
    models.Users.hasMany(models.leave, {
        as: 'leave',
        foreignKey: 'user_id'
    });
    models.leave.belongsTo(models.Users, {
        as: 'user_leave',
        foreignKey: 'user_id',
        targetKey: 'id'
    });

    //approver for leaves
    models.Users.hasMany(models.leave, {
        as: 'leave2',
        foreignKey: 'approver_id'
    });
    models.leave.belongsTo(models.Users, {
        as: 'approver_leave',
        foreignKey: 'approver_id',
        targetKey: 'id'
    });

    //replace username for leaves
    models.Users.hasMany(models.leave, {
        as: 'leave3',
        foreignKey: 'replace_id'
    });
    models.leave.belongsTo(models.Users, {
        as: 'replace_user',
        foreignKey: 'replace_id',
        targetKey: 'id'
    });

    //user - department
    models.department.hasOne(models.Users, {
        as: 'user_department',
        foreignKey: 'department_id',
        targetKey: 'id'
    });
    models.Users.belongsTo(models.department, {
        as: 'department',
        foreignKey: 'department_id'
    });
    

    //user - branch
    models.branch.hasOne(models.Users, {
        as: 'user_branch',
        foreignKey: 'branch_id',
        targetKey: 'id'
    });
    models.Users.belongsTo(models.branch, {
        as: 'branch',
        foreignKey: 'branch_id'
    });
   

    //----------------------------------------------------------

    //po is dependant on psr
    models.psr.hasMany(models.purchase_order, {
        as: 'po',
        foreignKey: 'psr_id'
    });
    models.purchase_order.belongsTo(models.psr, {
        as: 'psr',
        foreignKey: 'psr_id',
        targetKey: 'id'
    });

    //-----------------------------------------------------------

    //user can create psr (required:true -inner join)
    models.Users.hasMany(models.psr, {
        as: 'psr1',
        foreignKey: 'create_user'
    });
    models.psr.belongsTo(models.Users, {
        as: 'create_user_psr',
        foreignKey: 'create_user',
        targetKey: 'id'
    });

    //t2_user for psr  (required:false -left join)
    models.Users.hasMany(models.psr, {
        as: 'psr2',
        foreignKey: 't2_user'
    });
    models.psr.belongsTo(models.Users, {
        as: 't2_user_psr',
        foreignKey: 't2_user',
        targetKey: 'id'
    });

    //t2_user for psr  (required:false -left join)
    models.Users.hasMany(models.psr, {
        as: 'psr3',
        foreignKey: 't3_user'
    });
    models.psr.belongsTo(models.Users, {
        as: 't3_user_psr',
        foreignKey: 't3_user',
        targetKey: 'id'
    });

    //approver for psr  (required:false -left join)
    models.Users.hasMany(models.psr, {
        as: 'psr4',
        foreignKey: 'approver_user'
    });
    models.psr.belongsTo(models.Users, {
        as: 'approver_psr',
        foreignKey: 'approver_user',
        targetKey: 'id'
    });

    //del request for psr  (required:false -left join)
    models.Users.hasMany(models.psr, {
        as: 'psr5',
        foreignKey: 'del_user'
    });
    models.psr.belongsTo(models.Users, {
        as: 'del_req_user_psr',
        foreignKey: 'del_user',
        targetKey: 'id'
    });

    //psr - department
    models.department.hasOne(models.psr, {
        as: 'psr_department',
        foreignKey: 'department_id',
        targetKey: 'id'
    });
    models.psr.belongsTo(models.department, {
        as: 'department1',
        foreignKey: 'department_id'
    });

    //psr - branch
    models.branch.hasOne(models.psr, {
        as: 'psr_branch',
        foreignKey: 'branch_id',
        targetKey: 'id'
    });
    models.psr.belongsTo(models.branch, {
        as: 'branch1',
        foreignKey: 'branch_id'
    });
    

    //------------------------------------------------------------

    //user can create po (required:true -inner join)
    models.Users.hasMany(models.purchase_order, {
        as: 'po1',
        foreignKey: 'create_user'
    });
    models.purchase_order.belongsTo(models.Users, {
        as: 'create_user_po',
        foreignKey: 'create_user',
        targetKey: 'id'
    });

    //t2_user for po   (required:false -left join)
    models.Users.hasMany(models.purchase_order, {
        as: 'po2',
        foreignKey: 't2_user'
    });
    models.purchase_order.belongsTo(models.Users, {
        as: 't2_user_po',
        foreignKey: 't2_user',
        targetKey: 'id'
    });

    //t2_user for po   (required:false -left join)
    models.Users.hasMany(models.purchase_order, {
        as: 'po3',
        foreignKey: 't2_user'
    });
    models.purchase_order.belongsTo(models.Users, {
        as: 't3_user_po',
        foreignKey: 't3_user',
        targetKey: 'id'
    });

    //approver for po   (required:false -left join)
    models.Users.hasMany(models.purchase_order, {
        as: 'po4',
        foreignKey: 'approver_user'
    });
    models.purchase_order.belongsTo(models.Users, {
        as: 'approver_po',
        foreignKey: 'approver_user',
        targetKey: 'id'
    });

    //del request for po   (required:false -left join)
    models.Users.hasMany(models.purchase_order, {
        as: 'po5',
        foreignKey: 'del_user'
    });
    models.purchase_order.belongsTo(models.Users, {
        as: 'del_req_user_po',
        foreignKey: 'del_user',
        targetKey: 'id'
    });

    //po - department
    models.department.hasOne(models.purchase_order, {
        as: 'po_department',
        foreignKey: 'department_id',
        targetKey: 'id'
    });
    models.purchase_order.belongsTo(models.department, {
        as: 'department2',
        foreignKey: 'department_id'
    });
    
    //po - branch
    models.branch.hasOne(models.purchase_order, {
        as: 'po_branch',
        foreignKey: 'branch_id',
        targetKey: 'id'
    });
    models.purchase_order.belongsTo(models.branch, {
        as: 'branch2',
        foreignKey: 'branch_id'
    });
    


}