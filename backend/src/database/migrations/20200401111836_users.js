exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('idUser');
    table.integer('idState').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('token').notNullable();
    table.integer('flg_ativo').notNullable();

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
