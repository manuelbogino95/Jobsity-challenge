import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { reduxForm, Field, getFormValues } from 'redux-form'
import DatePicker from 'react-datepicker'
import { CirclePicker } from 'react-color'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './reminder.module.css'
import {
  addReminderAction,
  showModal as showModalAction,
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

  renderDateTimePicker = ({
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
      dateFormat="hh:mm"
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

  render() {
    const { showModal, handleSubmit } = this.props

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
                  name="date"
                  component={this.renderDateTimePicker}
                  placeholder="Reminder Time"
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
          </div>
        </div>
      </div>
    )
  }
}

Reminder.propTypes = {
  showModal: PropTypes.func.isRequired,
  addReminder: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  formValues: getFormValues('reminder')(state),
})

const mapDispatchToProps = (dispatch) => ({
  addReminder: (reminder) => dispatch(addReminderAction(reminder)),
  showModal: () => dispatch(showModalAction()),
})

const onSubmit = (values, dispatch, props) => {
  const { addReminder, showModal } = props
  addReminder({ ...values, time: moment(values.date).format('HH.mm') })
  showModal()
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'reminder',
  onSubmit,
})(Reminder))
