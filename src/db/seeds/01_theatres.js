const tableName = 'theatres'
exports.seed = async knex => {
  await knex(tableName).del()
  await knex(tableName).insert([
    { id: 1, name: 'SIFF Cinema Egyptian', address: '805 E Pine St, Seattle, WA 98122' },
    { id: 2, name: 'Regal Cinemas Meridian 16', address: '1501 7th Ave, Seattle, WA 98101' },
    { id: 3, name: 'Cinerama', address: '2100 4th Ave, Seattle, WA 98121' }
  ])

  return knex.raw(`SELECT setval('${tableName}_id_seq', (SELECT MAX(id) FROM ${tableName}));`)
}
