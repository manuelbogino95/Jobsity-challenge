import React from 'react'
import PropTypes from 'prop-types'
import styles from './day.module.css'

class Day extends React.Component {
  renderReminders = () => {
    const { day: { reminders } } = this.props
    if (reminders) {
      return reminders.map((reminder) => (
        <div key={reminder.id} style={{ backgroundColor: reminder.color }}>{reminder.note}</div>
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
        <div className={styles.container} style={{ backgroundColor: weekend && '#F1F1F1' }}>
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
}

export default Day
