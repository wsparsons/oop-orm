exports.up = knex => {
  return knex.schema.createTable('theatres', table => {
    table.increments()
    table.string('name').notNullable()
    table.string('address').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = knex => knex.schema.dropTable('theatres')
