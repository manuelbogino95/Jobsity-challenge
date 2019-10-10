import React from 'react'
import { connect } from 'react-redux'
import styles from './calendar.module.css'
import Day from './day'

class Calendar extends React.Component {

  renderDays = () => {
    return this.props.month.map((row, i) => {
      return (
        <tr key={i}>
          {row.map((day, index) => <Day
            key={index} day={day}
            weekend={index === 0 || index === 6}
          />)}
        </tr>
      )
    })
  }

  render() {

    return (
      <React.Fragment>
        <div className={styles.container}>
          <table>
            <thead>
              <tr>
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
              </tr>
            </thead>
            <tbody>
              {this.renderDays()}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => ({
  month: state.calendar.month,
})

export default connect(mapStateToProps, null)(Calendar)
