import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import store from './data/store';

import './assets/css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

ReactDOM.render(

    <Provider store={store}>
        { /* ConnectedRouter will use the store from Provider automatically */ }
        <ConnectedRouter history={history}>
            <Route path="/" component={App}/>
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('root'));

registerServiceWorker();
