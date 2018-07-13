const knex = require('../db')
const { plural } = require('pluralize')

const ModelGenerator = constructorName => {
  const table = plural(constructorName).toLowerCase()
  class Model {
    constructor ({ id, fields }) {
      this._id = id
      this.fields = fields
      this.table = table
      this._removed = false
    }

    get id () {
      return this._id
    }

    set id (val) {
      throw new Error(`Cannot set id on instance of ${constructorName}`)
    }

    get removed () {
      return this._removed
    }

    set removed (val) {
      throw new Error(`Cannot set removed on instance of ${constructorName}`)
    }

    static all () {
      const Constructor = require('./')[constructorName]
      return knex(table)
        .then(resources => resources.map(resource => {
          return new Constructor(resource)
        }))
    }

    static find (id) {
      const Constructor = require('./')[constructorName]
      return knex(table).where({ id }).first()
        .then(resource => {
          if (resource) return new Constructor(resource)
          throw new Error(`Could not find ${constructorName} with id of ${id}`)
        })
    }

    save () {
      const id = this._id
      const fields = this.fields.reduce((acc, field) => ({ ...acc, [field]: this[field] }), {})

      const valid = Object.values(fields).every(field => field)
      if (!valid) return Promise.reject(new Error(`Invalid ${constructorName} on save`))

      let query = knex(this.table)
      query = id ?
        query.update({ ...fields, updated_at: new Date() }) :
        query.insert({ ...fields })

      return query.returning('*')
        .then(([ resource ]) => {
          resource._id = resource.id
          delete resource.id

          return Object.assign(this, resource)
        })
    }

    destroy () {
      const { id, removed } = this
      if (removed) return Promise.reject(new Error(`${constructorName} has already been deleted`))

      return knex(this.table)
        .where({ id })
        .del()
        .returning('*')
        .then(resource => {
          if (!resource) throw new Error(`Could not find ${constructorName} with id of ${id}`)

          this._removed = true
          return this
        })
    }
  }

  return Model
}

module.exports = ModelGenerator
