import React from 'react'
import { connect } from 'react-redux'
import { testAction } from '../redux/actions'
import styles from './app.module.css'
import Calendar from './calendar'

const App = (props) => (
  <div className={styles.container}>
    <Calendar />
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  test: () => dispatch(testAction())
})

export default connect(null, mapDispatchToProps)(App)