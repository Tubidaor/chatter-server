  const ChildService = {
  getChildrenByUser(db, cu_id) {
    return db
      .from('chatter_child as cc')
      .select(
        'cc.name_'
      )
      .where('cu.id', `${cu_id}`)
      .join(
        'chatter_users as cu',
        'cc.parent_id',
        'cu.id',
      )
  },
  validateDate(newChild) {
    const date_reg = /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/g
    let birthdate = newChild.birthdate
   
    console.log(birthdate)
    console.log(newChild.birthdate)
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