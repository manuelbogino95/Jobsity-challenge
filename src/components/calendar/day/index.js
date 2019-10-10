import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  showModal as showModalAction,
  selectDay as selectDayAction,
} from '../../../redux/actions'
import styles from './day.module.css'

class Day extends React.Component {
  openReminderModal = () => {
    const { selectDay, showModal, day } = this.props
    showModal()
    selectDay(day.number)
  }

  renderReminders = () => {
    const { day: { reminders } } = this.props
    if (reminders) {
      return reminders.map((reminder) => (
        <div className={styles.reminderContainer}>
          <div
            key={reminder.id}
            className={styles.reminder}
            tabIndex="0"
            role="button"
            style={{ backgroundColor: reminder.color }}
          >
            <div className={styles.reminderInfo}>{reminder.time}</div>
            <div className={styles.reminderInfo}>{reminder.note}</div>
          </div>
        </div>
      ))
    }

    return null
  }

  render() {
    const {
      day: { number, disabled },
      weekend,
    } = this.props

    return (
      <td>
        <div
          role="button"
          tabIndex="0"
          className={styles.container}
          onClick={this.openReminderModal}
          onKeyPress={this.openReminderModal}
          style={{ backgroundColor: weekend && '#F1F1F1' }}
        >
          <h1 style={{ color: disabled && 'gray' }} className={styles.number}>{number}</h1>
          <div>
            {this.renderReminders()}
          </div>
        </div>
      </td>
    )
  }
}

Day.propTypes = {
  day: PropTypes.shape({
    number: PropTypes.number,
    disabled: PropTypes.bool,
    reminders: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  weekend: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  selectDay: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  showModal: () => dispatch(showModalAction()),
  selectDay: (number) => dispatch(selectDayAction(number)),
})

export default connect(null, mapDispatchToProps)(Day)
