// Much from here https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f

// Redux Devtools Extension

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import reducers from '../modules/reducers' // Or wherever you keep your reducers

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

const initialState = {};
const enhancers = [];

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension || window.__REDUX_DEVTOOLS_EXTENSION__ ;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    reducers,
    initialState,
    composedEnhancers
);

export default store;