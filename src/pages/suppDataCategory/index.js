import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Multiselect } from 'react-widgets'
import { updateAnswer } from '../../actions'


class SuppDataCategory extends Component {

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
        <div>
        Categories
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'suppDataForm'
})(
  connect(null, {updateAnswer})(SuppDataCategory)
)
