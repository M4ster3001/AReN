import React from 'react';
import { Switch, Route } from 'react-router-dom';

//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Registrar from './pages/Register';
import NotFound from './pages/NotFound';

export default () => {
    return (

            <Switch>
                <Route exact path="/" component={ Home } />               
                <Route exact path="/login" component={ Login } />
                <Route exact path="/register" component={ Registrar } />
                <Route> <NotFound /> </Route>
            </Switch>

    );
}