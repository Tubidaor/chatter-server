  const ChildService = {
  getChildrenByUser(db, cu_id) {
    return db
      .from('chatter_child as cc')
      .select(
        'cc.name_',
        'cc.id'
      )
      .where('cu.id', `${cu_id}`)
      .join(
        'chatter_users as cu',
        'cc.parent_id',
        'cu.id',
      )
  },
  validateDate(newChild) {
    const date_reg = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/i
    let birthdate = newChild.birthdate
    
    console.log(birthdate)
    if(!date_reg.test(birthdate)) 
      return 'Date must be in mm/dd/yyyy format'
  },
  insertNewChild(db, newChild) {
    return db
      .insert(newChild)
      .into('chatter_child')
      .returning('*')
      .then(([child]) => child)
  },
}

module.exports = ChildService