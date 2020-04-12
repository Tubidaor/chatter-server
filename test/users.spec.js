const knex = require('knex');
const app = require('../src/app');
const helpers = require('../test/test-helpers');

describe('user endpoints', function() {
  let database = knex({
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  })
  app.set('db', database)

  const testUsers = helpers.makeUsersArray()
  const testChildren = helpers.makeChildrenArray()
  const testUser = testUsers[0]

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
    } )
    
    // context('request children data', () => {
    //   beforeEach('insert children', () => {
    //     helpers.seedChildren(
    //       database,
    //       testChildren
    //     )
    //   })
    // })



    })
    })
  }
)







  }
)
