const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');


describe('Words Endpoint', () => {
  let database = knex({
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  })

  app.set('db', database)

  
 
 
  before('make knex instance', () => {
    database
  })
  
  after('disconnect from db', () => database.destroy())

  before('clean up tables', () => helpers.cleanTables(database))
  
  afterEach('cleanup', () => helpers.cleanTables(database))

    describe('Word count by user is returned on json and word posting', () => {
     
      const testUsers = helpers.makeUsersArray()
      const testChildren = helpers.makeChildrenArray()
      const testWords = helpers.makeWordsArray()

      beforeEach('load tables', () =>
        helpers.seedChatterTables(database, testUsers, testChildren, testWords)
      )
      afterEach('cleanup', () => helpers.cleanTables(database))

      it('Words by children by user /api/words/:user_name', () => {
        const user_name = testUsers[0].user_name

        console.log(testUsers[0])
        return supertest(app)
          .get(`/api/words/${user_name}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200)
          .expect(res => {
            expect(res.body).to.have.nested.property('[0][0].id')
            expect(res.body).to.have.nested.property('[0][0].name')
            expect(res.body).to.have.nested.property('[0][0].birthdate')
            expect(res.body).to.have.nested.property('[0][0].date_created')
            expect(res.body).to.have.nested.property('[0][0].word_count')
            expect(res.body[0][0]).to.include(
              {"name": "chumbis"},
              {"name": "ladybug"},
              )
            })
      })
    })

      context('Posting words', () => {
        
        const testUsers = helpers.makeUsersArray()
        const testChildren = helpers.makeChildrenArray()
        const testWords = helpers.makeWordsArray()

      beforeEach('load tables', () => 
        helpers.seedChatterTables(database, testUsers, testChildren, testWords)
      )
      
      afterEach('cleanup', () => helpers.cleanTables(database))

        it('Posts word by user /api/words', () => {
          const word = {
            words: 'coldwarkids',
            child_id: 1,
          }
          return supertest(app)
            .post('/api/words')
            .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
            .send(word)
            .expect(200)
            .expect(res => {
              expect(res.body.words).to.eql(word.words)
            })
          
        })
      })
      context('Posting words error', () => {
        
        const testUsers = helpers.makeUsersArray()
        const testChildren = helpers.makeChildrenArray()
        const testWords = helpers.makeWordsArray()

      beforeEach('load tables', () => 
        helpers.seedChatterTables(database, testUsers, testChildren, testWords)
      )
      
      afterEach('cleanup', () => helpers.cleanTables(database))

        it(`Responds with already exists`, () => {
          const wordIncluded = {
            words: 'papa',
            child_id: 1,
          }
          return supertest(app)
            .post('/api/words')
            .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
            .send(wordIncluded)
            .expect(404,
                {error: `The word '${wordIncluded.words}' already exists.`})
          })
      })
    })

