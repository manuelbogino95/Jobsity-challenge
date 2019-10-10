import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './calendar.module.css'
import Day from './day'

class Calendar extends React.Component {
  renderDays = () => {
    const { month } = this.props

    return month.map((row, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <tr key={i}>
        {row.map((day, index) => (
          <Day
            key={day.number}
            day={day}
            weekend={index === 0 || index === 6}
          />
        ))}
      </tr>
    ))
  }

  render() {
    return (
      <>
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
      </>
    )
  }
}

Calendar.propTypes = {
  month: PropTypes.arrayOf(PropTypes.array).isRequired,
}

const mapStateToProps = (state) => ({
  month: state.calendar.month,
})

export default connect(mapStateToProps, null)(Calendar)
