import { Router, response } from 'express';
require( 'dotenv' ).config({ path: 'variables.env' });

const routes = Router();

import multer from 'multer';
import multerConfig from './config/multer'


//Controllers
import usersControllers from './controllers/usersControllers';
import statesControllers from './controllers/statesControllers';
import adsControllers from './controllers/adsControllers';
import categoriesControllers from './controllers/categoriesControllers';
import { index, create, update, Delete } from './controllers/galleryControllers';

/* Routes */
//Users 
routes.get( '/users', usersControllers.index );
routes.post( '/users/login', usersControllers.login );
routes.post( '/users/register', usersControllers.create );
routes.delete( '/users/delete', usersControllers.remove );

//Ads
routes.get( '/ads', adsControllers.index );
routes.get( '/ad/list', adsControllers.index );
routes.get( '/ad/view', adsControllers.index );
routes.post( '/ad/register', adsControllers.create);
routes.put( '/ad/update', adsControllers.update );
routes.delete( '/ad/delete', adsControllers.remove );

//Gallery
routes.get( '/ad/gallery', index );
routes.get( '/ad/gallery/list', index );
routes.post( '/ad/gallery/register', multer(multerConfig).single('file'), create );
routes.put( '/ad/gallery/update', update );
routes.delete( '/ad/gallery/delete', Delete );

//States
routes.get( '/states', statesControllers.index );
routes.post( '/states/register', statesControllers.create );
routes.put( '/states/update', statesControllers.update );
routes.delete( '/states/delete', statesControllers.remove );

//Categories
routes.get( '/categories', categoriesControllers.index );
routes.post( '/categories/register', categoriesControllers.create );
routes.put( '/categories/update', categoriesControllers.update );
routes.delete( '/categories/delete', categoriesControllers.remove );

export default routes;