let models = require('../models');
var sequelize = require('sequelize');
var winston = require('../logs/winston');
var CONST = require('../const');
const op = sequelize.Op;
const db = require('../models/index');
let users = require('./user');

//WORKING
exports.show_po_page = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'show_po_page'
    })
    const limit = CONST.CONST_page_limit; //can be changed

    const po_page = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.findAll({
                attributes: ['id', [models.sequelize.fn('CONCAT', models.sequelize.col('branch2.cd'), '/', models.sequelize.col('department2.cd'), '/PO/', models.sequelize.col('purchase_order.po_no')), 'po_no'], 'createdAt', ['status_t2', 'status']],
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: models.Users,
                    required: true,
                    as: 'create_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't2_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't3_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'approver_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'del_req_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.department,
                    required: true,
                    as: 'department2',
                    attributes: []
                },
                {
                    model: models.branch,
                    required: true,
                    as: 'branch2',
                    attributes: []
                },
                {
                    model: models.psr,
                    required: true,
                    as: 'psr',
                    attributes: ['psr_no', [models.sequelize.fn('CONCAT', models.sequelize.col('psr->branch1.cd'), '/', models.sequelize.col('psr->department1.cd'), '/PSR/', models.sequelize.col('psr.psr_no')), 'no']],
                    include: [
                        {
                            model: models.department,
                            required: true,
                            as: 'department1',
                            attributes: ['cd']
                        },
                        {
                            model: models.branch,
                            required: true,
                            as: 'branch1',
                            attributes: ['cd']
                        }
                    ]
                }
                ]
            }).then(po => {
                resolve(po);
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'po_show_po_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    const total_page = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.count({
                // attributes: [[sequelize.fn('COUNT', sequelize.col('id'))]]
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'po_show_po_page_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([po_page(req), total_page(req)])
        .then(result => {
            res.status(200).send({
                result
            });
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'po_show_po_page_promise',
                message: err
            })
            res.status(500).send(err);
        })

}

exports.show_own_po_page = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'show_own_po_page'
    })
    const limit = CONST.CONST_page_limit; //can be changed

    const po_own_page = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.findAll({
                attributes: ['id', [models.sequelize.fn('CONCAT', models.sequelize.col('branch2.cd'), '/', models.sequelize.col('department2.cd'), '/PO/', models.sequelize.col('purchase_order.po_no')), 'po_no'], 'createdAt', 'po_ref', 'quotation', 'delv_due', 'ship_mode', 'cca_no', 'psr_id', 'pay_mode', 'address_1', 'address_2', 'address_3', 'address_4', 'po_desc', 'cl_name', 'cl_company', 'decline_reason', 'delete_req', 'status_t1_1', 'status_t1_2', 'status_t2', 'status_decline', 'date_pending_1', 'date_pending_2', 'date_approve', 'date_decline'],
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: models.Users,
                    required: true,
                    as: 'create_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't2_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't3_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'approver_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'del_req_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.department,
                    required: true,
                    as: 'department2',
                    attributes: []
                },
                {
                    model: models.branch,
                    required: true,
                    as: 'branch2',
                    attributes: []
                },
                {
                    model: models.psr,
                    required: true,
                    as: 'psr',
                    attributes: ['psr_no', [models.sequelize.fn('CONCAT', models.sequelize.col('psr->branch1.cd'), '/', models.sequelize.col('psr->department1.cd'), '/PSR/', models.sequelize.col('psr.psr_no')), 'no']],
                    include: [
                        {
                            model: models.department,
                            required: true,
                            as: 'department1',
                            attributes: ['cd']
                        },
                        {
                            model: models.branch,
                            required: true,
                            as: 'branch1',
                            attributes: ['cd']
                        }
                    ]
                }
                ],
                where: {
                    create_user: req.user.id
                }
            }).then(po => {
                resolve(po);
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'po_show_own_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    const total_own_page = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.count({
                where: {
                    create_user: req.user.id
                }
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'po_show_own_page_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([po_own_page(req), total_own_page(req)])
        .then(result => {
            res.status(200).send({
                result
            });
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'po_show_own_page_promise',
                message: err
            })
            res.status(500).send(err);
        })
}

