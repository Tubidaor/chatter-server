  const ChildrenService = {
  getChildrenByUser(db, user) {
    return db
      .from('chatter_child as cc')
      .select(
        'cc.name_'
      )
      .where('cu.user_name', `${user}`)
      .join(
        'chatter_users as cu',
        'cc.parent_id',
        'cu.id',
      )
  },
}

module.exports = ChildrenService