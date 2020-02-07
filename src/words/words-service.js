
const WordsService = {
  getAllWords(db) {
    return db
      .from('chatter_words AS cw')
      .select(
        'cw.id',
        'cw.words',
        // 'cw.parent_id',
      )
  }
}

module.exports = WordsService