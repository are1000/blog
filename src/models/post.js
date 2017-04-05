const Document = require('camo').Document

const User = require('./user')

class Post extends Document {
	constructor() {
		super()

		this.author = User
		this.title = String
		this.content = String
	}

	static collectionName() {
		return 'posts'
	}
}

module.exports = Post