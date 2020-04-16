
exports.up = function(knex) {

    return knex.schema.createTable( 'categories', function( table ){

        table.increments( 'idCategory' );
        table.string( 'nameCategory' ).notNullable();
        table.string( 'slugCategory' ).notNullable();
        table.string( 'imgCategory' ).notNullable();

        table.timestamp('createdAt').defaultTo( knex.fn.now() );
        table.timestamp('updatedAt');

    } );
  
};

exports.down = function(knex) {
  return knex.schema.dropTable( 'categories' );
};
