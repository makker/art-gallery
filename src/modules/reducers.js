import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import { default as art } from './artwork';
import { default as app } from './appState';

export default combineReducers({
    art,
    router: routerReducer,
    app,
});