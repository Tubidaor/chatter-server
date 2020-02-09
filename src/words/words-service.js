

const WordsService = {
  getWordCountByUserByChild(db) {
    const user = 'testuser'
    const child = 'chumbawomba'
    return db
      .from('chatter_words AS cw')
      .select(
        db.raw(
          `cw.date_created AS y, sum(count(cw.words)) OVER (ORDER BY cw.date_created) AS x`
        ) 
      )
      .groupBy('cc.name_', 'cw.date_created')
      .where('cu.user_name', `${user}`)
      .where('cc.name_',`${child}` )
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
  }

}


// cw.date_created AS y, sum(count(cw.words)) OVER (ORDER BY cw.date_created) AS x




module.exports = WordsService