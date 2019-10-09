import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)

module.hot.accept()