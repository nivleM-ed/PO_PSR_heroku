let models = require('../models');
var sequelize = require('sequelize');
var winston = require('../logs/winston');
var CONST = require('../const');
const op = sequelize.Op;
const db = require('../models/index');
let users = require('./user');

//WORKING  //send with pagination and total page number
exports.show_psr_page = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'psr',
        message: 'show_psr_page'
    })
    const limit = CONST.CONST_page_limit; //can be changed

    const psr_page = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.findAll({
                attributes: ['id', [models.sequelize.fn('CONCAT', models.sequelize.col('branch1.cd'), '/', models.sequelize.col('department1.cd'), '/PSR/', models.sequelize.col('psr.psr_no')), 'psr_no'], 'createdAt', ['status_t2', 'status']],
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: models.Users,
                    required: true,
                    as: 'create_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't2_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't3_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'approver_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'del_req_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.department,
                    required: true,
                    as: 'department1',
                    attributes: []
                },
                {
                    model: models.branch,
                    required: true,
                    as: 'branch1',
                    attributes: []
                }
                ]
            }).then(psr => {
                resolve(psr);
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'psr_show_psr_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    const total_page = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.count({}).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'psr_show_page_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([psr_page(req), total_page(req)])
        .then(result => {
            res.status(200).send({
                result
            });
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'psr_show_page_promise',
                message: err
            })
            res.status(500).send(err);
        })
}

exports.show_own_psr_page = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'psr',
        message: 'show_own_psr_page'
    })
    const limit = CONST.CONST_page_limit; //can be changed

    const psr_own_page = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.findAll({
                attributes: ['id', [models.sequelize.fn('CONCAT', models.sequelize.col('branch1.cd'), '/', models.sequelize.col('department1.cd'), '/PSR/', models.sequelize.col('psr.psr_no')), 'psr_no'], 'createdAt', 'purchase_class', 'purchase_typ', 'purchase_just', 'cost_typ', 'date_req', 'project_title', 'vessel_code', 'delv', 'psr_desc', 'decline_reason', 'delete_req', 'status_t1_1', 'status_t1_2', 'status_t2', 'status_decline', 'date_pending_1', 'date_pending_2', 'date_approve', 'date_decline'],
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: models.Users,
                    required: true,
                    as: 'create_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't2_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't3_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'approver_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'del_req_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.department,
                    required: true,
                    as: 'department1',
                    attributes: []
                },
                {
                    model: models.branch,
                    required: true,
                    as: 'branch1',
                    attributes: []
                }
                ],
                where: {
                    create_user: req.user.id
                }
            }).then(psr => {
                resolve(psr);
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'psr_show_own_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    const total_own_page = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.count({
                where: {
                    create_user: req.user.id
                }
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'psr_show_own_page_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([psr_own_page(req), total_own_page(req)])
        .then(result => {
            res.status(200).send({
                result
            });
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'psr_show_own_page_promise',
                message: err
            })
            res.status(500).send(err);
        })
}

//WORKING
//find psr_no
exports.find = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'psr',
        message: 'find'
    })

    return models.psr.findOne({
        attributes: ['id', [models.sequelize.fn('CONCAT', models.sequelize.col('branch1.cd'), '/', models.sequelize.col('department1.cd'), '/PSR/', models.sequelize.col('psr.psr_no')), 'psr_no'], 'createdAt', ['status_t2', 'status',]],
        include: [{
            model: models.Users,
            required: true,
            as: 'create_user_psr',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 't2_user_psr',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 't3_user_psr',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 'approver_psr',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 'del_req_user_psr',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.department,
            required: true,
            as: 'department1',
            attributes: []
        },
        {
            model: models.branch,
            required: true,
            as: 'branch1',
            attributes: []
        }
        ],
        where: {
            psr_no: parseInt(req.params.psr_no)
        }
    }).then(psr => {
        res.status(200).send(psr)
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'psr_find',
            message: err
        })
        res.status(500).send(err);
    })
}

