const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');


describe('get request for children data', () => {
  let database = knex({
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  })

  app.set('db', database)

  const testChildren = helpers.makeChildrenArray()
  const testUsers = helpers.makeUsersArray()

  before('make knex instance', () => {
    database
  })
  before('clean up tables', () => helpers.cleanTables(database))
  after('disconnect database', () => database.destroy())
  afterEach('cleanup', () => helpers.cleanTables(database))

  context('requests children data', () => {
    beforeEach('load tables', () => {
      helpers.seedUsers(database, testUsers)
      helpers.seedChildren(database, testChildren)
      
    })

    it('validate request for children data', () => {
      
      const user_name = testUsers[0].user_name
      const childName = testChildren[0].name_
      const childId = 1
    
      return supertest(app)
        .get(`/api/children/${user_name}`)
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200)
        .expect(res => {
          expect(res.body[0].id).to.eql(childId)
          expect(res.body[0].name_).to.eql(childName)
          expect(res.body).to.have.nested.property('[0].id')
          expect(res.body).to.have.nested.property('[0].name_')

      })
    })
  })
})