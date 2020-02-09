const express = require('express');
const ParentService = require('./children-service');

const childrenRouter = express.Router();

childrenRouter
  .route('/children')
  .get((req, res, next) => {
    const db = req.app.get('db')
    const user = 'tubidaor'
    ParentService.getChildrenByUser(db, user)
      .then(children => {
        res
          .status(200)
          .json(children)
      })
      .catch(next)
  })
  

module.exports = childrenRouter;