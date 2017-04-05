const router = require('express').Router()
const passport = require('passport')

const User = require('../models/user')

router.post('/register', async (req, res) => {
	const user = User.create(req.body)

	await user.save()

	res.send(200)
})

router.get('/login', (req, res) => {
	if (req.user) {
		req.flash('error', 'Already logged in')
		return res.redirect('/')
	}

	return res.render('login', { error: req.flash('error') })
})

router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
}))

router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

module.exports = router