//WORKING
//find po_no
exports.find = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'find'
    })

    return models.purchase_order.findOne({
        attributes: ['id', [models.sequelize.fn('CONCAT', models.sequelize.col('branch2.cd'), '/', models.sequelize.col('department2.cd'), '/PO/', models.sequelize.col('purchase_order.po_no')), 'po_no'], 'createdAt', ['status_t2', 'status']],
        include: [{
            model: models.Users,
            required: true,
            as: 'create_user_po',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 't2_user_po',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 't3_user_po',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 'approver_po',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 'del_req_user_po',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.psr,
            required: false,
            as: 'psr',
            attributes: ['psr_no']
        },
        {
            model: models.department,
            required: true,
            as: 'department2',
            attributes: []
        },
        {
            model: models.branch,
            required: true,
            as: 'branch2',
            attributes: []
        },
        {
            model: models.psr,
            required: true,
            as: 'psr',
            attributes: ['psr_no', [models.sequelize.fn('CONCAT', models.sequelize.col('psr->branch1.cd'), '/', models.sequelize.col('psr->department1.cd'), '/PSR/', models.sequelize.col('psr.psr_no')), 'no']],
            include: [
                {
                    model: models.department,
                    required: true,
                    as: 'department1',
                    attributes: ['cd']
                },
                {
                    model: models.branch,
                    required: true,
                    as: 'branch1',
                    attributes: ['cd']
                }
            ]
        }
        ],
        where: {
            po_no: req.params.po_no
        }
    }).then(po => {
        res.status(200).send(po)
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'po_find',
            message: err
        })
        res.status(500).send(err);
    })
}


//get po waiting to be accepted
exports.get_submits = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'get_submits'
    })
    const limit = CONST.CONST_page_limit; //can be changed
    let departmentBranch, userBranch, userDep;

    const getSubmits = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.findAll({
                attributes: ['id', [models.sequelize.fn('CONCAT', models.sequelize.col('branch2.cd'), '/', models.sequelize.col('department2.cd'), '/PO/', models.sequelize.col('purchase_order.po_no')), 'po_no'], 'createdAt', ['status_t2', 'status']],
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: models.Users,
                    required: false,
                    as: 'create_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't2_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't3_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'approver_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'del_req_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.department,
                    required: true,
                    as: 'department2',
                    attributes: []
                },
                {
                    model: models.branch,
                    required: true,
                    as: 'branch2',
                    attributes: []
                },
                {
                    model: models.psr,
                    required: true,
                    as: 'psr',
                    attributes: ['psr_no', [models.sequelize.fn('CONCAT', models.sequelize.col('psr->branch1.cd'), '/', models.sequelize.col('psr->department1.cd'), '/PSR/', models.sequelize.col('psr.psr_no')), 'no']],
                    include: [
                        {
                            model: models.department,
                            required: true,
                            as: 'department1',
                            attributes: ['cd']
                        },
                        {
                            model: models.branch,
                            required: true,
                            as: 'branch1',
                            attributes: ['cd']
                        }
                    ]
                }
                ],
                where: {
                    [op.and]: [
                        {
                            [op.or]:
                                [{
                                    status_t1_1: false
                                },
                                {
                                    status_t1_2: false
                                }],
                        },
                        {
                            [op.or]:
                                [{
                                    t2_user: {
                                        [op.not]: req.user.id
                                    }
                                }, {
                                    t2_user: {
                                        [op.is]: null
                                    }
                                }]
                        },
                        {
                            [op.or]:
                                [{
                                    t3_user: {
                                        [op.not]: req.user.id
                                    }
                                }, {
                                    t3_user: {
                                        [op.is]: null
                                    }
                                }]
                        }
                    ],
                    status_decline: false,
                    delete_req: false,
                    status_t2: false,
                    '$branch2.cd$': userBranch,
                    '$department2.cd$': userDep
                } //t2_user_1 != req.user.id || t2_user_1 = null 
            }).then(po => {
                resolve(po)
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'po_get_submits',
                    message: err
                })
                reject(err);
            })
        })
    }

    const getSubmitsTotal = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.count({
                include: [{
                    model: models.department,
                    required: true,
                    as: 'department2',
                    attributes: []
                },
                {
                    model: models.branch,
                    required: true,
                    as: 'branch2',
                    attributes: []
                }
                ],
                where: {
                    [op.and]: [
                        {
                            [op.or]:
                                [{
                                    status_t1_1: false
                                },
                                {
                                    status_t1_2: false
                                }],
                        },
                        {
                            [op.or]:
                                [{
                                    t2_user: {
                                        [op.not]: req.user.id
                                    }
                                }, {
                                    t2_user: {
                                        [op.is]: null
                                    }
                                }]
                        },
                        {
                            [op.or]:
                                [{
                                    t3_user: {
                                        [op.not]: req.user.id
                                    }
                                }, {
                                    t3_user: {
                                        [op.is]: null
                                    }
                                }]
                        }
                    ],
                    status_decline: false,
                    delete_req: false,
                    status_t2: false,
                    '$branch2.cd$': userBranch,
                    '$department2.cd$': userDep
                } //t2_user_1 != req.user.id || t2_user_1 = null 
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'po_get_submits_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    departmentBranch = users.getDepartmentBranch(req, res, next).then(data => {
        userBranch = data.branch.cd
        userDep = data.department.cd
    }).then(doPromise => {
        Promise.all([getSubmits(req), getSubmitsTotal(req)])
            .then(result => {
                res.status(200).send({
                    result
                });
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'po_get_submits_promise',
                    message: err
                })
                res.status(500).send(err);
            })
    });
}


