const router = require('express').Router()
const passport = require('passport')

const Post = require('../models/post')

const isLoggedIn = (req, res, next) => {
	if (req.user) {
		next()
	} else {
		res.redirect('/auth/login')
	}
}

router.get('/new', isLoggedIn, (req, res) => {
	res.render('newpost', { editing: true })
})

router.post('/new', isLoggedIn, (req, res) => {
	const post = Post.create({
		author: req.user,
		title: req.body.title,
		content: req.body.content
	})
})

module.exports = router