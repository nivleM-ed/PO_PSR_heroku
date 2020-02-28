var winston = require('../logs/winston');
let createError = require('http-errors');

exports.isLoggedIn = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'Authenticate',
        message: 'LoggedIn'
    })

    try {
        if (req.user)
            next();
        else {
            winston.info({
                level: 'info',
                label: 'Authenticate_logged_in',
                message: 'notLoggedIn'
            })
            res.send({
                err: "notLoggedIn"
            });
        }
    } catch (error) {
        winston.error({
            level: 'error',
            label: 'Authenticate_logged_in',
            message: error
        })
        res.send({
            err: "systemErr"
        })
    }
}

exports.auth_no_t1 = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'Authenticate',
        message: 'auth_no_t1'
    })
    try {
        if (req.user && req.user.t1 != true)
            next();
        else {
            winston.info({
                level: 'info',
                label: 'Authenticate_auth_no_t1',
                message: 'noPermission'
            })
            res.send({
                err: "noPermission"
            });
        }
    } catch (error) {
        winston.error({
            level: 'error',
            label: 'Authenticate_auth_no_t1',
            message: error
        })
        res.send({
            err: "systemErr"
        })
    }
}

exports.auth_no_t1_t2 = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'Authenticate',
        message: 'auth_no_t1_t2'
    })
    try {
        if (req.user && req.user.t1 != true && req.user.t2 != true && req.user.t3 != true)
            next();
        else {
            winston.info({
                level: 'info',
                label: 'Authenticate_auth_no_t1_t2',
                message: 'noPermission'
            })
            res.send({
                err: "noPermission"
            });
        }
    } catch (error) {
        winston.error({
            level: 'error',
            label: 'Authenticate_auth_no_t1_t2',
            message: error
        })
        res.send({
            err: "systemErr"
        })
    }
}

exports.auth_admin = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'Authenticate',
        message: 'admin'
    })
    try {
        if (req.user && req.user.is_admin == true)
            next();
        else {
            winston.info({
                level: 'error',
                label: 'Authenticate_auth_admin',
                message: 'noPermission'
            })
            res.send({
                err: "noPermission"
            });
        }
    } catch (error) {
        winston.error({
            level: 'error',
            label: 'Authenticate_auth_admin',
            message: error
        })
        res.send({
            err: "systemErr"
        })
    }

}