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

export const getWeatherPending = () => ({
  type: ACTION.GET_WEATHER_PENDING,
})

export const getWeatherSuccess = (response) => ({
  type: ACTION.GET_WEATHER_SUCCESS,
  payload: response,
})

export const getWeatherError = (error) => ({
  type: ACTION.GET_WEATHER_ERROR,
  payload: error,
})

export const getWeather = (city) => (dispatch) => {
  dispatch(getWeatherPending())
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=16&APPID=1f220744bf683460c40028138ff86c00`)
    .then((res) => res.json())
    .then((response) => {
      dispatch(getWeatherSuccess(response))
    })
    .catch((error) => {
      dispatch(getWeatherError(error))
    })
}
