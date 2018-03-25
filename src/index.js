import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import './assets/polyfills';
import ObjectAssign from 'es6-object-assign';
import find from 'array.prototype.find';
import smoothscroll from 'smoothscroll-polyfill';
import store from './data/store';

import './assets/css/index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

// kick off the polyfill!
smoothscroll.polyfill();
ObjectAssign.polyfill();
find.shim();

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

ReactDOM.render(
    <Provider store={store}>
        { /* ConnectedRouter will use the store from Provider automatically */ }
        <ConnectedRouter history={history}>
            <Route path="/" component={App}/>
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('root'));

//registerServiceWorker();
