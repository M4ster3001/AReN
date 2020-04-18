const connection = require( '../database/connection' );
const PATH_ADS = 'http://localhost:3000/assets/img/';

module.exports = 
{

    async index( request, response ) {
        
        const { order = 'asc', limit = -1, flg_ativo = 1, idAd = null, others } = request.query;
        
        let data = [];
        let query = '';
        let query_others = '';
        
        if( idAd ){

            query = await connection( 'ads' ).where( 'idAd', idAd ).select( '*' );
            //query[0].imgAd = PATH_ADS + query[0].imgAd;
            
            gallery = await connection( 'images_gallery' ).where( 'idAd', idAd ).select( 'imgAd' );
            query[0].gallery = gallery;
            gallery.push({ 'imgAd': query[0].imgAd });

            if( others ) {
                query_others = await connection( 'ads' ).where({ 'idUser': query[0].idUser, 'flg_ativo': 1 }).select( '*' );
            }

            data = { ad: query, others: query_others };

        } else {         
            query = await connection( 'ads' ).where( 'flg_ativo', flg_ativo ).select( '*' ).orderBy( 'createdAt', order ).limit( limit );
            data = query;
        }

        return response.json( data );

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