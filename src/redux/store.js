import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import calendarReducer from './reducer'

const reducers = {
  calendar: calendarReducer,
  form: formReducer,
}

const reducer = combineReducers(reducers)

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
)

export default store
