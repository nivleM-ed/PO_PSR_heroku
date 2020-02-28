//for user authentication
let LocalStrategy = require('passport-local').Strategy;
let bcrypt = require('bcrypt');
let models = require('./models');
var winston = require('./logs/winston');

const validPassword = function (user, password) {
	return bcrypt.compareSync(password, user.password);
}

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		// if (req.app.settings.env === 'development') {
		// 	winston.debug({
		// 		level: 'info',
		// 		label: 'Passport',
		// 		message: 'Serialize User'
		// 	})
		// }
		return done(null, user.id)
	});

	passport.deserializeUser(function (id, done) {
		// if (req.app.settings.env === 'development') {
		// 	winston.debug({
		// 		level: 'info',
		// 		label: 'Passport',
		// 		message: 'Deserialize User - Start'
		// 	})
		// }
		models.Users.findOne({
			where: {
				'id': id
			}
		}).then(user => {
			if (user == null) {
				// if (req.app.settings.env === 'development') {
				// 	winston.debug({
				// 		level: 'info',
				// 		label: 'Passport',
				// 		message: 'Deserialize User - Wrong UserId'
				// 	})
				// }
				return done(new Error('Wrong user.id'))
			}
			// if (req.app.settings.env === 'development') {
			// 	winston.debug({
			// 		level: 'info',
			// 		label: 'Passport',
			// 		message: 'Deserialize User - Done'
			// 	})
			// }
			return done(null, user);
		})
	});

	passport.use(new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password',
			passReqToCallback: true
		},
		function (req, username, password, done) {
			winston.info({
				level: 'info',
				label: 'Passport',
				message: 'Find User'
			})
			return models.Users.findOne({
				where: {
					'username': username
				},
			}).then(user => {
				if (user == null) {
					console.log("user is null");
					return done(null, false, {
						err: 'noUserExist'
					})
				} else if (user.password == null || user.password == undefined) {
					console.log("password is null");
					return done(null, false, {
						err: 'pwdProblem'
					})
				} else if (!validPassword(user, password)) {
					console.log("password is wrong");
					return done(null, false, {
						err: 'incorrectPwdUsername'
					})
				}
				return done(null, user);
			}).catch(err => {
				winston.error({
					level: 'error',
					label: 'Passport',
					message: err
				})
				done(err, false);
			})
		}))
}