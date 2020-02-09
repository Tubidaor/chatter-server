const express = require('express')
const WordsService = require('./words-service')

const wordsRouter = express.Router()


wordsRouter
  .route('/wordcount')
  .get((req, res, next) => {
    const db = req.app.get('db')
    WordsService.getWordCountByUserByChild(db)
      .then(words => {
        res
          .status(200)
          .json(words)
      })
      .catch(next)
  })

  module.exports = wordsRouter