const express = require('express')
const WordsService = require('./words-service')
const jsonBodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')
const wordsRouter = express.Router()



wordsRouter
  .route('/words')
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

  wordsRouter
  .route('/:userName')
  .all(requireAuth)
  .get((req, res, next) => {
    // const  { id } = req.user
    const id = 1
    console.log('userid is', id)
    const db = req.app.get('db')
    WordsService.getChildrenByUser(db, id)
      .then(children => {
        let childList =[]
        children.map(child => childList.push(child.name_))
        return childList
      })
      .then(childList => {
        console.log(1 + childList)

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

  async function getUserProfile(req, res, next) {
    try {
      const user = await UsersService.userNameExists(
        req.app.get('db'),
        res.params.user_id
      )
    if(!user)
      return res.status(404).json({
        error: `Thing doesn't exist`
      })

      res.user = user
      next()
  } catch(error) {
    next(error)
  }
}



  module.exports = wordsRouter