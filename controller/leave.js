let models = require('../models');
var sequelize = require('sequelize');
// var mydb = new sequelize('database', 'username', 'password');
const db = require('../models/index');
var winston = require('../logs/winston');
var CONST = require('../const');
const op = sequelize.Op;

//show all leaves WITH pagination
exports.show_leave_page = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'leave',
        message: 'show_leave_page'
    })

    const limit = CONST.CONST_page_limit;

    const leave_page = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.leave.findAll({
                // attributes: ['*'],
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                        model: models.Users,
                        required: true,
                        as: 'user_leave',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'approver_leave',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'replace_user',
                        attributes: ['username', 'firstname', 'lastname']
                    }
                ],
                where: {
                    user_id: {
                        [op.not]: req.user.id
                    },
                    status: false,
                    decline_status: false
                }
            }).then(leave => {
                resolve(leave);
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'leave_show_all_leave',
                    message: err
                })
                reject(err);
            })
        })
    }

    const totalLeave = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.leave.count({
                where: {
                    user_id: {
                        [op.not]: req.user.id
                    },
                    status: false,
                    decline_status: false
                }
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'leave_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([leave_page(req, res), totalLeave()])
        .then(result => {
            res.status(200).send(result);
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'leave_page_promise',
                message: err
            })
            res.status(500).send(err);
        })

}


exports.show_own_leave = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'leave',
        message: 'show_own_leave'
    })
    const limit = CONST.CONST_page_limit;

    const leave_page = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.leave.findAll({
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                        model: models.Users,
                        required: true,
                        as: 'user_leave',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'approver_leave',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'replace_user',
                        attributes: ['username', 'firstname', 'lastname']
                    }
                ],
                where: {
                    user_id: req.user.id
                }
            }).then(leave => {
                resolve(leave);
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'leave_show_own_leave',
                    message: err
                })
                reject(err);
            })
        })
    }

    const totalLeave = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.leave.count({
                where: {
                    user_id: req.user.id
                }
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'leave_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([leave_page(req), totalLeave(req)])
        .then(result => {
            res.status(200).send(result);
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'leave_page_promise',
                message: err
            })
            res.status(500).send(err);
        })
}

exports.show_pending_leave = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'leave',
        message: 'show_pending_leave'
    })
    const limit = CONST.CONST_page_limit;

    const leave_page = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.leave.findAll({
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                        model: models.Users,
                        required: true,
                        as: 'user_leave',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'approver_leave',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'replace_user',
                        attributes: ['username', 'firstname', 'lastname']
                    }
                ]
            }, {
                where: {
                    user_id: {
                        [op.not]: req.user.id
                    },
                    status: false
                }
            }).then(leave => {
                resolve(leave);
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'leave_show_pending_leave',
                    message: err
                })
                reject(err);
            })
        })
    }

    const totalLeave = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.leave.count({
                where: {
                    user_id: {
                        [op.not]: req.user.id
                    }
                }
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'leave_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([leave_page(req), totalLeave(req)])
        .then(result => {
            res.status(200).send(result);
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'leave_pending_page_promise',
                message: err
            })
            res.status(500).send(err);
        })
}

//show all leaves WITHOUT pagination
exports.show_all_leave = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'leave',
        message: 'show_all_leave'
    })

    return models.leave.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        include: [{
                model: models.Users,
                required: true,
                as: 'user_leave',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 'approver_leave',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 'replace_user',
                attributes: ['username', 'firstname', 'lastname']
            }
        ],
        where: {
            user_id: {
                [op.not]: req.user.id
            },
            status: false,
            decline_status: false
        }
    }).then(leave => {
        res.status(200).send(leave);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'leave_show_all_leave',
            message: err
        })
        res.status(500).send(err);
    })
}

exports.report = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'leave',
        message: 'report'
    })


    return models.leave.findOne({
        include: [{
                model: models.Users,
                required: true,
                as: 'user_leave',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 'approver_leave',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 'replace_user',
                attributes: ['username', 'firstname', 'lastname']
            }
        ],
        where: {
            id: req.params.leave_id
        }
    }).then(leave => {
        res.status(200).send(leave);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'leave_report',
            message: err
        })
        res.status(500).send(err);
    })
}

exports.add_leave = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'leave',
        message: 'leave_add_leave'
    })
    return models.leave.create({
        user_id: req.user.id,
        date_from: req.body.leaveObj._date_from,
        date_to: req.body.leaveObj._date_to,
        reason: req.body.leaveObj._reason,
        emergency_contact: req.body.leaveObj._emergency_contact,
        replace_id: req.body.leaveObj._replace_id
    }).then(leave => {
        res.status(201).send(leave)
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'leave_add_leave',
            message: err
        })
        res.status(500).send(err);
    })
}

