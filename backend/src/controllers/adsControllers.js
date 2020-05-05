
import { select, insert, update, remove } from './connectionController'
require( 'dotenv' ).config({ path: 'variables.env' })


module.exports = 
{

    async index( request, response ) {
        
        const { order = 'asc', limit = -1, flg_ativo = 1, idAd = null, others } = request.query;
        
        let data = [];
        let query = '';
        let query_others = '';
        
        if( idAd ){

            query = await select({
                'table': 'ads', 
                'data': { 
                    'idAd': idAd,
                },
                'select': '*', 
            });

            info_user = await select({
                'table': 'users', 
                'data': { 
                    'idUser': query[0].idUser,
                },
                'select': [ 'email', 'name', 'idState' ], 
            });
            query[0].userInfo = info_user[0];
            
            if( info_user[0] ) {

                info_state = await select({
                    'table': 'states', 
                    'data': { 
                        'idState': info_user[0].idState,
                    },
                    'select': 'ufState', 
                });           
                query[0].userInfo['ufState'] = info_state[0].ufState;

            }

            if( query[0].idCategory ) {

                info_category = await select({
                    'table': 'categories',
                    'data': {
                        'idCategory': query[0].idCategory
                    },
                    'select': [ 'nameCategory', 'slugCategory' ]
                });
                query[0].category = info_category[0];

            }
            
            
            gallery = await select({
                'table': 'images_gallery', 
                'data': { 
                    'idAd': idAd,
                },
                'select': 'imgAd', 
            });
            
            if( gallery ) {

                query[0].gallery = gallery;
                gallery.push({ 'imgAd': query[0].imgAd });

            }

            if( others ) {

                query_others = await select({
                    'table': 'ads', 
                    'data': { 
                        'idUser': query[0].idUser,
                        'flg_ativo': 1, 
                    },
                    'filter': {
                        'type': 'notEqual',
                        'data': { 'idAd': idAd }
                    },
                    'select': '*', 
                });

            }

            data = { ad: query, others: query_others };

        } else {         

            query = await select({
                'table': 'ads', 
                'data': { 
                    'flg_ativo': flg_ativo 
                },
                'select': '*', 
                'orderColumn': 'createdAt',
                'orderDir': order,
                'limit': limit
            });
            data = query;
            
        }

        return response.json( data );

    },

    async create( request, response ) {

        console.log( request );
        const { idCategory, description, title, resume, price, flg_ativo = 1, token } = request.body;
        const info_user = await select({
            'table': 'users',
            'data': {
                'token': token
            },
            'select': 'idUser',
            'limit': 1
        })

        console.log( 'Cat: '+ idCategory );
        console.log( 'desc: '+ description );
        console.log( 'title: '+ title );
        console.log( 'res: '+ resume );
        console.log( 'val: '+ price );
        console.log( 'flg: '+ flg_ativo );
        console.log( 'tk: '+ token );
        console.log( 's: '+ info_user[0] );
        const idUser = info_user[0].idUser; 
        console.log( 'Id: '+ idUser );
        /*
        const query = await insert({
            'table': 'ads',
            'data' : {
                idUser, idCategory, description, title, resume, price, flg_ativo
            }
        })*/

        
        //return response.json( query );

    },

    async fileSave( req, res ) {

        let{ originalname: name, size, key, location: url = "" } = req.file
        
        if( !url ) {
            url = ( process.env.NODE_DEV == 'DEV' ? process.env.PATH_LOCAL : '' ) 
        }

        console.log( name, size, key, url )

        const query = await insert({
            'table': 'images_gallery',
            'data': {
                subtitle: name,
                size,
                key,
                url
            }
        }).catch( function( er ) {
            return res.status( 400 ).json( er );
        } );

        if( !query ) {
            return res.status( 400 ).json( query.error );
        }
    
        return res.json({ status: 'ok' })

    },

    async update( request, response ) {

        const { idAd, idUser, idCategory, description, title, resume, value, flg_ativo } = request.body;
        let resp;

        const query = await update({
            'table': 'ads',
            'select': {
                'idAd': idAd
            },
            'data': {
                idUser, idCategory, description, title, resume, value, flg_ativo
            }
        });
        
        return response.json( query );
    },

    async remove( request, response ) {

        const { idAd } = request.query;

        let resp = await remove({
            'table': 'ads',
            'data': {
                'idAd': idAd
            },
            'select': 'idAd'
        }).catch( function( er ) {
            return response.status( 400 ).json( er );
        } );

        if( resp.error.trim() ) {
            return response.status( 400 ).json( resp.error );
        }

        return response.status( 200 ).json( resp )
        
    }

}