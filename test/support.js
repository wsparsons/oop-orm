const path = require('path')

global.chai = require('chai')

require('mocha')
chai.use(require('chai-http'))

global.knex = require('../src/db')

const clear = () => knex.migrate.rollback().then(() => knex.migrate.latest())
const destroyConn = () => knex.destroy()

beforeEach(clear)
after(destroyConn)
