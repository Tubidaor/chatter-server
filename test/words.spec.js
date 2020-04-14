const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');


describe('Words Endpoint', () => {
  let database = knex({
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  })

  app.set('db', database)

  const testUsers = helpers.makeUsersArray()
  const testChildren = helpers.makeChildrenArray()
  const testWords = helpers.makeWordsArray()
 
  before('make knex instance', () => {
    database
  })
  before('clean up tables', () => helpers.cleanTables(database))
  after('disconnect from db', () => database.destroy())
  afterEach('clean up tables', () => helpers.cleanTables(database))

    context('Word count by user is returned on json', () => {
      beforeEach('load tables', () => {
        helpers.seedUsers(database, testUsers)
        helpers.seedChildren(database, testChildren)
        helpers.seedWords(database, testWords)
      })

      it('Words by children by user /api/words/:user_name', () => {
        const user_name = testUsers[0].user_name
        
        return supertest(app)
          .get(`/api/words/${user_name}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200)
      })
    })

})