exports.approved_nopage = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'psr',
        message: 'approved_np'
    })

    return models.psr.findAll({
        attributes: ['id', [models.sequelize.fn('CONCAT', models.sequelize.col('branch1.cd'), '/', models.sequelize.col('department1.cd'), '/PSR/', models.sequelize.col('psr.psr_no')), 'psr_no'], 'createdAt'],
        include: [{
            model: models.Users,
            required: true,
            as: 'create_user_psr',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 't2_user_psr',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 't3_user_psr',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 'approver_psr',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 'del_req_user_psr',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.department,
            required: true,
            as: 'department1',
            attributes: []
        },
        {
            model: models.branch,
            required: true,
            as: 'branch1',
            attributes: []
        }
        ],
        where: {
            delete_req: false,
            status_t1_1: true,
            status_t1_2: true,
            status_t2: true,
            status_decline: false
        }
    }).then(psr => {
        res.status(200).send(psr)
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'psr_approved_np',
            message: err
        })
        res.status(500).send(err);
    })
}

//get psr waiting to be accepted
exports.get_approved = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'psr',
        message: 'get_approved'
    })
    const limit = CONST.CONST_page_limit; //can be changed

    const getApproved = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.findAll({
                attributes: ['id', [models.sequelize.fn('CONCAT', models.sequelize.col('branch1.cd'), '/', models.sequelize.col('department1.cd'), '/PSR/', models.sequelize.col('psr.psr_no')), 'psr_no'], 'createdAt'],
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: models.Users,
                    required: true,
                    as: 'create_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't2_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't3_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'approver_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'del_req_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.department,
                    required: true,
                    as: 'department1',
                    attributes: []
                },
                {
                    model: models.branch,
                    required: true,
                    as: 'branch1',
                    attributes: []
                }
                ],
                where: {
                    delete_req: false,
                    status_t1_1: true,
                    status_t1_2: true,
                    status_t2: true,
                    status_decline: false
                }
            }).then(psr => {
                resolve(psr)
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'psr_get_approved',
                    message: err
                })
                reject(err);
            })
        })
    }

    const getApprovedTotal = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.count({
                where: {
                    delete_req: false,
                    status_t1_1: true,
                    status_t1_2: true,
                    status_t2: true,
                    status_decline: false
                }
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'psr_get_approved_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([getApproved(req), getApprovedTotal(req)])
        .then(result => {
            res.status(200).send({
                result
            });
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'psr_get_approved_promise',
                message: err
            })
            res.status(500).send(err);
        })
}

//get psr waiting to be accepted
exports.get_submits = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'psr',
        message: 'get_submits'
    })
    const limit = CONST.CONST_page_limit; //can be changed
    let departmentBranch, userBranch, userDep;

    const getSubmits = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.findAll({
                attributes: ['id', [models.sequelize.fn('CONCAT', models.sequelize.col('branch1.cd'), '/', models.sequelize.col('department1.cd'), '/PSR/', models.sequelize.col('psr.psr_no')), 'psr_no'], 'createdAt', ['status_t2', 'status']],
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: models.Users,
                    required: true,
                    as: 'create_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't2_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't3_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'approver_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'del_req_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.department,
                    required: true,
                    as: 'department1',
                    attributes: []
                },
                {
                    model: models.branch,
                    required: true,
                    as: 'branch1',
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
                    delete_req: false,
                    status_t2: false,
                    status_decline: false,
                    '$branch1.cd$': userBranch,
                    '$department1.cd$': userDep
                } //t2_user_1 != req.user.id || t2_user_1 = null 
            }).then(psr => {
                resolve(psr)
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'psr_get_submits',
                    message: err
                })
                reject(err);
            })
        })
    }

    const getSubmitsTotal = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.count({
                include: [{
                    model: models.department,
                    required: true,
                    as: 'department1',
                    attributes: []
                },
                {
                    model: models.branch,
                    required: true,
                    as: 'branch1',
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
                    '$branch1.cd$': userBranch,
                    '$department1.cd$': userDep
                } //t2_user_1 != req.user.id || t2_user_1 = null 
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'psr_get_submits_total_page',
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
                    label: 'psr_get_submits_promise',
                    message: err
                })
                res.status(500).send(err);
            })
    });
}


