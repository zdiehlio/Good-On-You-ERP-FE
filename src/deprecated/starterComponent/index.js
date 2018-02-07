import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { updateCause } from '../../actions'

class SuppDataImage extends Component {
  renderField(field) {
    return(
      <div>
        <h6>{field.label}</h6>
        <input
          placeholder={field.label}
          type={field.type}
          {...field.input}
        />
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

      </form>
    )
  }
}

export default reduxForm({
  form: ''
})(
  connect(null, {})()
)
