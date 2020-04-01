
exports.up = function(knex) {
  return knex.schema.createTable( 'users', function( table ) {

    table.increments();
    table.string( 'email' ).notNullable();
    table.string( 'password' ).notNullable();
    table.string( 'token' ).notNullable();
    table.integer( 'flg_ativo' ).notNullable();

  } );
};

exports.down = function(knex) {
  return knex.schema.dropTable( 'users' );
};
