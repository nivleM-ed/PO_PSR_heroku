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
const {
    dbJoin
} = require('../dbJoin');
var winston = require('../logs/winston');
const db = require('../models/index');

const generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

function password_generator(len) {
    var length = (len) ? (len) : (10);
    var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
    var numeric = '0123456789';
    var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    var password = "";
    var character = "";
    var crunch = true;
    while (password.length < length) {
        entity1 = Math.ceil(string.length * Math.random() * Math.random());
        entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
        entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
        hold = string.charAt(entity1);
        hold = (password.length % 2 == 0) ? (hold.toUpperCase()) : (hold);
        character += hold;
        character += numeric.charAt(entity2);
        character += punctuation.charAt(entity3);
        password = character;
    }
    password = password.split('').sort(function () {
        return 0.5 - Math.random()
    }).join('');
    return password.substr(0, len);
}

//get all the users for main page
exports.get_all_user = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'Admin',
        message: 'get_all_user'
    })
    return models.Users.findAll({
        // attributes: ['username', 'firstname', 'lastname'],
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
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(user => {
        res.status(200).send(user)
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'Admin_get_all_user',
            message: err
        })
        res.status(500).send(err);
    })
}

exports.get_user = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'Admin',
        message: 'get_user'
    })
    return models.Users.findOne({
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
            id: req.params.user_id
        }
    }).then(users => {
        res.status(200).send(users)
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'Admin_get_user',
            message: err
        })
        res.status(500).send(err);
    })
}

//NOT FOR FINAL PRODUCT
//add new admin into database
//default: admin, password
exports.add_admin = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'Admin',
        message: 'add_admin'
    })
    let errors = {};
    return validateUser(errors, req).then(errors => {
        if (!isEmpty(errors)) {
            res.send(errors);
        } else {
            newUser = models.Users.build({
                username: req.body.userObj._username,
                password: generateHash(req.body.userObj._password),
                is_admin: true,
            });
            return newUser.save().then(result => {
                res.status(200).send();
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'Admin_add_admin',
                    message: err
                })
                res.status(500).send(err);
            })
        }
    })
}

//add new user into database
exports.add_user = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'Admin',
        message: 'add_user'
    })
    let errors = {};
    return validateUser(errors, req).then(errors => {
        if (!isEmpty(errors)) {
            res.send(errors);
        } else { //change to SP. Update Date: 18/2/2020
            return db.sequelize
                .query('SELECT * FROM F_ADD_USR(:username, :password, :firstname, :lastname, :email, :department, :branch, :contact_no, :address_1, :address_2, :address_3, :address_4, :t1, :t2, :t3, :t4, :acct_t, :is_admin)', {
                    replacements: {
                        username: (req.body.userObj._username == null ? null : req.body.userObj._username),
                        password: (req.body.userObj._password == null ? null : generateHash(req.body.userObj._password)),
                        firstname: (req.body.userObj._firstname == null ? null : req.body.userObj._firstname),
                        lastname: (req.body.userObj._lastname == null ? null : req.body.userObj._lastname),
                        email: (req.body.userObj._email == null ? null : req.body.userObj._email),
                        department: (req.body.userObj._department == null ? null : req.body.userObj._department.toUpperCase()),
                        branch: (req.body.userObj._branch == null ? null : req.body.userObj._branch.toUpperCase()),
                        contact_no: (req.body.userObj._contact_no == null ? null : req.body.userObj._contact_no),
                        address_1: (req.body.userObj._address_1 == null ? null : req.body.userObj._address_1),
                        address_2: (req.body.userObj._address_2 == null ? null : req.body.userObj._address_2),
                        address_3: (req.body.userObj._address_3 == null ? null : req.body.userObj._address_3),
                        address_4: (req.body.userObj._address_4 == null ? null : req.body.userObj._address_4),
                        t1: (req.body.userObj._t1 == null ? false : req.body.userObj._t1),
                        t2: (req.body.userObj._t2 == null ? false : req.body.userObj._t2),
                        t3: (req.body.userObj._t3 == null ? false : req.body.userObj._t3),
                        t4: (req.body.userObj._t4 == null ? false : req.body.userObj._t4),
                        acct_t: (req.body.userObj._acct_t == null ? false : req.body.userObj._acct_t),
                        is_admin: (req.body.userObj._is_admin == null ? false : req.body.userObj._is_admin)
                    }
                })
                .then(result => {
                    res.status(200).send(result[0][0]);
                }).catch(err => {
                    winston.error({
                        level: 'error',
                        label: 'Admin_add_user',
                        message: err
                    })
                    res.status(500).send(err);
                })
        }
    })
}


