const express = require( 'express' );

const routes = express.Router();

//Controllers
const usersControllers = require( './controllers/usersControllers' );
const statesControllers = require( './controllers/statesControllers' );
const adsControllers = require( './controllers/adsControllers' );
const categoriesControllers = require( './controllers/categoriesControllers' );

/* Routes */
//Users 
routes.get( '/users', usersControllers.index );
routes.post( '/users/login', usersControllers.login );
routes.post( '/users/register', usersControllers.create );
routes.delete( '/users/delete', usersControllers.delete );

//Ads
routes.get( '/ads', adsControllers.index );

//States
routes.get( '/states', statesControllers.index );
routes.post( '/states/register', statesControllers.create );

//Categories
routes.get( '/categories', categoriesControllers.index );
routes.post( '/categories/register', categoriesControllers.create );

module.exports = routes;