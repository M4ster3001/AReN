
exports.up = function(knex) {

    return knex.schema.createTable( 'states', function( table ){

        table.increments( 'idState' );
        table.string( 'nameState' ).notNullable();
        table.string( 'ufState' ).notNullable();

        table.timestamp('createdAt').defaultTo( knex.fn.now() );
        table.timestamp('updatedAt');

    } );
  
};

exports.down = function(knex) {
  return knex.schema.dropTable( 'states' );
};