//delete user
exports.del_user = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'Admin',
        message: 'del_user'
    })
    return models.Users.destroy({
        where: {
            id: req.params.user_id
        }
    }).then(result => {
        res.status(200).send();
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'Admin_del_user',
            message: err
        })
        res.status(500).send(err);
    })
}


//update the tier of user 
exports.admin_update = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'Admin',
        message: 'admin_update'
    })
    return db.sequelize
        .query('SELECT * FROM F_UPDATE_USR(:id, :username ,:firstname, :lastname, :email, :department, :branch, :contact_no, :address_1, :address_2, :address_3, :address_4, :acct_t, :t1, :t2,:t3, :t4, :is_admin, :update_typ)', {
            replacements: {
                id: req.body.userObj._id,
                username: req.body.userObj._username,
                firstname: req.body.userObj._firstname,
                lastname: req.body.userObj._lastname,
                email: req.body.userObj._email,
                department: (req.body.userObj._department == null ? null : req.body.userObj._department.toUpperCase()),
                branch: (req.body.userObj._branch == null ? null : req.body.userObj._branch.toUpperCase()),
                contact_no: req.body.userObj._contact_no,
                address_1: req.body.userObj._address_1,
                address_2: req.body.userObj._address_2,
                address_3: req.body.userObj._address_3,
                address_4: req.body.userObj._address_4,
                acct_t: (req.body.userObj._acct_t == null ? false : req.body.userObj._acct_t),
                t1: (req.body.userObj._t1 == null ? false : req.body.userObj._t1),
                t2: (req.body.userObj._t2 == null ? false : req.body.userObj._t2),
                t3: (req.body.userObj._t3 == null ? false : req.body.userObj._t3),
                t4: (req.body.userObj._t4 == null ? false : req.body.userObj._t4),
                is_admin: (req.body.userObj._is_admin == null ? false : req.body.userObj._is_admin),
                update_typ: true
            }
        }).then(po => {
            res.status(201).send(po[0][0])
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'Admin_update',
                message: err
            })
            res.status(500).send(err);
        })
}

//update the tier of user 
exports.user_update = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'Admin',
        message: 'user_update'
    })
    return db.sequelize
        .query('SELECT * FROM F_UPDATE_USR(:id, :username ,:firstname, :lastname, :email, :department, :branch, :contact_no, :address_1, :address_2, :address_3, :address_4, :acct_t, :t1, :t2,:t3, :t4, :is_admin, :update_typ)', {
            replacements: {
                id: req.body.userObj._id,
                username: null,
                firstname: req.body.userObj._firstname,
                lastname: req.body.userObj._lastname,
                email: req.body.userObj._email,
                department: null,
                branch: null,
                contact_no: req.body.userObj._contact_no,
                address_1: req.body.userObj._address_1,
                address_2: req.body.userObj._address_2,
                address_3: req.body.userObj._address_3,
                address_4: req.body.userObj._address_4,
                acct_t: false,
                t1: false,
                t2: false,
                t3: false,
                t4: false,
                is_admin: false,
                update_typ: false
            }
        }).then(po => {
            res.status(201).send(po[0][0])
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'user_update',
                message: err
            })
            res.status(500).send(err);
        })
}

exports.random_password = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'Admin',
        message: 'random_password'
    })
    const rndpass = password_generator();

    if (req.user.is_admin) {
        return models.Users.update({
            password: generateHash(rndpass)
        }, {
            where: {
                id: req.params.user_id
            }
        }).then(user => {
            res.status(200).send({
                new_pwd: rndpass
            });
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'reset_password',
                message: err
            });
            res.status(500).send(err);
        });
    }
}