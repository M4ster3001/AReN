import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { createStore } from 'redux';
import { Provide, Provider } from 'react-redux';

import Reducers from './Reducers';

import './global.css';

ReactDOM.render( 
    <Provider store={ store }>
        <App />
    </Provider>
    , 
    document.getElementById( 'root' ) 
);