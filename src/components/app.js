import React from 'react'
import { connect } from 'react-redux'
import { testAction } from '../redux/actions'
import './styles.css'

const App = (props) => (
  <div className="app-container">
    Hello World!
    <button onClick={props.test}>
      test Action
    </button>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  test: () => dispatch(testAction())
})

export default connect(null, mapDispatchToProps)(App)