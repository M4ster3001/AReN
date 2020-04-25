import React from 'react';
import { Switch } from 'react-router-dom';

import RouteHandler from './components/RouteHandler'

//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import AdPage from './pages/AdPage';
import AddAd from './pages/AddAd';
import MyAcount from './pages/MyAcount';
import Registrar from './pages/Register';
import NotFound from './pages/NotFound';

export default () => {
    return (

            <Switch>
                <RouteHandler exact path="/" component={ Home } />               
                <RouteHandler exact path="/login" component={ Login } />
                <RouteHandler exact path="/register" component={ Registrar } />
                <RouteHandler exact path="/ad/view/:idAd" component={ AdPage } />
                <RouteHandler private exact path="/newad" component={ AddAd } />
                <RouteHandler private exact path="/myaccount" component={ MyAcount } />
                <RouteHandler> <NotFound /> </RouteHandler>
            </Switch>

    );
}