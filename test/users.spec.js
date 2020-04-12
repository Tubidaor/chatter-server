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
  const testUser = testUsers[0]

  before('make knex instance', () => {
    database
  })

  after('disconnect from db', () => database.destroy())

  before('clean up tables', () => helpers.cleanTables(database))

  afterEach('clean up tables', () => helpers.cleanTables(database))

  describe('login functionality', () => {
    context('user validation', () => {
      beforeEach('insert users', () =>
        helpers.seedUsers(
          database,
          testUsers
        )
    )

    const requiredFields = ['user_name', 'password']

    requiredFields.forEach(field => {
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
          error: `Missing '${field}' in request body`,
        })
      })

    })
    })
  }
)







  }
)
