const express = require( 'express' );
const routes = express.Router();

const multer = require( 'multer' );
const upload = multer({ dest: 'upload/' });

//Controllers
const usersControllers = require( './controllers/usersControllers' );
const statesControllers = require( './controllers/statesControllers' );
const adsControllers = require( './controllers/adsControllers' );
const categoriesControllers = require( './controllers/categoriesControllers' );
const galleryControllers = require( './controllers/galleryControllers' );

/* Routes */
//Users 
routes.get( '/users', usersControllers.index );
routes.post( '/users/login', usersControllers.login );
routes.post( '/users/register', usersControllers.create );
routes.delete( '/users/delete', usersControllers.delete );

//Ads
routes.get( '/ads', adsControllers.index );
routes.get( '/ad/list', adsControllers.index );
routes.get( '/ad/view', adsControllers.index );
routes.post( '/ad/register', upload.single( 'img' ), adsControllers.create);
routes.put( '/ad/update', adsControllers.update );

//Gallery
routes.get( '/ad/gallery/list', galleryControllers.index );
routes.get( '/ad/gallery', galleryControllers.index );
routes.post( '/ad/gallery/register', galleryControllers.create );
routes.put( '/ad/gallery/update', galleryControllers.update );

//States
routes.get( '/states', statesControllers.index );
routes.post( '/states/register', statesControllers.create );

//Categories
routes.get( '/categories', categoriesControllers.index );
routes.post( '/categories/register', categoriesControllers.create );
routes.put( '/categories/update', categoriesControllers.update );

module.exports = routes;