//WORKING
//get psr waiting to be approved
exports.get_pending = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'psr',
        message: 'get_pending'
    })
    const limit = CONST.CONST_page_limit; //can be changed

    const getPending = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.findAll({
                attributes: ['id', [models.sequelize.fn('CONCAT', models.sequelize.col('branch1.cd'), '/', models.sequelize.col('department1.cd'), '/PSR/', models.sequelize.col('psr.psr_no')), 'psr_no'], 'createdAt', ['status_t2', 'status']],
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
                    as: 'create_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't2_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't3_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'approver_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'del_req_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.department,
                    required: true,
                    as: 'department1',
                    attributes: []
                },
                {
                    model: models.branch,
                    required: true,
                    as: 'branch1',
                }
                ],
            }).then(psr => {
                resolve(psr)
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'psr_get_pending',
                    message: err
                })
                reject(err);
            })
        })
    }

    const getPendingTotal = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.count({
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
                    label: 'psr_get_pending_total_page',
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
                label: 'psr_get_pending_promise',
                message: err
            })
            res.status(500).send(err);
        })
}

//WORKING
//get psr waiting to be approved
exports.get_del_req = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'psr',
        message: 'get_del_req'
    })
    const limit = CONST.CONST_page_limit; //can be changed

    const getDel = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.findAll({
                attributes: ['id', [models.sequelize.fn('CONCAT', models.sequelize.col('branch1.cd'), '/', models.sequelize.col('department1.cd'), '/PSR/', models.sequelize.col('psrr.psr_no')), 'psr_no'], 'createdAt', ['status_t2', 'status']],
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
                    as: 'create_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't2_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't3_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'approver_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'del_req_user_psr',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.department,
                    required: true,
                    as: 'department1',
                    attributes: []
                },
                {
                    model: models.branch,
                    required: true,
                    as: 'branch1',
                    attributes: []
                }
                ],
            }).then(psr => {
                resolve(psr)
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'psr_get_delreq',
                    message: err
                })
                reject(err);
            })
        })
    }

    const getDelTotal = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.count({
                where: {
                    delete_req: true
                }
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'psr_get_delreq_total_page',
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
                label: 'psr_get_delreq_promise',
                message: err
            })
            res.status(500).send(err);
        })

}

//WORKING
//change to SP. Update Date: 18/2/2020
exports.psr_add = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'psr',
        message: 'add'
    })
    return db.sequelize
        .query('SELECT * FROM F_ADD_PSR(:purchase_class, :purchase_typ, :purchase_just, :cost_typ, :date_req, :project_title, :vessel_code, :delv, :psr_desc, :department, :branch, :create_user)', {
            replacements: {
                purchase_class: (req.body.psrObj._purchase_class == null ? null : req.body.psrObj._purchase_class),
                purchase_typ: (req.body.psrObj._purchase_typ == null ? null : req.body.psrObj._purchase_typ),
                purchase_just: (req.body.psrObj._purchase_just == null ? null : req.body.psrObj._purchase_just),
                cost_typ: (req.body.psrObj._cost_typ == null ? null : req.body.psrObj._cost_typ),
                date_req: (req.body.psrObj._date_req == null ? null : req.body.psrObj._date_req),
                project_title: (req.body.psrObj._project_title == null ? null : req.body.psrObj._project_title),
                vessel_code: (req.body.psrObj._vessel_code == null ? null : req.body.psrObj._vessel_code),
                delv: (req.body.psrObj._delv == null ? null : req.body.psrObj._delv),
                psr_desc: (req.body.psrObj._psr_desc == null ? null : JSON.stringify(req.body.psrObj._psr_desc)),
                department: (req.body.psrObj._department == null ? null : req.body.psrObj._department.toUpperCase()),
                branch: (req.body.psrObj._branch == null ? null : req.body.psrObj._branch.toUpperCase()),
                create_user: req.user.id
            }
        }).then(psr => {
            res.status(201).send(psr[0][0])
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'psr_add',
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
        label: 'psr',
        message: 'report'
    })

    return models.psr.findOne({
        attributes: ['id', [models.sequelize.fn('CONCAT', models.sequelize.col('branch1.cd'), '/', models.sequelize.col('department1.cd'), '/PSR/', models.sequelize.col('psr.psr_no')), 'psr_no'], 'createdAt', 'purchase_class', 'purchase_typ', 'purchase_just', 'cost_typ', 'date_req', 'project_title', 'vessel_code', 'delv', 'psr_desc', 'decline_reason', 'delete_req', 'status_t1_1', 'status_t1_2', 'status_t2', 'status_decline', 'date_pending_1', 'date_pending_2', 'date_approve', 'date_decline'],
        include: [{
            model: models.Users,
            required: true,
            as: 'create_user_psr',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 't2_user_psr',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 't3_user_psr',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 'approver_psr',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.Users,
            required: false,
            as: 'del_req_user_psr',
            attributes: ['username', 'firstname', 'lastname']
        },
        {
            model: models.department,
            required: true,
            as: 'department1',
            attributes: []
        },
        {
            model: models.branch,
            required: true,
            as: 'branch1',
            attributes: []
        }
        ],
        where: {
            id: req.params.psr_id
        }
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'psr_report',
            message: err
        })
        res.status(500).send(err);
    })

};

