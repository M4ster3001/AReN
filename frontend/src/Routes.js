import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';

//Pages
import Home from './pages/Home';

export default () => {
    return (

        <Switch>
            <Route exact path="/"> <Home /> </Route>
        </Switch>

    );
}