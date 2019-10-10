import React from 'react'
import styles from './day.module.css'

class Day extends React.Component {

  renderReminders = () => {
    const { reminders } = this.props.day
    if (reminders) {
      return reminders.map(reminder => (
        <div style={{ backgroundColor: reminder.color }}>{reminder.note}</div>
      ))
    }
  }

  render() {

    const {
      number,
      disabled,
    } = this.props.day

    return (
      <td>
        <div onClick={this.props.onShowAddReminder} className={styles.container} style={{ backgroundColor: this.props.weekend && '#F1F1F1' }}>
          <h1 style={{ color: disabled && 'gray' }} className={styles.number}>{number}</h1>
          <div>
            {this.renderReminders()}
          </div>
        </div>
      </td>
    )
  }
}

export default Day