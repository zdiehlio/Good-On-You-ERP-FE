import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { updateCause } from '../../actions'

class SuppDataPrice extends Component {
  renderField(field) {
    return(
        <label>
          <input
            value={field.value}
            type='radio'
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
        <form>
          <h6>What is the Price Guideline?</h6>
          <Field label='$' component={this.renderField} />
          <Field label='$$' component={this.renderField} />
          <Field label='$$$' component={this.renderField} />
          <Field label='$$$' component={this.renderField} />
        </form>
      </form>
    )
  }
}

export default reduxForm({
  form: 'SuppDataPriceForm'
})(
  connect(null, { updateCause })(SuppDataPrice)
)
