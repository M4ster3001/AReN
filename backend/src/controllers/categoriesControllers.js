const connection = require( '../database/connection' );

module.exports = 
{

    async index( request, response ) {

        const categories = await connection( 'categories' ).select( '*' );
        return response.json( categories );

    },

    async create( request, response ) {

        const { nameCategory, slugCategory, imgCategory } = request.body;
        const resp = await connection( 'categories' ).insert({
            nameCategory,
            slugCategory,
            imgCategory,
        });

        return response.json( resp );

    },

    async update( request, response ) {

    },

    async delete( request, response ) {

        const { idCategory } = request.query;
        const category_id = await connection( 'categories' ).where( 'idCategory', idCategory ).select( 'idCategory' ).first();
        
        if( !category_id ){
            return response.status( 401 ).json({ erro: 'Categoria não encontrada' });
        }

        await connection( 'categories' ).where( 'idCategory', idCategory ).delete();
        return response.status( 204 ).send();

    }

}