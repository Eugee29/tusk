import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { boardReducer } from './board/board.reducer.js'
import { appReducer } from './app/app.reducer.js'
import { userReducer } from './user/user.reducer.js'

const rootReducer = combineReducers({
  boardModule: boardReducer,
  userModule: userReducer,
  appModule: appReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
