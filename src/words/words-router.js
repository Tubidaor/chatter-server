const express = require('express')
const WordsService = require('./words-service')
const jsonBodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')
const wordsRouter = express.Router()



wordsRouter
  .route('/')
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    const { words, child_id } = req.body
   
    const newWord = {
      words,
      date_created: new Date(Date.now()),
      child_id,
    }

    if(!words)
      return res.status(404).json({error: 'Missing a word.'})
    
    WordsService.wordExistsCheck(req.app.get('db'), words, child_id )
      .then(wordOk => {
        
        if(wordOk)
          return res.status(404).json({error: `The word '${newWord.words}' already exists.`})
      

        return WordsService.insertWord(req.app.get('db'), newWord)
          .then(word => {
            res
              .status(200)
              .json(word)
        })
      })
      .catch(next)
  })

  wordsRouter
  .route('/:userName')
  .all(requireAuth)
  .get((req, res, next) => {
    const { id } = req.user
    const db = req.app.get('db')
    WordsService.getChildrenByUser(db, id)
      .then(children => {
        let childList =[]
        children.map(child => childList.push(child.name_))
        return childList
      })
      .then(childList => {

        let allWordsRes = new Promise(resolve => {
          let allWords = []
          for(let i = 0; i < childList.length; i++)
            
            WordsService.getWordCountByUserByChild(db, id, childList[i])
              .then(words => {
                allWords.push(words)
                if(i + 1 === childList.length) {
                  resolve(allWords)
                }
              })
          return allWords
        })

        allWordsRes
          .then(allWordsResJson => {
            res
              .status(200)
              .json(allWordsResJson)
          })
          
        })
      .catch(next)
      
  })

  module.exports = wordsRouter