import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/index'
import {Provider} from 'react-redux'
import Router from './router'

ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>
    , document.getElementById('root'));
