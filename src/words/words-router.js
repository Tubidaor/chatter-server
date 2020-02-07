const express = require('express')
const WordsService = require('./words-service')

const wordsRouter = express.Router()


wordsRouter
  .route('/words')
  .get((req, res, next) => {
    const db = req.app.get('db')
    WordsService.getAllWords(db)
      .then(words => {
        res.json(words)
      })
      .catch(next)
  })

  module.exports = wordsRouter