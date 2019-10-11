import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './calendar.module.css'
import Day from './day'
import Reminder from './reminder'

class Calendar extends React.Component {
  renderDays = () => {
    const { month } = this.props

    return month.map((row, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <tr key={i}>
        {row.map((day, index) => (
          <Day
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            day={day}
            weekend={index === 0 || index === 6}
          />
        ))}
      </tr>
    ))
  }

  render() {
    const { showModal } = this.props

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
        {showModal && (
          <Reminder />
        )}
      </>
    )
  }
}

Calendar.propTypes = {
  month: PropTypes.arrayOf(PropTypes.array).isRequired,
  showModal: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  showModal: state.calendar.showModal,
  month: state.calendar.month,
})

export default connect(mapStateToProps)(Calendar)
