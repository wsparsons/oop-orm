const db = require('../db')

class Theatre {
  constructor({id=null, name=null, address=null} = {}){
    this._id = id
    this.name = name
    this.address = address
    this._removed = false
    db('theatres')
      .insert({ id: this._id, name: this.name, address: this.address})
      .returning('*')
  }

  get id () {
    return this._id
  }

  set id (val) {
    throw new Error()
  }

  get removed () {
    return this._removed
  }

  set removed (val) {
    throw new Error()
  }

  static all () {
    return db('theatres')
      .returning('*')
      .then(response => {
        return response.map(theatre => {
          return new Theatre (theatre)
        })
      })
  }

  static find (id) {
    return db('theatres')
      .where({id})
      .then(([theatre]) => {
        return new Theatre(theatre)
      })
      .catch( err => {
        throw new Error(err)
      })
  }

  save () {
    if(this._id){
      return db('theatres')
        .update({ name: this.name, address: this.address })
        .where({ id: this._id })
        .returning('*')
        .then(response => {
          return this
        })
    } else {
      return db('theatres')
        .insert({ name: this.name, address: this.address })
        .returning('*')
        .then(response => {
          return this
        })
        .catch(err => {
          throw new Error(err)
        })
    }
  }

  destroy () {
    if(this._removed) return Promise.reject(new Error())
    if(this._id){
      return db('theatres')
        .del()
        .where({id: this._id})
        .returning('*')
        .then(response => {
          this._removed = true
          return this
        })
    }

  }
}

module.exports = Theatre
