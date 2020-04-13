const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');


describe('get request for children data', () => {
  let dataBase = knex({
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  })

  app.set('db', dataBase)

  const testChildren = helpers.makeChildrenArray()
  const testUsers = helpers.makeUsersArray()

  before('make knex instance', () => {
    dataBase
  })

  after('disconnect database', () => dataBase.destroy())

  context('requests children data', () => {
    before('load children', () => {
      helpers.seedUsers(dataBase, testUsers)
      helpers.seedChildren(dataBase, testChildren)
      
    })
    // beforeEach('cleanup', () => helpers.cleanTables(dataBase))
    afterEach('cleanup', () => helpers.cleanTables(dataBase))

    it('validate request for children data', () => {
      
      const user_name = testUsers[0].user_name

      return supertest(app)
        .get(`/api/children/${user_name}`)
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200)
      })
  })
})