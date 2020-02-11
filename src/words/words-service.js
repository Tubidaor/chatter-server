

const WordsService = {
  getWordCountByUserByChild(db, id, child ) {
    return db
      .from('chatter_words AS cw')
      .select(
        'cc.name_ as name',
        db.raw(
          `cw.date_created as x, sum(count(distinct cw.words)) OVER (ORDER BY cw.date_created ASC) AS y`
        ) 
      )
      .count('cw.words')
      .groupBy('cc.name_','cw.date_created')
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
  wordExistsCheck(db, words) {
    return db
      .from('chatter_words')
      .where({words})
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