let models = require('../models');
let bcrypt = require('bcrypt');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
const {
    isEmpty
} = require('lodash');
const {
    validateUser
} = require('../validators/signup');
var sequelize = require('sequelize');
const op = sequelize.Op;
var winston = require('../logs/winston');

const generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

const verifyUserLog = (req, res, next) => {
    winston.info({
        level: 'info',
        label: 'user',
        message: 'verify_user_log'
    })

    return new Promise((resolve, reject) => {
        passport.authenticate('local', {
            session: true
        }, function (err, user, info) {
            if (err) {
                res.send(err);
            } else if (!user) {
                res.send(info);
            } else {
                req.logIn(user, function (err) {
                    if (err) {
                        winston.error({
                            level: 'error',
                            label: 'user_login',
                            message: err
                        })
                        reject(err)
                    }
                    resolve(user);
                })
            }
        })(req, res, next);
    })
}

//login
exports.login = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'user',
        message: 'login'
    })

    verifyUserLog(req, res, next)
        .then(user => {
            if (user.is_admin) {
                res.send(user)
            } else {
                return models.Users.findOne({
                    attributes: ['id', 'username', 'firstname', 'lastname', 'email', 'contact_no', 'address_1', 'address_2', 'address_3', 'address_4', 'acct_t', 't1', 't2', 't3', 't4', 'is_admin'],
                    include: [
                        {
                            model: models.department,
                            required: false,
                            as: 'department',
                            attributes: ['cd']
                        },
                        {
                            model: models.branch,
                            required: true,
                            as: 'branch',
                            attributes: ['cd']
                        }
                    ],
                    where: {
                        id: user.id
                    }
                }).then(users => {
                    res.status(200).send(users)
                }).catch(err => {
                    winston.error({
                        level: 'error',
                        label: 'login',
                        message: err
                    })
                    res.status(500).send(err);
                })
            }
        }).catch(err => {
            res.status(500).send(err);
        })
}

//check if logged in
exports.check_logged = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'user',
        message: 'check_logged'
    })
    try {
        if (req.user)
            res.status(200).send({
                id: req.user.id
            });
        else {
            winston.info({
                level: 'info',
                label: 'check_logged',
                message: 'noCookie'
            })
            res.send({
                err: "noCookie"
            });
        }
    } catch (err) {
        winston.error({
            level: 'error',
            label: 'check_logged',
            message: err
        })
        res.send({
            err: "systemErr"
        })
    }
}

//logout
exports.logout = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'user',
        message: 'logout'
    })
    req.logout();
    req.session.destroy();
    res.status(200).send({
        logout: "logout"
    });
}

//search
exports.search = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'user',
        message: 'search'
    })

    return models.Users.findAll({
        attributes: ['id', 'username', 'firstname', 'lastname'],
        where: {
            username: {
                [op.like]: '%' + req.body.userObj._in_param_1.toLowerCase() + '%'
            }
        }
    }).then(users => {
        res.status(200).send(users);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'user_search',
            message: err
        })
        res.status(500).send(err);
    })
}

//search
exports.get_all_username = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'user',
        message: 'get_all_username'
    })

    return models.Users.findAll({
        attributes: ['id', 'username'],
        where: {
            [op.or]: [{
                is_admin: {
                    [op.not]: true
                },
                id: {
                    [op.not]: req.user.id
                }
            }]
        }
    }).then(users => {
        res.status(200).send(users);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'get_all_username',
            message: err
        })
        res.status(500).send(err);
    })
}

exports.reset_password = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'user',
        message: 'reset_password'
    })

    if (req.params.user_id == req.user.id) {
        return models.Users.findOne({
            where: {
                id: req.user.id
            }
        }).then(user2 => {
            if (bcrypt.compareSync(req.body.userObj._in_param_1, user2.password)) {
                if (req.body.userObj._in_param_2 == req.body.userObj._in_param_3) {
                    return models.Users.update({
                        password: generateHash(req.body.userObj._in_param_2)
                    }, {
                        where: {
                            id: req.user.id
                        }
                    }).then(user => {
                        res.status(200).send(user);
                    }).catch(err => {
                        winston.error({
                            level: 'error',
                            label: 'reset_password',
                            message: err
                        });
                        res.status(500).send(err);
                    });
                } else {
                    res.send({
                        err: "repeat wrong password"
                    });
                }
            } else {
                res.send({
                    err: "password wrong"
                })
            }
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'reset_password_validate',
                message: err
            });
            res.status(500).send(err);
        })
    }
}

exports.getDepartmentBranch = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'user',
        message: 'department_branch'
    })

    return new Promise((resolve, reject) => {
        return models.Users.findOne({
            attributes: [],
            where: {
                id: req.user.id
            },
            include: [
                {
                    model: models.department,
                    required: false,
                    as: 'department',
                    attributes: ['cd']
                },
                {
                    model: models.branch,
                    required: false,
                    as: 'branch',
                    attributes: ['cd']
                }
            ]
        }).then(userDetail => {
            resolve(userDetail.dataValues)
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'department_branch',
                message: err
            });
            reject(err);
        })
    })
}