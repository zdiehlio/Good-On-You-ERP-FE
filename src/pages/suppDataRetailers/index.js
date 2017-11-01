import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { updateAnswer } from '../../actions'

class SuppDataRetailers extends Component {
  renderField(field) {
    return(
      <div>
          <label>
            {field.label}
            <input
              placeholder={field.label}
              type={field.type}
              {...field.input}
            />
          </label>
      </div>
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
        <h6>What is the main online Retailer?</h6>
        <Field type='text' label='Retailer Name' component={this.renderField} />
        <Field type='text' label='Retailer Website' component={this.renderField} />
      </form>
    )
  }
}

export default reduxForm({
  form: 'SuppDataRetailersForm'
})(
  connect(null, { updateAnswer })(SuppDataRetailers)
)