//WORKING
//get po waiting to be approved
exports.get_pending = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'get_pending'
    })
    const limit = CONST.CONST_page_limit; //can be changed

    const getPending = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.findAll({
                attributes: ['id', [models.sequelize.fn('CONCAT', models.sequelize.col('branch2.cd'), '/', models.sequelize.col('department2.cd'), '/PO/', models.sequelize.col('purchase_order.po_no')), 'po_no'], 'createdAt', ['status_t2', 'status']],
                where: {
                    delete_req: false,
                    status_t1_1: true,
                    status_t1_2: true,
                    status_t2: false,
                    status_decline: false
                },
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: models.Users,
                    required: true,
                    as: 'create_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't2_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't3_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'approver_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'del_req_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.department,
                    required: true,
                    as: 'department2',
                    attributes: []
                },
                {
                    model: models.branch,
                    required: true,
                    as: 'branch2',
                    attributes: []
                },
                {
                    model: models.psr,
                    required: true,
                    as: 'psr',
                    attributes: ['psr_no', [models.sequelize.fn('CONCAT', models.sequelize.col('psr->branch1.cd'), '/', models.sequelize.col('psr->department1.cd'), '/PSR/', models.sequelize.col('psr.psr_no')), 'no']],
                    include: [
                        {
                            model: models.department,
                            required: true,
                            as: 'department1',
                            attributes: ['cd']
                        },
                        {
                            model: models.branch,
                            required: true,
                            as: 'branch1',
                            attributes: ['cd']
                        }
                    ]
                }
                ]
            }).then(po => {
                resolve(po)
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'po_get_pending',
                    message: err
                })
                reject(err);
            })
        })
    }

    const getPendingTotal = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.count({
                where: {
                    delete_req: false,
                    status_t1_1: true,
                    status_t1_2: true,
                    status_decline: false,
                    status_t2: false
                }
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'po_get_pending_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([getPending(req), getPendingTotal(req)])
        .then(result => {
            res.status(200).send({
                result
            });
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'po_get_pending_promise',
                message: err
            })
            res.status(500).send(err);
        })
}

