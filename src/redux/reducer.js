import initialState from './initialValues'
import * as ACTION from './consts'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.SELECT_DAY:
      return {
        ...state,
        selectedDay: action.payload,
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
