const express = require('express')
const WordsService = require('./words-service')
const jsonBodyParser = express.json()

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
  .post(jsonBodyParser, (req, res, next) => {
    const { words, date_created, child_id } = req.body
    const newWord = {
      words,
      date_created,
      child_id,
    }

    if(!words)
      return res.status(404).json({error: 'Missing a word'})
    
    WordsService.wordExistsCheck(req.app.get('db'), newWord.words)
      .then(wordOk => {
        console.log(wordOk)
        if(wordOk)
          return res.status(404).json({error: `The word '${newWord.words}' already exists`})
      })

    WordsService.insertWord(req.app.get('db'), newWord)
      .then(word => {
        res
          .status(200)
          .json(word)
      })
      .catch(next)
  })


  module.exports = wordsRouter