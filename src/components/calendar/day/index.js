import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import {
  showModal as showModalAction,
  selectDay as selectDayAction,
  selectReminder as selectReminderAction,
  deleteAllReminders as deleteAllRemindersAction,
} from '../../../redux/actions'
import styles from './day.module.css'

class Day extends React.Component {
  openReminderModal = () => {
    const { selectDay, showModal, day } = this.props
    showModal()
    selectDay(day.number)
  }

  onClickReminder = (e, id) => {
    e.stopPropagation()
    const { selectReminder, showModal, day: { number } } = this.props
    selectReminder(id, number)
    showModal()
  }

  onClickDeleteReminders = (e) => {
    e.stopPropagation()
    const { deleteAllReminders, day: { number } } = this.props
    deleteAllReminders(number)
  }

  renderReminders = () => {
    const { day: { reminders } } = this.props
    if (reminders) {
      return reminders.map((reminder) => (
        <div key={reminder.id} className={styles.reminderContainer}>
          <button
            className={styles.reminder}
            type="button"
            style={{ backgroundColor: reminder.color }}
            onClick={(e) => this.onClickReminder(e, reminder.id)}
          >
            <div className={styles.reminderInfo}>{reminder.time && moment(reminder.time.getTime()).format('HH:mm a')}</div>
            <div className={styles.reminderInfo}>{reminder.note}</div>
            <div className={styles.reminderInfo}>{reminder.city}</div>
            {
              reminder.reminderWeather ? (
                <img alt="asd" src={`https://openweathermap.org/img/w/${reminder.reminderWeather.icon}.png`} />
              ) : null
            }
          </button>
        </div>
      ))
    }

    return null
  }

  render() {
    const {
      day: { number, disabled, reminders },
      weekend,
    } = this.props

    return (
      <td key={number}>
        <div
          role="button"
          tabIndex="0"
          className={styles.container}
          onClick={this.openReminderModal}
          onKeyPress={this.openReminderModal}
          style={{ backgroundColor: weekend && '#F1F1F1' }}
        >
          <h1 style={{ color: disabled && 'gray' }} className={styles.number}>{number}</h1>
          {
            reminders && reminders.length > 0 ? (
              <div className={styles.deleteDuttonContainer}>
                <button className={styles.deleteButton} type="button" onClick={(e) => this.onClickDeleteReminders(e)}>Delete all</button>
              </div>
            ) : null
          }
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
  selectReminder: PropTypes.func.isRequired,
  deleteAllReminders: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  showModal: () => dispatch(showModalAction()),
  selectDay: (number) => dispatch(selectDayAction(number)),
  selectReminder: (id, number) => dispatch(selectReminderAction(id, number)),
  deleteAllReminders: (number) => dispatch(deleteAllRemindersAction(number)),
})

export default connect(null, mapDispatchToProps)(Day)
