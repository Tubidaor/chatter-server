const express = require('express');
const ChildService = require('./children-service');
const jsonBodyParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');
const UserServices = require('../users/user-service');

const childrenRouter = express.Router();

childrenRouter
  .route('/:user_name')
  .all(requireAuth)
  .get((req, res, next) => {
    const db = req.app.get('db')
    UserServices.userNameId(db, req.params.user_name)
      .then(user => {
        const id = user.id
        ChildService.getChildrenByUser(db, id)
          .then(children => {
            res
              .status(200)
              .json(children)
          })
      })
      .catch(next)
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { name_, gender, birthdate } = req.body
    const { id } = req.user
    for(const field of [ 'name_', 'gender', 'birthdate'])
      if(!req.body[field]) 
        return res.json({error: `Missing '${field}' in request body`})
      
    const newChild = {
      name_,
      gender,
      birthdate: birthdate,
      parent_id: id
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