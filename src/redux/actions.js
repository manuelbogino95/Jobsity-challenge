import * as ACTION from './consts'

export const addReminderAction = (reminder) => ({
  type: ACTION.ADD_REMINDER,
  payload: reminder,
})

export const showModal = () => ({
  type: ACTION.SHOW_MODAL,
})

export const selectDay = (day) => ({
  type: ACTION.SELECT_DAY,
  payload: day,
})