//WORKING
//get po waiting to be approved
exports.get_del_req = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'get_del_req'
    })
    const limit = CONST.CONST_page_limit; //can be changed

    const getDel = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.findAll({
                attributes: ['id', [models.sequelize.fn('CONCAT', models.sequelize.col('branch2.cd'), '/', models.sequelize.col('department2.cd'), '/PO/', models.sequelize.col('purchase_order.po_no')), 'po_no'], 'createdAt', ['status_t2', 'status']],
                where: {
                    delete_req: true
                },
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: models.Users,
                    required: true,
                    as: 'create_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't2_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't3_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'approver_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'del_req_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.department,
                    required: true,
                    as: 'department2',
                    attributes: []
                },
                {
                    model: models.branch,
                    required: true,
                    as: 'branch2',
                    attributes: []
                },
                {
                    model: models.psr,
                    required: true,
                    as: 'psr',
                    attributes: ['psr_no', [models.sequelize.fn('CONCAT', models.sequelize.col('psr->branch1.cd'), '/', models.sequelize.col('psr->department1.cd'), '/PSR/', models.sequelize.col('psr.psr_no')), 'no']],
                    include: [
                        {
                            model: models.department,
                            required: true,
                            as: 'department1',
                            attributes: ['cd']
                        },
                        {
                            model: models.branch,
                            required: true,
                            as: 'branch1',
                            attributes: ['cd']
                        }
                    ]
                }
                ]
            }).then(po => {
                resolve(po)
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'po_get_delreq',
                    message: err
                })
                reject(err);
            })
        })
    }

    const getDelTotal = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.po.count({
                where: {
                    delete_req: true
                }
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'po_get_delreq_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([getDel(req), getDelTotal(req)])
        .then(result => {
            res.status(200).send({
                result
            });
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'po_get_delreq_promise',
                message: err
            })
            res.status(500).send(err);
        })

}

//WORKING
//change to SP. Update Date: 18/2/2020
exports.po_add = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'po_add'
    })
    return db.sequelize
        .query('SELECT * FROM F_ADD_PO(:po_ref, :quotation, :delv_due, :ship_mode, :psr_id, :cca_no, :pay_mode, :address_1, :address_2, :address_3, :address_4, :po_desc, :cl_name, :cl_company, :department, :branch, :create_user)', {
            replacements: {
                po_ref: (req.body.poObj._po_ref == null ? null : req.body.poObj._po_ref),
                quotation: (req.body.poObj._quotation == null ? null : req.body.poObj._quotation),
                delv_due: (req.body.poObj._delv_due == null ? null : req.body.poObj._delv_due),
                ship_mode: (req.body.poObj._ship_mode == null ? null : req.body.poObj._ship_mode),
                psr_id: (req.body.poObj._psr_id == null ? null : req.body.poObj._psr_id),
                cca_no: (req.body.poObj._cca_no == null ? null : req.body.poObj._cca_no),
                pay_mode: (req.body.poObj._pay_mode == null ? null : req.body.poObj._pay_mode),
                address_1: (req.body.poObj._address_1 == null ? null : req.body.poObj._address_1),
                address_2: (req.body.poObj._address_2 == null ? null : req.body.poObj._address_2),
                address_3: (req.body.poObj._address_3 == null ? null : req.body.poObj._address_3),
                address_4: (req.body.poObj._address_4 == null ? null : req.body.poObj._address_4),
                po_desc: (req.body.poObj._po_desc == null ? null : JSON.stringify(req.body.poObj._po_desc)),
                cl_name: (req.body.poObj._cl_name == null ? null : req.body.poObj._cl_name),
                cl_company: (req.body.poObj._cl_company == null ? null : req.body.poObj._cl_company),
                department: (req.body.poObj._department == null ? null : req.body.poObj._department.toUpperCase()),
                branch: (req.body.poObj._branch == null ? null : req.body.poObj._branch.toUpperCase()),
                create_user: req.user.id
            }
        }).then(po => {
            res.status(201).send(po[0][0])
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'po_add',
                message: err
            })
            res.status(500).send(err);
        })
};

