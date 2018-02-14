import { createStore, applyMiddleware, combineReducers } from 'redux'

import reducers from './modules'

let store = createStore(combineReducers(reducers), {});

export { store };