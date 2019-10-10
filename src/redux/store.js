import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import calendarReducer from './reducer'

const reducers = {
  calendar: calendarReducer,
}

const reducer = combineReducers(reducers)

const store = createStore(
  reducer,
  composeWithDevTools(),
)

export default store
