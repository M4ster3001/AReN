
const conController = require( './connectionController' );
const PATH_ADS = 'http://localhost:3000/assets/img/';

module.exports = 
{

    async index( request, response ) {
        
        const { order = 'asc', limit = -1, flg_ativo = 1, idAd = null, others } = request.query;
        
        let data = [];
        let query = '';
        let query_others = '';
        
        if( idAd ){

            query = await conController.select({
                'table': 'ads', 
                'data': { 
                    'idAd': idAd,
                },
                'select': '*', 
            });

            info_user = await conController.select({
                'table': 'users', 
                'data': { 
                    'idUser': query[0].idUser,
                },
                'select': [ 'email', 'name', 'idState' ], 
            });
            query[0].userInfo = info_user[0];
            
            if( info_user[0] ) {

                info_state = await conController.select({
                    'table': 'states', 
                    'data': { 
                        'idState': info_user[0].idState,
                    },
                    'select': 'ufState', 
                });           
                query[0].userInfo['ufState'] = info_state[0].ufState;

            }

            if( query[0].idCategory ) {

                info_category = await conController.select({
                    'table': 'categories',
                    'data': {
                        'idCategory': query[0].idCategory
                    },
                    'select': [ 'nameCategory', 'slugCategory' ]
                });
                query[0].category = info_category[0];

            }
            
            
            gallery = await conController.select({
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

                query_others = await conController.select({
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

            query = await conController.select({
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
        const { idCategory, description, title, resume, imgAd, price, flg_ativo = 1, token } = request.body;
        let { images } = request.file; 
        const info_user = await conController.select({
            'table': 'users',
            'data': {
                'token': token
            },
            'select': 'idUser',
            'limit': 1
        })

        console.log( images );
        console.log( 'Cat: '+ idCategory );
        console.log( 'desc: '+ description );
        console.log( 'title: '+ title );
        console.log( 'res: '+ resume );
        console.log( 'img: '+ imgAd );
        console.log( 'val: '+ price );
        console.log( 'flg: '+ flg_ativo );
        console.log( 'tk: '+ token );
        console.log( 's: '+ info_user[0] );
        const idUser = info_user[0].idUser; 
        console.log( 'Id: '+ idUser );
        /*
        const query = await conController.insert({
            'table': 'ads',
            'data' : {
                idUser, idCategory, description, title, resume, price, flg_ativo
            }
        })*/

        
        //return response.json( query );

    },

    async update( request, response ) {

        const { idAd, idUser, idCategory, description, title, resume, imgAd, value, flg_ativo } = request.body;
        let resp;

        const query = await conController.update({
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

    async delete( request, response ) {

    }

}