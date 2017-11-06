import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { updateAnswer } from '../../actions'


import './brandContact.css'

class BrandContact extends Component {
  constructor(props){
    super(props);

    this.state = {
      contactName: '',
      contactEmail: '',
      goyManager: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderField(field) {
    return(
      <div>
        <h6>{field.label}</h6>
        <input
          placeholder={field.label}
          {...field.input}
        />
      </div>
    )
  }
  handleChange(values){
    this.props.updateAnswer(values);
  }
  handleSubmit(event){
    event.preventDefault();
  }

  render() {
    return(
      <form className='contact-form'>
        <Field
          name='contactName'
          label='Contact Name'
          onChange={this.handleChange}
          component={this.renderField}
        />
        <Field
          name='contactEmail'
          label='Contact Email'
          onChange={this.handleChange}
          component={this.renderField}
        />
        <Field
          name='goyManager'
          label='Good On You Manager'
          onChange={this.handleChange}
          component={this.renderField}
        />
      </form>
    )
  }
}

export default reduxForm({
  form: 'ContactForm'
})(
  connect(null,{ updateAnswer })(BrandContact)
)