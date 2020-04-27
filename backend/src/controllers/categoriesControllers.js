const connection = require('../database/connection').default;

module.exports = 
{

    async index( request, response ) {

        const categories = await connection( 'categories' ).select( '*' );
        return response.json( categories );

    },

    async create( request, response ) {

        const { nameCategory, slugCategory, imgCategory } = request.body;
        let resp; 

        try {

            resp = await connection( 'categories' ).insert({
                nameCategory,
                slugCategory,
                imgCategory,
            });

        } catch( er ) {
            return response.json( er );
        }

        return response.json( resp );

    },

    async update( request, response ) {

        const { idCategory, nameCategory, imgCategory, slugCategory } = request.body;
        let resp; 
        
        try {

            resp = await connection( 'categories' ).where( "idCategory", idCategory ).update({
                nameCategory,
                slugCategory,
                imgCategory,
            });

        } catch( er ) {
            return response.json( er );
        }

        return response.json( resp );

    },

    async remove( request, response ) {

        const { idCategory } = request.query;
        const category_id = await connection( 'categories' ).where( 'idCategory', idCategory ).select( 'idCategory' ).first();
        
        if( !category_id ){
            return response.status( 401 ).json({ erro: 'Categoria não encontrada' });
        }

        await connection( 'categories' ).where( 'idCategory', idCategory ).delete();
        return response.status( 204 ).send();

    }

}