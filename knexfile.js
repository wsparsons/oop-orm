require('dotenv').load()
const path = require('path')
const { DATABASE_URL } = process.env

const config = {
  client: 'pg',
  connection: DATABASE_URL,
  migrations: {
    directory: path.join(__dirname, 'src', 'db', 'migrations')
  },
  seeds: {
    directory: path.join(__dirname, 'src', 'db', 'seeds')
  }
}

module.exports = {
  development: config,
  test: { ...config, connection: DATABASE_URL.replace('_dev', '_test') }
}
