const LocalStrategy = require('passport-local')
const User = require('../models/user.js')

module.exports = new LocalStrategy(function(username, password, done) {
	User.findOne({ username: username }).then(user => {
		if (!user) {
			return done(null, false, { message: 'Username and password does not match' })
		}

		if (!user.verifyPassword(password)) {
			return done(null, false, { message: 'Username and password does not match' })
		}

		return done(null, user)
	}).catch(err => {
		if (err) {
			return done(err)
		}
	})
})