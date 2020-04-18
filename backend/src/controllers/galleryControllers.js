const connection = require( '../database/connection' );

module.exports = 
{

    async index( request, response ) {
        
        const { order = 'asc', limit = -1, idAd = null } = request.query;
        
        let query = '';

        query = await connection( 'images_gallery' ).where( 'idAd', idAd ).select( '*' ).orderBy( 'createdAt', order ).limit( limit );

        return response.json( query );

    },

    async create( request, response ) {

        const { idAd, subtitle, imgAd } = request.body;
        const count = request.body.length;
        /*
        request.body.forEach(function (item) {//got an exception 
            const { idAd, subtitle, imageAd } = item;
        });
        */
        let resp;

        try
        {

            resp = await connection( 'images_gallery' ).insert({
                idAd, 
                subtitle,
                imgAd
            });
            
        }catch( er ) 
        {
            return response.json( er );
        }

        return response.json( resp );

    },

    async update( request, response ) {

        const { idImgGal, idAd, subtitle, imgAd } = request.body;
        let resp;
        try
        {

            resp = await connection( 'images_gallery' ).where( 'idImgGal', idImgGal ).update({ 
                idAd,
                subtitle, 
                imgAd
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