//request delete
exports.psr_req_del = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'psr',
        message: 'psr_del_req'
    })
    return models.psr.update({
        delete_req: true,
        del_user: req.user.id
    }, {
        where: {
            id: req.params.psr_id,

        }
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'psr_del_req',
            message: err
        })
        res.status(500).send(err);
    })
}

//WORKING
//approve delete psr
exports.psr_del = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'psr',
        message: 'psr_del'
    })
    return models.psr.destroy({
        where: {
            id: req.params.psr_id,
            delete_req: true
        }
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'psr_del',
            message: err
        })
        res.status(500).send(err);
    })
}

//decline delete request
exports.psr_decline_del = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'psr',
        message: 'psr_del_decline'
    })
    return models.psr.update({
        delete_req: false,
        del_user: null
    }, {
        where: {
            id: req.params.psr_id,
        }
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'psr_del_decline',
            message: err
        })
        res.status(500).send(err);
    })
}


//WORKING
//update psr
exports.psr_upd = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'psr',
        message: 'psr_upd'
    })
    return models.psr.update({
        purchase_class: req.body.psrObj._purchase_class,
        purchase_typ: req.body.psrObj._purchase_typ,
        purchase_just: req.body.psrObj._purchase_just,
        cost_typ: req.body.psrObj._cost_typ,
        date_req: req.body.psrObj._date_req,
        project_title: req.body.psrObj._project_title,
        vessel_code: req.body.psrObj._vessel_code,
        delv: req.body.psrObj._delv,
        psr_desc: req.body.psrObj._psr_desc
    }, {
        where: {
            id: req.params.psr_id
        }
        //more data to be added
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'psr_upd',
            message: err
        })
        res.status(500).send(err);
    })
}

//WORKING
//update psr status to pending
exports.psr_stat_1 = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'psr',
        message: 'psr_stat_1'
    })
    return models.psr.findOne({
        where: {
            id: req.params.psr_id
        }
    }).then(exist => {
        if (req.user.t2) {
            if (req.user.id == exist.t2_user) {
                res.status(200).send({
                    err: "notAllowed"
                });
            } else {
                return models.psr.update({
                    status_t1_1: true,
                    date_pending_1: new Date(),
                    t2_user: req.user.id
                }, {
                    where: {
                        id: req.params.psr_id,
                        delete_req: {
                            [op.not]: true
                        }
                    }
                }).then(psr => {
                    res.status(200).send(psr);
                }).catch(err => {
                    winston.error({
                        level: 'error',
                        label: 'psr_stat_1_2',
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
                return models.psr.update({
                    status_t1_2: true,
                    date_pending_2: new Date(),
                    t3_user: req.user.id
                }, {
                    where: {
                        id: req.params.psr_id,
                        delete_req: {
                            [op.not]: true
                        }
                    }
                }).then(psr => {
                    res.status(200).send(psr);
                }).catch(err => {
                    winston.error({
                        level: 'error',
                        label: 'psr_stat_1_1',
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
        //         return models.psr.update({
        //             status_t1_2: true,
        //             date_pending_2: new Date(),
        //             t3_user: req.user.id
        //         }, {
        //             where: {
        //                 id: req.params.psr_id,
        //                 delete_req: {
        //                     [op.not]: true
        //                 }
        //             }
        //         }).then(psr => {
        //             res.status(200).send(psr);
        //         }).catch(err => {
        //             winston.error({
        //                 level: 'error',
        //                 label: 'psr_stat_1_1',
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
        //         return models.psr.update({
        //             status_t1_1: true,
        //             date_pending_1: new Date(),
        //             t2_user: req.user.id
        //         }, {
        //             where: {
        //                 id: req.params.psr_id,
        //                 delete_req: {
        //                     [op.not]: true
        //                 }
        //             }
        //         }).then(psr => {
        //             res.status(200).send(psr);
        //         }).catch(err => {
        //             winston.error({
        //                 level: 'error',
        //                 label: 'psr_stat_1_2',
        //                 message: err
        //             })
        //             res.status(500).send(err);
        //         });
        //     }
        // }
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'psr_stat_1_3',
            message: err
        })
        res.status(500).send(err);
    })
}

//WORKING
//update psr status to approve
exports.psr_stat_2 = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'psr',
        message: 'psr_stat_2'
    })
    return models.psr.update({
        status_t2: true,
        date_approve: new Date(),
        approver_user: req.user.id
    }, {
        where: {
            id: req.params.psr_id
        }
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'psr_stat_2',
            message: err
        })
        res.status(500).send(err);
    })
}

//decline psr
exports.psr_stat_decline = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'psr',
        message: 'psr_stat_decline'
    })
    return models.psr.update({
        status_decline: true,
        date_decline: new Date(),
        decline_user: req.user.id,
        decline_reason: (req.body.psrObj._decline_reason == null ? null : req.body.psrObj._decline_reason)
    }, {
        where: {
            id: req.params.psr_id
        }
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'psr_stat_decline',
            message: err
        })
        res.status(500).send(err);
    })
}

