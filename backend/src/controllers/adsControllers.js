const connection = require( '../database/connection' );

module.exports = 
{

    async index( request, response ) {

        const ads = await connection( 'ads' ).select( '*' );
        return response.json( ads );

    },

    async create( request, response ) {

    },

    async update( request, response ) {

    },

    async delete( request, response ) {

    }

}