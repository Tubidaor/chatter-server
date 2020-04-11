const express = require('express');
const UsersService = require('./user-service');
const jsonBodyParser = express.json();
const path = require('path');


const usersRouter = express.Router();

usersRouter
  .route('/')
  .post(jsonBodyParser, (req, res, next) => {
    const { email, password, user_name, first_name, last_name } = req.body
  
    for( const field of ['email', 'password', 'user_name', 'first_name', 'last_name'])
      if(!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })
    const passwordError = UsersService.validatePassword(password)

    if(passwordError) {
      return res.status(400).json({error: passwordError})
    }

    UsersService.userNameExists(req.app.get('db'), user_name)
      .then(userNameExists => {
        if(userNameExists)
          return res.status(400).json({error: 'Username already exists'})

    UsersService.emailExists(req.app.get('db'), email)
        .then(email => {
          if(email) {
            return res.status(400).json({error: 'Email is already registered'})
          }
        })

        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              email,
              user_name,
              password: hashedPassword,
              first_name,
              last_name,
            }
          return UsersService.insertUser(req.app.get('db'), newUser)
            .then(user => {
              res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${user.id}`))
                .json(UsersService.serializeUser(user))
            })
          })
      })
      .catch(next)
  })

  module.exports = usersRouter