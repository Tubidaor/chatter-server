const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      email: 'name@gmail.com',
      first_name: 'juan',
      last_name: 'baltazar', 
      user_name: 'tubidaor', 
      password:'password',
    },
    {
      id: 2,
      email: 'name1@gmail.com',
      first_name: 'bob',
      last_name: 'baltazar',
      user_name: 'testuser',
      password: 'password',
    },
    {
      id: 3, 
      email: 'name2@gmail.com',
      first_name: 'megan',
      last_name: 'baltazar',
      user_name: 'testuser1', 
      password: 'password',
    },
    {
      id: 4,
      email: 'name3@gmail.com',
      first_name: 'mara',
      last_name: 'baltazar',
      user_name: 'testuser2', 
      password: 'password',
    }
  ]
}

function makeChildrenArray() {
  return [
    {
      name_: 'chumbis',
      gender: 'female',
      birthdate: '02/17/2017',
      parent_id: 1
    },
    {
      name_: 'ladybug',
      gender: 'female',
      birthdate: '02/17/2019',
      parent_id: 1
    },
    {
      name_: 'chumbawomba',
      gender: 'female',
      birthdate: '07/17/2020',
      parent_id: 2,
    },
    {
      name_: 'Faith',
      gender: 'female',
      birthdate: '02/17/2020',
      parent_id: 2
    },
    {
      name_: 'hungry hippo',
      gender: 'female',
      birthdate: '02/17/2020',
      parent_id: 3
    },
    {
      name_: 'mija',
      gender: 'female',
      birthdate: '02/17/2020',
      parent_id: 4
    }
  ]
}

function makeWordsArray() {
  return [
    {
      words: 'papa', 
      date_created: '06/30/2017',
      child_id: 1
    },
    {
      words: 'mama', 
      date_created:'07/30/2017', 
      child_id: 1
    },
    { 
      words: 'pout',
      date_created:'08/30/2017', 
      child_id: 1
    },
    { 
      words: 'love',
      date_created: '08/30/2017',
      child_id: 1
    },
    { 
      words: 'chumbis',
      date_created: '08/30/2017',
      child_id: 1
    },
    { 
      words: 'te quiero mucho',
      date_created: '08/30/2017', 
      child_id: 1
    },
    { 
      words: 'abuelita',
      date_created: '10/30/2017',
      child_id: 1
    },
    { 
      words: 'gracias',
      date_created: '10/30/2017',
      child_id: 1
    },
    { 
      words: 'agua', 
      date_created: '11/30/2017',
      child_id: 1
    },
    { 
      words: 'manzana', 
      date_created: '12/30/2017', 
      child_id: 1
    },
    { 
      words: 'por favor',
      date_created: '1/30/2018',
      child_id: 1
    },
    { 
      words: 'paloma',
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'mara',
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'simon',
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'trevor',
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'grandpa',
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'mistake',
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'milk',
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'jelly',
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'no',
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'yes',
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'mad',
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'angry',
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'sad',
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'happy',
      date_created: '07/30/2018',
      child_id: 1
    },
    { 
      words: 'friend',
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'sky',
      date_created: '06/30/2018',
      child_id: 2
    },
    { 
      words: 'fish',
      date_created: '06/30/2018',
      child_id: 2
    },
    { 
      words: 'bear', 
      date_created: '06/30/2018',
      child_id: 2
    },
    { 
      words: 'horse',
      date_created: '06/30/2018',
      child_id: 2
    },
    { 
      words: 'dog',
      date_created: '06/30/2018',
      child_id: 2
    },
    { 
      words: 'pancake', 
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'egg', 
      date_created: '06/30/2018',
      child_id: 2
    },
    { 
      words: 'chocolate', 
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'ham',
      date_created: '06/30/2018',
      child_id: 2
    },
    { 
      words: 'oatmeal',
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'cereal',
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'plate',
      date_created: '06/30/2018', 
      child_id: 2
    },
    { 
      words: 'fork',
      date_created: '06/30/2018',
      child_id: 1
    },
    { 
      words: 'instead',
      date_created: '06/30/2019',
      child_id: 1
    },
    { 
      words: 'if',
      date_created: '06/30/2019',
      child_id: 1
    },
    { 
      words: 'sleep',
      date_created: '06/30/2019',
      child_id: 3
    },
    { 
      words: 'tired',
      date_created: '06/30/2019',
      child_id: 3
    },
    { 
      words: 'sun',
      date_created: '06/30/2019',
      child_id: 3
    }
  ]
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}






function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      chatter_words,
      chatter_child,
      chatter_users
      RESTART IDENTITY CASCADE`
  )
}

function seedUsers(db, users) {
  const hashedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('chatter_users').insert(hashedUsers)
    .then(() =>
    db.raw(
      `SELECT setval('chatter_users_id_seq', ?)`,
      [users[users.length -1].id],
    ))
}

function seedChildren(db, children) {
  return db.into('chatter_child').insert(children)
    .then(() => {
      db.raw(
        `SELECT setval('chatter_users_id_seq', ?)`,
        [children[children.length -1].id],
      )
    })
}

function seedWords(db, words) {
  return db.into('chatter_words').insert(words)
    .then(() => {
      db.raw(
        `SELECT setval('chatter_words_id_seq', ?)`,
        [words[words.length -1].id],
      )
    })
}


module.exports = {
  cleanTables,
  seedUsers,
  makeUsersArray,
  makeChildrenArray,
  seedChildren,
  makeAuthHeader,
  makeWordsArray,
  seedWords
}