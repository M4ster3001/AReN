const connection = require( '../database/connection' );

module.exports = 
{

    async index( request, response ) {

        const { order = 'asc', limit = -1, flg_ativo = 1 } = request.query;

        const ads = await connection( 'ads' ).where( 'flg_ativo', flg_ativo ).select( '*' ).orderBy( 'createdAt', order ).limit( limit );
        return response.json( ads );

    },

    async create( request, response ) {

        const { idUser, idCategory, description, title, resume, imgAd, value, flg_ativo } = request.body;
        let resp;

        console.log( request.body );

        try
        {

            resp = await connection( 'ads' ).insert({
                idUser, 
                idCategory,
                description, 
                title, 
                resume, 
                imgAd,
                value, 
                flg_ativo
            });
            
        }catch( er ) 
        {
            return response.json( er );
        }

        return response.json( resp );

    },

    async update( request, response ) {

    },

    async delete( request, response ) {

    }

}