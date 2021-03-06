require( 'dotenv' ).config({ path: 'variables.env' })

import { select, insert, update, remove } from './connectionController'
import connection from '../database/connection'

module.exports = 
{

    async index( request, response ) {
        
        const { order = 'asc', limit = -1, flg_ativo = 1, idAd = null, others } = request.query;
        
        let data = [];
        let info_user;
        let info_state;
        let info_category;
        let gallery = [];
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
            
            if( gallery.length ) {

                query[0].gallery = gallery;
                gallery.push({ 'imgAd': query[0].imgAd });

            }

            if( others.length ) {

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

        const { idCategory, description, title, resume, value, flg_ativo = 1, token } = request.body;
        const info_user = await select({
            'table': 'users',
            'data': {
                'token': token
            },
            'select': 'idUser',
            'limit': 1
        })

        const imgAd = 1;
        const idUser = info_user[0].idUser; 

        const query = await connection('ads').insert({
            idUser,
            idCategory,
            description,
            title,
            resume,
            value,
            imgAd,
            flg_ativo,
        });

        
        return response.json( query );

    },

    async fileSave( req, res ) {

        let{ idAd, originalname: name, size, key, location: url = "" } = req.file

        if( !url ) {
            url = ( process.env.NODE_DEV == 'DEV' ? process.env.PATH_LOCAL + key : '' ) 
        }

        try{
            resp = await connection('images_gallery').insert({
                idAd,
                subtitle: name,
                size,
                key,
                url
            });

            if( !resp ) {
                return res.json({ error: 'Não foi possível salvar' })
            }
    
        } catch( er ){
            return res.json( er )
        }
    
        return res.status( 200 ).json(resp);

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