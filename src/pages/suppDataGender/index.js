import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { updateAnswer } from '../../actions'

class SuppDataGender extends Component {
  renderField(field) {
    return(
        <label>
          <input
            value={field.value}
            type='checkbox'
          />
          {field.label}
        </label>
    )
  }
  handleChange(event){
    console.log(this.props.state);
  }
  handleSubmit(event){
    event.preventDefault();
  }
  render() {
    return(
      <form>
        <h6>What are the genders offered by the brand?</h6>
        <Field label='Children' component={this.renderField} />
        <Field label='Women' component={this.renderField} />
        <Field label='Men' component={this.renderField} />
      </form>
    )
  }
}

export default reduxForm({
  form: 'SuppDataGenderForm'
})(
  connect(null, { updateAnswer })(SuppDataGender)
)
