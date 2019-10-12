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
      const {
        note, time, color, city,
      } = action.payload
      let newReminder
      const month = state.month.map((row) => row.map((cell) => {
        if (cell.number === state.selectedDay) {
          const reminders = cell.reminders || []
          newReminder = {
            id: new Date().getTime(),
            note,
            time,
            color,
            city,
          }
          reminders.push(newReminder)
          newReminder.number = state.selectedDay
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
        lastReminder: newReminder,
      }
    }
    case ACTION.EDIT_REMINDER: {
      let editReminder
      const month = state.month.map((row) => row.map((cell) => {
        if (cell.number === action.payload.number) {
          const reminders = cell.reminders || []
          const reminderIndex = reminders.findIndex((r) => r.id === action.payload.reminder.id)
          editReminder = action.payload.reminder
          reminders[reminderIndex] = editReminder
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
        lastReminder: editReminder,
      }
    }
    case ACTION.DELETE_REMINDER: {
      const month = state.month.map((row) => row.map((cell) => {
        if (cell.number === action.payload.number) {
          const reminders = cell.reminders || []
          const newReminders = reminders.filter((r) => r.id !== action.payload.id)
          reminders.sort((a, b) => parseFloat(moment(a.time.getTime()).format('HH:mm a')) - parseFloat(moment(b.time.getTime()).format('HH:mm a')))

          return {
            ...cell,
            reminders: newReminders,
          }
        }
        return cell
      }))

      return {
        ...state,
        month,
      }
    }
    case ACTION.DELETE_ALL_REMINDERS: {
      const month = state.month.map((row) => row.map((cell) => {
        if (cell.number === action.payload.number) {
          return {
            ...cell,
            reminders: [],
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
    case ACTION.GET_WEATHER_SUCCESS: {
      const reminderWeather = action.payload.list.map((weatherList) => {
        const weather = weatherList.weather.shift()
        return {
          date: moment(weatherList.dt_txt).format('DD/MM/YYYY'),
          icon: weather.icon,
          description: weather.description,
        }
      }).find((forecast) => (
        forecast.date === `${state.lastReminder.number}/10/2019`
      ))

      const month = state.month.map((row) => row.map((cell) => {
        if (cell.number === state.lastReminder.number) {
          const reminders = cell.reminders || []
          const reminderIndex = reminders.findIndex((r) => r.id === state.lastReminder.id)
          const reminderWithWeather = {
            ...reminders[reminderIndex],
            reminderWeather,
          }
          reminders[reminderIndex] = reminderWithWeather

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
    default:
      return state
  }
}

export default reducer
