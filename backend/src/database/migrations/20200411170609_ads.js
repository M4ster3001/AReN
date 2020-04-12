
exports.up = function(knex) {

    return knex.schema.createTable( 'ads', function( table ){

        table.increments( 'idAd' );
        table.integer( 'idUser' ).notNullable();
        table.string( 'description' ).notNullable();
        table.string( 'title' ).notNullable();
        table.string( 'resume' ).notNullable();
        table.double( 'value' );
        table.integer( 'flg_ativo' );

        table.timestamp('createdAt').defaultTo( knex.fn.now() );
        table.timestamp('updatedAt');

    } );
  
};

exports.down = function(knex) {
  return knex.schema.dropTable( 'ads' );
};
