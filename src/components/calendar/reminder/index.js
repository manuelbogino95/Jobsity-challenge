import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field, getFormValues } from 'redux-form'
import DatePicker from 'react-datepicker'
import { CirclePicker } from 'react-color'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './reminder.module.css'
import {
  addReminder as addReminderAction,
  editReminder as editReminderAction,
  deleteReminder as deleteReminderAction,
  showModal as showModalAction,
  getWeather as getWeatherAction,
} from '../../../redux/actions'

class Reminder extends React.Component {
  renderField = ({
    input,
    type,
    placeholder,
    maxLength,
  }) => (
    <input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...input}
      placeholder={placeholder}
      type={type}
      maxLength={maxLength}
    />
  )

  renderTimePicker = ({
    input,
    placeholder,
  }) => (
    <DatePicker
      selected={input.value}
      onChange={(value) => {
        input.onChange(value)
      }}
      placeholderText={placeholder}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="hh:mm a"
    />
  )

  renderColorPicker = ({
    input,
  }) => (
    <CirclePicker
      color={input.value}
      onChangeComplete={(color) => {
        input.onChange(color.hex)
      }}
    />
  )

  renderDropDown = ({
    input,
    options,
  }) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <select {...input}>
      <option value="">Select</option>
      { options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  )

  deleteReminderClick = () => {
    const { deleteReminder, showModal, selectedReminder } = this.props
    deleteReminder(selectedReminder.id, selectedReminder.number)
    showModal()
  }

  render() {
    const {
      showModal, handleSubmit, cities, selectedReminder,
    } = this.props

    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <span
            onClick={showModal}
            onKeyPress={showModal}
            role="button"
            tabIndex="0"
            className={styles.closeButton}
          >
            &times;
          </span>
          <div className={styles.container}>
            <div className={styles.modalHeader}>
              <div>REMINDER</div>
            </div>
            <div className={styles.modalFields}>
              <div className={styles.fieldContainer}>
                <Field
                  name="note"
                  component={this.renderField}
                  placeholder="Reminder"
                  type="text"
                  maxLength="30"
                />
              </div>
              <div className={styles.fieldContainer}>
                <Field
                  name="time"
                  component={this.renderTimePicker}
                  placeholder="Reminder Time"
                />
              </div>
              <div className={styles.fieldContainer}>
                <Field
                  name="city"
                  className={styles.dropDown}
                  component={this.renderDropDown}
                  options={cities}
                />
              </div>
              <div className={styles.fieldContainer}>
                <Field
                  name="color"
                  component={this.renderColorPicker}
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button type="button" onClick={showModal}>
                Cancel
              </button>
              <button className={styles.saveButton} type="button" onClick={handleSubmit}>
                Save
              </button>
            </div>
            {
              selectedReminder && selectedReminder.id ? (
                <button className={styles.deleteButton} type="button" onClick={this.deleteReminderClick}>
                  Eliminar
                </button>
              ) : null
            }
          </div>
        </div>
      </div>
    )
  }
}

Reminder.defaultProps = {
  selectedReminder: {},
}

Reminder.propTypes = {
  showModal: PropTypes.func.isRequired,
  addReminder: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  deleteReminder: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedReminder: PropTypes.shape({
    id: PropTypes.number,
    number: PropTypes.number,
  }),
}

const mapStateToProps = (state) => {
  const { reminder, number } = state.calendar.selectedReminder
  return {
    formValues: getFormValues('reminder')(state),
    initialValues: reminder,
    number,
    cities: state.calendar.cities,
    selectedReminder: reminder,
  }
}

const mapDispatchToProps = (dispatch) => ({
  addReminder: (reminder) => dispatch(addReminderAction(reminder)),
  editReminder: (reminder, number) => dispatch(editReminderAction(reminder, number)),
  deleteReminder: (id, number) => dispatch(deleteReminderAction(id, number)),
  showModal: () => dispatch(showModalAction()),
  getWeather: (city) => dispatch(getWeatherAction(city)),
})

const onSubmit = (values, dispatch, props) => {
  const {
    addReminder,
    editReminder,
    showModal,
    getWeather,
    number,
  } = props

  if (!values.id) {
    addReminder({ ...values })
  } else {
    editReminder({ ...values }, number)
  }
  showModal()
  getWeather(values.city)
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'reminder',
  onSubmit,
})(Reminder))
