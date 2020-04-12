const bcrypt = require('bcryptjs');

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
  [
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







function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      chatter_child,
      chatter_users,
      chatter_words
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


module.exports = {
  cleanTables,
  seedUsers,
  makeUsersArray,
  makeChildrenArray,
  seedChildren,
}