exports.search_psr = function (req, res, next) {
    let strSplit, in_str, in_department, in_branch;
    let strToken = false;
    let runSP;
    if (req.body.psrObj._in_param_1) {
        strSplit = req.body.psrObj._in_param_1.split('/');
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
                    .query('SELECT * from F_SEARCH_PSR(:a, :b, :c, :d, :e, :f, :g, :h, :i)', {
                        replacements: {
                            a: parseInt(in_str), //in_str 
                            b: (req.body.psrObj._in_param_2 == null ? null : req.body.psrObj._in_param_2), //in_date
                            c: (req.body.psrObj._in_param_3 == null ? null : parseInt(req.body.psrObj._in_param_3)), //in_month
                            d: (req.body.psrObj._in_param_4 == null ? null : parseInt(req.body.psrObj._in_param_4)), //in_year
                            e: (req.body.psrObj._in_param_5 == null ? null : req.body.psrObj._in_param_5), //in_approve
                            f: in_department, //in_department
                            g: in_branch, //in_branch
                            h: parseInt(req.body.psrObj._in_page) - 1,
                            i: parseInt(CONST.CONST_page_limit)
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
                    .query('SELECT * from F_SEARCH_PSR(:a, :b, :c, :d, :e, :f, :g, :h, :i)', {
                        replacements: {
                            a: (req.body.psrObj._in_param_1 == null ? null : req.body.psrObj._in_param_1), //in_str 
                            b: (req.body.psrObj._in_param_2 == null ? null : req.body.psrObj._in_param_2), //in_date
                            c: (req.body.psrObj._in_param_3 == null ? null : parseInt(req.body.psrObj._in_param_3)), //in_month
                            d: (req.body.psrObj._in_param_4 == null ? null : parseInt(req.body.psrObj._in_param_4)), //in_year
                            e: (req.body.psrObj._in_param_5 == null ? null : req.body.psrObj._in_param_5), //in_approve
                            f: (req.body.psrObj._in_param_6 == null ? null : req.body.psrObj._in_param_6.toUpperCase()), //in_department
                            g: (req.body.psrObj._in_param_7 == null ? null : req.body.psrObj._in_param_7.toUpperCase()), //in_branch
                            h: parseInt(req.body.psrObj._in_page) - 1,
                            i: parseInt(CONST.CONST_page_limit)
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
            label: 'psr',
            message: 'psr_search'
        })
        let totalpage = (data[0] == null ? parseInt(1) : Math.ceil(parseInt(data[0].totalrecords) / CONST.CONST_page_limit));
        let result = [data, totalpage];
        res.send({
            result
        });
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'psr_search',
            message: err
        })
        res.status(500).send(err);
    })

}