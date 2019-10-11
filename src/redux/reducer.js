import moment from 'moment'
import initialState from './initialValues'
import * as ACTION from './consts'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.SELECT_DAY:
      return {
        ...state,
        selectedDay: action.payload,
        selectedReminder: {},
      }
    case ACTION.SHOW_MODAL:
      return {
        ...state,
        showModal: !state.showModal,
      }
    case ACTION.ADD_REMINDER: {
      const { note, time, color } = action.payload
      const month = state.month.map((row) => row.map((cell) => {
        if (cell.number === state.selectedDay) {
          const reminders = cell.reminders || []
          reminders.push({
            id: new Date().getTime(),
            note,
            time,
            color,
          })
          reminders.sort((a, b) => parseFloat(moment(a.time.getTime()).format('HH:mm a')) - parseFloat(moment(b.time.getTime()).format('HH:mm a')))

          return {
            ...cell,
            reminders,
          }
        }
        return cell
      }))
      return {
        ...state,
        month,
      }
    }
    case ACTION.EDIT_REMINDER: {
      const month = state.month.map((row) => row.map((cell) => {
        if (cell.number === action.payload.number) {
          const reminders = cell.reminders || []
          const reminderIndex = reminders.findIndex((r) => r.id === action.payload.reminder.id)
          reminders[reminderIndex] = action.payload.reminder
          reminders.sort((a, b) => parseFloat(moment(a.time.getTime()).format('HH:mm a')) - parseFloat(moment(b.time.getTime()).format('HH:mm a')))

          return {
            ...cell,
            reminders,
          }
        }
        return cell
      }))

      return {
        ...state,
        month,
      }
    }
    case ACTION.SELECT_REMINDER: {
      const day = state.month.flat().find((d) => d.number === action.payload.number)
      const reminder = day.reminders.find((r) => r.id === action.payload.id)

      return {
        ...state,
        selectedReminder: {
          reminder,
          number: action.payload.number,
        },
      }
    }
    default:
      return state
  }
}

export default reducer
