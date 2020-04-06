

const WordsService = {
  getWordCountByUserByChild(db, id, child ) {
    return db
      .from('chatter_words AS cw')
      .select(
        'cc.id',
        'cc.name_ as name',
        'cc.birthdate as birthdate',
        db.raw(
          `cw.date_created as date_created, sum(count(distinct cw.words)) OVER (ORDER BY cw.date_created ASC) AS word_count`
        ) 
      )
      .count('cw.words')
      .groupBy('cc.id', 'cc.name_','cc.birthdate','cw.date_created')
      .where({'cu.id': `${id}`})
      .where({'cc.name_':`${child}`})
      .join(
        'chatter_child as cc',
        'cw.child_id',
        'cc.id',
      )
      .join(
        'chatter_users as cu',
        'cc.parent_id',
        'cu.id',
      )
  },
  insertWord(db, newWord) {
    return db
      .insert(newWord)
      .into('chatter_words')
      .returning('*')
      .then(([word]) => word)
  },
  wordExistsCheck(db, words, child_id) {
    return db
      .from('chatter_words')
      .where({words})
      .where({child_id})
      .first()
      .then(word => !!word)
  },
  getChildrenByUser(db, id) {
    return db
      .from('chatter_child as cc')
      .select(
        'cc.name_'
      )
      .where('cu.id', `${id}`)
      .join(
        'chatter_users as cu',
        'cc.parent_id',
        'cu.id',
      )
  },

}


// cw.date_created AS y, sum(count(cw.words)) OVER (ORDER BY cw.date_created) AS x




module.exports = WordsService