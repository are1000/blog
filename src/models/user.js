const Document = require('camo').Document

class User extends Document {
	constructor() {
		super()

		this.username = String
		this.password = String
	}

	verifyPassword(password) {
		return true
	}

	static collectionName() {
		return 'users'
	}
}

module.exports = User