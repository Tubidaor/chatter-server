const express = require('express');
const ChildService = require('./children-service');
const jsonBodyParser = express.json();

const childrenRouter = express.Router();

childrenRouter
  .route('/children')
  .get((req, res, next) => {
    const db = req.app.get('db')
    const user = 'tubidaor'
    ChildService.getChildrenByUser(db, user)
      .then(children => {
        res
          .status(200)
          .json(children)
      })
      .catch(next)
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { name_, gender, birthdate, parent_id } = req.body
    for(const field of [ 'name_', 'gender', 'birthdate', 'parent_id'])
      if(!req.body[field]) 
        return res.json({error: `Missing '${field}' in request body`})
      
    const newChild = {
      name_,
      gender,
      birthdate: new Date(birthdate).toLocaleDateString('en-US'),
      parent_id,
    }
    const childError = ChildService.validateDate(newChild)

    if(childError)
      return res.status(400).json({error: childError})

    return ChildService.insertNewChild(req.app.get('db'), newChild)
      .then(child => {
        res
          .status(201)
          .json(child)
      })
      .catch(next)
  })
  

module.exports = childrenRouter;