const camo = require('camo').connect
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const flash = require('connect-flash')

const config = require('./config.js')

const localStrategy = require('./strategies/local')
passport.use(localStrategy)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))


let database
const app = express()

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')
app.disable('view cache')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({ secret: config.secret }))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

const routes = require('./routes')
app.use(routes)

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
	res.render('index', { user: req.user })
})


app.use((err, req, res, next) => {
  console.error(err.stack)
  next(err)
})
camo(config.database.uri).then(function(db) {
	database = db
}).then(() => {
	app.listen(3000, () => {
		console.log('App is listening...')
	})
}).catch(err => {
	console.log(err)
})