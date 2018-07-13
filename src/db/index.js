const { NODE_ENV = 'development' } = process.env
const config = require('../../knexfile')[NODE_ENV]

module.exports = require('knex')(config)