//WORKING
//show specific purchase order and description
exports.report = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'report'
    })

    return models.purchase_order.findOne({
        attributes: ['id', [models.sequelize.fn('CONCAT', models.sequelize.col('branch2.cd'), '/', models.sequelize.col('department2.cd'), '/PO/', models.sequelize.col('po_no')), 'po_no'], 'createdAt', 'po_ref', 'quotation', 'delv_due', 'ship_mode', 'cca_no', 'psr_id', 'pay_mode', 'address_1', 'address_2', 'address_3', 'address_4', 'po_desc', 'cl_name', 'cl_company', 'decline_reason', 'delete_req', 'status_t1_1', 'status_t1_2', 'status_t2', 'status_decline', 'date_pending_1', 'date_pending_2', 'date_approve', 'date_decline'],
        include: [{
            model: models.Users,
            required: true,
            as: 'create_user_po',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 't2_user_po',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 't3_user_po',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 'approver_po',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 'del_req_user_po',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.department,
            required: true,
            as: 'department2',
            attributes: []
        },
        {
            model: models.branch,
            required: true,
            as: 'branch2',
            attributes: []
        },
        {
            model: models.psr,
            required: true,
            as: 'psr',
            attributes: ['psr_no', [models.sequelize.fn('CONCAT', models.sequelize.col('psr->branch1.cd'), '/', models.sequelize.col('psr->department1.cd'), '/PSR/', models.sequelize.col('psr.psr_no')), 'no']],
            include: [
                {
                    model: models.department,
                    required: true,
                    as: 'department1',
                    attributes: ['cd']
                },
                {
                    model: models.branch,
                    required: true,
                    as: 'branch1',
                    attributes: ['cd']
                }
            ]
        }
        ],
        where: {
            id: req.params.po_id
        }
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'po_report',
            message: err
        })
        res.status(500).send(err);
    })

};

//request delete
exports.po_req_del = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'po_del_req'
    })
    return models.purchase_order.update({
        delete_req: true,
        del_user: req.user.id
    }, {
        where: {
            id: req.params.po_id,
        }
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'po_del_req',
            message: err
        })
        res.status(500).send(err);
    })
}

//WORKING
//approve delete po
exports.po_del = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'po_del'
    })
    return models.purchase_order.destroy({
        where: {
            id: req.params.po_id,
            delete_req: true
        }
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'po_del',
            message: err
        })
        res.status(500).send(err);
    })
}

//decline delete request
exports.po_decline_del = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'po_del_decline'
    })
    return models.purchase_order.update({
        delete_req: false,
        del_user: null
    }, {
        where: {
            id: req.params.po_id,
        }
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'po_del_decline',
            message: err
        })
        res.status(500).send(err);
    })
}


//WORKING
//update po
exports.po_upd = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'po_upd'
    })
    return models.purchase_order.update({
        po_ref: req.body.poObj._po_ref,
        quotation: req.body.poObj._quotation,
        delv_due: req.body.poObj._delv_due,
        ship_mode: req.body.poObj._ship_mode,
        psr_id: req.body.poObj._psr_id,
        cca_no: req.body.poObj._cca_no,
        pay_mode: req.body.poObj._pay_mode,
        address_1: req.body.poObj._address_1,
        address_2: req.body.poObj._address_2,
        address_3: req.body.poObj._address_3,
        address_4: req.body.poObj._address_4,
        po_desc: req.body.poObj._po_desc,
        cl_name: req.body.poObj._cl_name,
        cl_company: req.body.poObj._cl_company
    }, {
        where: {
            id: req.params.po_id
        }
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'po_upd',
            message: err
        })
        res.status(500).send(err);
    })
}

