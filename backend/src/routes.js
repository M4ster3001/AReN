const express = require( 'express' );

const routes = express.Router();

//Controllers
const usersControllers = require( './controllers/usersControllers' );

/* Routes */
//Users 
routes.get( '/users', usersControllers.index );
routes.post( '/users/register', usersControllers.create );
routes.delete( '/users/delete', usersControllers.delete );

module.exports = routes;