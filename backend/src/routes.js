import { Router } from 'express';
require( 'dotenv' ).config({ path: 'variables.env' });

const routes = Router();

import multer from 'multer';
let storage = multer.diskStorage({
    destination: function( req, file, callback ) {
        callback( null, './uploads' )
    },
    filename: function( req, file, callback ) {
        callback( null, file.fieldname + '-' + Date.now() )
    }
})

let upload = multer({ storage: storage }).array( 'img', 10)

//Controllers
import { index, login, create, remove } from './controllers/usersControllers';
import { index as _index, create as _create } from './controllers/statesControllers';
import { index as __index, create as __create, update } from './controllers/adsControllers';
import { index as ___index, create as ___create, update as _update } from './controllers/categoriesControllers';
import { index as ____index, create as ____create, update as __update } from './controllers/galleryControllers';

/* Routes */
//Users 
routes.get( '/users', index );
routes.post( '/users/login', login );
routes.post( '/users/register', create );
routes.delete( '/users/delete', remove );

//Ads
routes.get( '/ads', __index );
routes.get( '/ad/list', __index );
routes.get( '/ad/view', __index );
routes.post( '/ad/register', function( req, res ) {
    upload( req, res, function( err ) {
        console.log( req.body )
        console.log( req.files )

        if( err ) {
            return res.send( 'Erro uploading' )
        }
        res.end( 'File success' )
    } )
});
routes.put( '/ad/update', update );

//Gallery
routes.get( '/ad/gallery/list', ____index );
routes.get( '/ad/gallery', ____index );
routes.post( '/ad/gallery/register', ____create );
routes.put( '/ad/gallery/update', __update );

//States
routes.get( '/states', _index );
routes.post( '/states/register', _create );

//Categories
routes.get( '/categories', ___index );
routes.post( '/categories/register', ___create );
routes.put( '/categories/update', _update );

export default routes;