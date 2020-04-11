require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const app = express()
const wordsRouter = require('./words/words-router')
const childrenRouter = require('./children/children-router')
const usersRouter = require('./users/user-router')
const authRouter = require('./auth/auth-router')

const morganOption = ((NODE_ENV === 'production') ? 'tiny': 'common', {
    skip: () => NODE_ENV === 'test',
})

app.use(morgan(morganOption))
app.use(helmet())
let whiteList= ['https://chatter-app.juanbaltazar.now.sh','http://localhost:3000']
let corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whiteList.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate)
)


app.get('/api', (req, res) => {
  res.json({ok: true});
})

app.use('/api/words', wordsRouter)
app.use('/api/children', childrenRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.use(function errorHandler(error, req, res, next) {
  let response
  if(NODE_ENV === 'production') {
    reponse = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error}
  }
  res.status(500).json(response)
})

module.exports = app
