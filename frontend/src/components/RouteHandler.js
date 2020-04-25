import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLogged } from '../helpers/authHandler'

export default ({ children, ...rest }) => {

    let logged = isLogged();
    let authorized = ( rest.private && !logged ? false : true );
    console.log( logged );
    console.log( authorized );
    return (
        <Route 
            { ...rest }
            render={ () => authorized ? children : <Redirect exact to="/login" /> }
        />
    );
}