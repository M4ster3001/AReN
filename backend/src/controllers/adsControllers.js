const connection = require( '../database/connection' );

module.exports = 
{

    async index( request, response ) {

        const { order = 'asc', limit = -1, flg_ativo = 1, idAd = null } = request.query;
        let query = '';
        
        if( idAd ){
            query = await connection( 'ads' ).where( 'idAd', idAd ).select( '*' );
        } else {         
            query = await connection( 'ads' ).where( 'flg_ativo', flg_ativo ).select( '*' ).orderBy( 'createdAt', order ).limit( limit );
        }

        return response.json( query );

    },

    async create( request, response ) {

        const { idUser, idCategory, description, title, resume, imgAd, value, flg_ativo } = request.body;
        let resp;

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

        const { idAd, idUser, idCategory, description, title, resume, imgAd, value, flg_ativo } = request.body;
        let resp;

        try
        {

            resp = await connection( 'ads' ).where( 'idAd', idAd ).update({
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

    async delete( request, response ) {

    }

}