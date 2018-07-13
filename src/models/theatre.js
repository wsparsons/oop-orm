const Model = require('./_model')('Theatre')

class Theatre extends Model {
  constructor ({ id=null, name=null, address=null }={}) {
    super({ id, fields: [ 'name', 'address' ] })

    this.name = name
    this.address = address
  }
}

module.exports = Theatre
