const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('user endpoints', function() {
  let database = knex({
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  })
  app.set('db', database)

  const testUsers = helpers.makeUsersArray()
 
  before('make knex instance', () => {
    database
  })

  after('disconnect from db', () => database.destroy())

  before('clean up tables', () => helpers.cleanTables(database))

  afterEach('clean up tables', () => helpers.cleanTables(database))

  describe('login and reg form functionality', () => {

    context('user validation', () => {
      beforeEach('insert users', () =>
        helpers.seedUsers(
          database,
          testUsers
        )
    )

    const requiredLoginFields = ['user_name', 'password']

    requiredLoginFields.forEach(field => {
      const loginAttemptBody = {
        user_name: 'test user_name',
        password: 'test password'
      }

      it(`responds with 400 error when ${field} is missing`, () => {
        delete loginAttemptBody[field]

        return supertest(app)
        .post('/api/auth/login')
        .send(loginAttemptBody)
        .expect(400, {
          error: `Missing '${field}' in request body`
        })
      })
    })
    it('Responds with error when no user name', () => {
      const invalidUser = {user_name: 'user-not', password:"test"}

      return supertest(app)
        .post('/api/auth/login')
        .send(invalidUser)
        .expect(400, {error: 'Incorrect user_name or password'})
      
    })

    it('Responds with error when invalid password', () => {
      const invalidPassword = {user_name: testUsers[0].user_name, password: 'badpw'}

      return supertest(app)
        .post('/api/auth/login')
        .send(invalidPassword)
        .expect(400, {error: 'Incorrect user_name or password'})
    })

    context('validate reg submission', () => {
      const requiredRegFields = [
        'email', 
        'password',
        'user_name',
        'first_name',
        'last_name'
      ]

      requiredRegFields.forEach(field => {
        const regAttempt = {
          email: 'test@email.com',
          password: 'test password',
          user_name: 'test user_name',
          first_name: 'test first_name',
          last_name: 'test last_name'
        }
      it('responds with 400, missing field if field is missing', () => {
        delete regAttempt[field]

        return supertest(app)
          .post('/api/users')
          .send(regAttempt)
          .expect(400, {
            error: `Missing '${field}' in request body`
          })
      })

      })
      it('responds with 400, username already exists', () => {
        const duplicateUserName = testUsers[0].user_name
        const newUser = {
            email: "testemail",
            user_name: duplicateUserName,
            password: "TestPassWord17!",
            first_name: testUsers[0].first_name,
            last_name: testUsers[0].last_name,
          }
          
        return supertest(app)
          .post('/api/users')
          .send(newUser)
          .expect(400, {error: 'Username already exists'})
      })

      const badPasswords = [
        "Short1!",
        "12!longpasswordthatislongerthan72charactersadgegetdgetdghasdgehbgefhjtyusfghjk",
        " 17!emptyspacepw",
        "doesnotcotainnumberorspecial",
      ]

        
      
      it('responds with 400 Password must be longer than 8 characters', () => {
        const newUser = {
          email: "testemail",
          user_name: "testUserName",
          password: badPasswords[0],
          first_name: "testfirst",
          last_name: "testlast",
        }
        
        return supertest(app)
          .post('/api/users')
          .send(newUser)
          .expect(400, {error: 'Password must be longer than 8 characters'})
      })

      it('responds with 400 Password must be less than 72 characters', () => {
        const newUser = {
          email: "testemail",
          user_name: "testUserName",
          password: badPasswords[1],
          first_name: "testfirst",
          last_name: "testlast",
        }
        
        return supertest(app)
          .post('/api/users')
          .send(newUser)
          .expect(400, {error: 'Password must be less than 72 characters'})
      })

      it('responds with 400 Password must not start or end with empty spaces', () => {
        const newUser = {
          email: "testemail",
          user_name: "testUserName",
          password: badPasswords[2],
          first_name: "testfirst",
          last_name: "testlast",
        }
        
        return supertest(app)
          .post('/api/users')
          .send(newUser)
          .expect(400, {error: 'Password must not start or end with empty spaces'})
      })

      it('responds with 400 Password must contain 1 upper case, lower case, number and special character', () => {
        const newUser = {
          email: "testemail",
          user_name: "testUserName",
          password: badPasswords[3],
          first_name: "testfirst",
          last_name: "testlast",
        }
        
        return supertest(app)
          .post('/api/users')
          .send(newUser)
          .expect(400, {error: 'Password must contain 1 upper case, lower case, number and special character'})
      })


    })
    })
  }
)

  }
)