//WORKING
//update po status to pending
exports.po_stat_1 = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'po_stat_1'
    })
    return models.purchase_order.findOne({
        where: {
            id: req.params.po_id
        }
    }).then(exist => {
        if (req.user.t2) {
            if (req.user.id == exist.t2_user) {
                res.status(200).send({
                    err: "notAllowed"
                });
            } else {
                return models.purchase_order.update({
                    status_t1_1: true,
                    date_pending_1: new Date(),
                    t2_user: req.user.id
                }, {
                    where: {
                        id: req.params.po_id,
                        delete_req: {
                            [op.not]: true
                        }
                    }
                }).then(po => {
                    res.status(200).send(po);
                }).catch(err => {
                    winston.error({
                        level: 'error',
                        label: 'po_stat_1_2',
                        message: err
                    })
                    res.status(500).send(err);
                });
            }
        } else if (req.user.t3) {
            if (req.user.id == exist.t3_user) {
                res.status(200).send({
                    err: "notAllowed"
                });
            } else {
                return models.purchase_order.update({
                    status_t1_2: true,
                    date_pending_2: new Date(),
                    t3_user: req.user.id
                }, {
                    where: {
                        id: req.params.po_id,
                        delete_req: {
                            [op.not]: true
                        }
                    }
                }).then(po => {
                    res.status(200).send(po);
                }).catch(err => {
                    winston.error({
                        level: 'error',
                        label: 'po_stat_1_1',
                        message: err
                    })
                    res.status(500).send(err);
                });
            }
        } else {
            res.status(200).send({
                err: "notAllowed"
            });
        }
        // if (exist.status_t1_1) {
        //     if (req.user.id == exist.t3_user) {
        //         res.status(200).send({
        //             err: "notAllowed"
        //         });
        //     } else {
        //         return models.purchase_order.update({
        //             status_t1_2: true,
        //             date_pending_2: new Date(),
        //             t3_user: req.user.id
        //         }, {
        //             where: {
        //                 id: req.params.po_id,
        //                 delete_req: {
        //                     [op.not]: true
        //                 }
        //             }
        //         }).then(po => {
        //             res.status(200).send(po);
        //         }).catch(err => {
        //             winston.error({
        //                 level: 'error',
        //                 label: 'po_stat_1_1',
        //                 message: err
        //             })
        //             res.status(500).send(err);
        //         });
        //     }
        // } else {
        //     if (req.user.id == exist.t2_user) {
        //         res.status(200).send({
        //             err: "notAllowed"
        //         });
        //     } else {
        //         return models.purchase_order.update({
        //             status_t1_1: true,
        //             date_pending_1: new Date(),
        //             t2_user: req.user.id
        //         }, {
        //             where: {
        //                 id: req.params.po_id,
        //                 delete_req: {
        //                     [op.not]: true
        //                 }
        //             }
        //         }).then(po => {
        //             res.status(200).send(po);
        //         }).catch(err => {
        //             winston.error({
        //                 level: 'error',
        //                 label: 'po_stat_1_2',
        //                 message: err
        //             })
        //             res.status(500).send(err);
        //         });
        //     }
        // }
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'po_stat_1_3',
            message: err
        })
        res.status(500).send(err);
    })
}

//WORKING
//update po status to approve
exports.po_stat_2 = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'po_stat_2'
    })
    return models.purchase_order.update({
        status_t2: true,
        date_approve: new Date(),
        approver_user: req.user.id
    }, {
        where: {
            id: req.params.po_id
        }
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'po_stat_2',
            message: err
        })
        res.status(500).send(err);
    })
}

