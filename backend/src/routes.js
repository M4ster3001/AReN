const express = require( 'express' );

const routes = express.Router();

//Controllers
const usersControllers = require( './controllers/usersControllers' );
const statesControllers = require( './controllers/statesControllers' );
const adsControllers = require( './controllers/adsControllers' );

/* Routes */
//Users 
routes.get( '/users', usersControllers.index );
routes.post( '/users/login', usersControllers.login );
routes.post( '/users/register', usersControllers.create );
routes.delete( '/users/delete', usersControllers.delete );

//Anuncios
routes.get( '/ads', adsControllers.index );

//Estatos
routes.get( '/states', statesControllers.index );
routes.post( '/states/register', statesControllers.create );

module.exports = routes;