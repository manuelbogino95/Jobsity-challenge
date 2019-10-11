import * as ACTION from './consts'

export const addReminder = (reminder) => ({
  type: ACTION.ADD_REMINDER,
  payload: reminder,
})

export const editReminder = (reminder, number) => ({
  type: ACTION.EDIT_REMINDER,
  payload: {
    reminder,
    number,
  },
})

export const selectReminder = (id, number) => ({
  type: ACTION.SELECT_REMINDER,
  payload: { id, number },
})

export const showModal = () => ({
  type: ACTION.SHOW_MODAL,
})

export const selectDay = (day) => ({
  type: ACTION.SELECT_DAY,
  payload: day,
})