//decline po
exports.po_stat_decline = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'po_stat_decline'
    })
    return models.purchase_order.update({
        status_decline: true,
        date_decline: new Date(),
        decline_user: req.user.id,
        decline_reason: (req.body.poObj._decline_reason == null ? null : req.body.poObj._decline_reason)
    }, {
        where: {
            id: req.params.po_id
        }
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'po_stat_decline',
            message: err
        })
        res.status(500).send(err);
    })
}

exports.search_po = function (req, res, next) {
    let strSplit, in_str, in_department, in_branch;
    let strToken = false;
    let runSP;
    if (req.body.poObj._in_param_1) {
        strSplit = req.body.poObj._in_param_1.split('/');
        if (strSplit.length > 1) {
            in_str = strSplit[3]
            in_department = strSplit[1].toUpperCase()
            in_branch = strSplit[0].toUpperCase()
            strToken = true;
        }
    }

    if (strToken) {
        runSP = (req, res, next) => {
            return new Promise((resolve, reject) => {
                return db.sequelize
                    .query('SELECT * from F_SEARCH_PO(:a, :b, :c, :d, :e, :f, :g, :h, :i, :j)', {
                        replacements: {
                            a: parseInt(in_str), //in_str 
                            b: (req.body.poObj._in_param_2 == null ? null : req.body.poObj._in_param_2), //in_company,
                            c: (req.body.poObj._in_param_3 == null ? null : req.body.poObj._in_param_3), //in_date,
                            d: (req.body.poObj._in_param_4 == null ? null : parseInt(req.body.poObj._in_param_4)), //in_month
                            e: (req.body.poObj._in_param_5 == null ? null : parseInt(req.body.poObj._in_param_5)), //in_year
                            f: (req.body.poObj._in_param_6 == null ? null : req.body.poObj._in_param_6), //in_approve
                            g: in_department, //in_department
                            h: in_branch, //in_branch
                            i: parseInt(req.body.poObj._in_page) - 1,
                            j: parseInt(CONST.CONST_page_limit)
                        }
                    })
                    .then(data => {
                        resolve(data[0]);
                    }).catch(err => {
                        reject(err);
                    });
            })
        }
    } else {
        runSP = (req, res, next) => {
            return new Promise((resolve, reject) => {
                return db.sequelize
                    .query('SELECT * from F_SEARCH_PO(:a, :b, :c, :d, :e, :f, :g, :h, :i, :j)', {
                        replacements: {
                            a: (req.body.poObj._in_param_1 == null ? null : req.body.poObj._in_param_1), //in_str 
                            b: (req.body.poObj._in_param_2 == null ? null : req.body.poObj._in_param_2), //in_company,
                            c: (req.body.poObj._in_param_3 == null ? null : req.body.poObj._in_param_3), //in_date,
                            d: (req.body.poObj._in_param_4 == null ? null : parseInt(req.body.poObj._in_param_4)), //in_month
                            e: (req.body.poObj._in_param_5 == null ? null : parseInt(req.body.poObj._in_param_5)), //in_year
                            f: (req.body.poObj._in_param_6 == null ? null : req.body.poObj._in_param_6), //in_approve
                            g: (req.body.poObj._in_param_7 == null ? null : req.body.poObj._in_param_7.toUpperCase()), //in_department
                            h: (req.body.poObj._in_param_8 == null ? null : req.body.poObj._in_param_8.toUpperCase()), //in_branch
                            i: parseInt(req.body.poObj._in_page) - 1,
                            j: parseInt(CONST.CONST_page_limit)
                        }
                    })
                    .then(data => {
                        resolve(data[0]);
                    }).catch(err => {
                        reject(err);
                    });
            })
        }
    }

    return runSP(req, res, next).then(data => {
        winston.info({
            level: 'info',
            label: 'po',
            message: 'po_search'
        })
        let totalpage = (data[0] == null ? parseInt(1) : Math.ceil(parseInt(data[0].totalrecords) / CONST.CONST_page_limit));
        let result = [data, totalpage];
        res.send({
            result
        });
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'po_search',
            message: err
        })
        res.status(500).send(err);
    })
}