exports.del_leave = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'leave',
        message: 'del_leave'
    })
    return models.leave.destroy({
        where: {
            id: req.params.leave_id
        }
    }).then(deleted => {
        res.status(200).send("deleted");
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'leave_del_leave',
            message: err
        })
        res.status(500).send(err);
    })
}

exports.del_req_leave = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'leave',
        message: 'del_req_leave'
    })
    return models.leave.update({
        del_req: true,
        del_reason: req.body.leaveObj._del_reason
    }, {
        where: {
            id: req.params.leave_id,
            user_id: req.user.id
        }
    }).then(leave => {
        res.status(200).send(leave);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'leave_del_leave',
            message: err
        })
        res.status(500).send(err);
    })
}

exports.approve_leave = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'leave',
        message: 'approve_leave'
    })
    return models.leave.update({
        status: true,
        approver_id: req.user.id,
        date_approve: new Date()
    }, {
        where: {
            id: req.params.leave_id
        }
    }).then(leave => {
        res.status(200).send(leave);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'leave_approve_leave',
            message: err
        })
        res.status(500).send(err);
    })
}

exports.decline_leave = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'leave',
        message: 'decline_leave'
    })
    return models.leave.update({
        decline_status: true,
        decline_id: req.user.id,
        date_decline: new Date()
    }, {
        where: {
            id: req.params.leave_id
        }
    }).then(leave => {
        res.status(200).send(leave);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'leave_decline_leave',
            message: err
        })
        res.status(500).send(err);
    })
}

exports.upd_leave = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'leave',
        message: 'upd_leave'
    })
    return models.leave.update({
        date_from: req.body.leaveObj._date_from,
        date_to: req.body.leaveObj._date_to,
        reason: req.body.leaveObj._reason,
    }, {
        where: {
            id: req.params.leave_id
        }
    }).then(leave => {
        res.status(200).send(leave);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'leave_upd_leave',
            message: err
        })
        res.status(500).send(err);
    })
}

exports.checkDuplicateDate = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'leave',
        message: 'duplicatedate_leave'
    })

    let checkDup = new Promise((resolve, reject) => {
        return models.leave.count({
            where: {
                user_id: req.user.id,
                [op.or]: [{
                        date_from: req.body.leaveObj._date_from,
                        date_to: req.body.leaveObj._date_to,
                    },
                    {
                        date_from: req.body.leaveObj._date_to,
                        date_to: req.body.leaveObj._date_from
                    }
                ]
            }
        }).then(total => {
            resolve(Math.ceil(total));
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'duplicatedate_leave',
                message: err
            })
            reject(err);
        })
    })

    checkDup.then(count => {
        if (count > 0) {
            res.send({
                err: "dataExist"
            });
        } else {
            next();
        }
    }).catch(err => {
        res.status(500).send(err);
    })
}

// exports.search_user = function (req, res, next) {
//     winston.info({
//         level: 'info',
//         label: 'leave',
//         message: 'search_user'
//     })
//     return models.leave.findAll({
//         date_from: req.body.date_from,
//         date_to: req.body.date_to,
//         reason: req.body.reason
//     }, {
//         where: {
//             id: req.params.leave_id
//         }
//     }).then(leave => {
//         res.status(200).send(leave);
//     }).catch(err => {
//         winston.error({
//             level: 'error',
//             label: 'leave_upd_leave',
//             message: err
//         })
//         res.status(500).send(err);
//     })
// }

exports.search_leave = function (req, res, next) {
    const runSP = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return db.sequelize
                .query('SELECT * from F_SEARCH_LEAVE(:a, :b, :c, :d)', {
                    replacements: {
                        a: (req.body.leaveObj._in_param_1 == null ? null : req.body.leaveObj._in_param_1), //in_str 
                        b: (req.body.leaveObj._in_param_2 == null ? null : req.body.leaveObj._in_param_2), //in_date,
                        c: parseInt(req.body.leaveObj._in_page) - 1,
                        d: CONST.CONST_page_limit
                    }
                })
                .then(data => {
                    resolve(data[0]);
                }).catch(err => {
                    reject(err);
                });
        })
    }

    return runSP(req, res, next).then(data => {
        winston.info({
            level: 'info',
            label: 'leave',
            message: 'leave_search'
        })
        let totalpage = (data[0] == null ? parseInt(1) : Math.ceil(parseInt(data[0].totalrecords) / CONST.CONST_page_limit));
        let result = [data, totalpage];
        res.send({
            result
        });
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'leave_search',
            message: err
        })
        res.status(500).send(err);
    })

}