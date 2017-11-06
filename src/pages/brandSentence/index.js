import React, { Componenet } from 'react'
import { Field, redux-form } from 'redux-form'
import { connect } from 'react-redux'
import { updateAnswer } from '../../actions'

import './brandSentence.css'

class BrandSentence extends Componenet {

  renderField(field) {
    return(
      <div>
        <h6>{field.label}</h6>
        <input
          placeholder={field.label}
          type={field.type}
          value={field.value}
          {...field.input}
        />
      </div>
    )
  }

  handleChange(event){
    this.props.updateAnswer()
  }

  render() {
    return(
      <form>
      <h5>What is the one sentence that describes the brand best?</h5>
      <p>Select one of the proposed sentences shown below.  If required, edit it and then choose save</p>
      <Field
        label='name of brand'
        name='brandName'
        type='radio'
        value='New Zealands premium casual lifestyle brand for men and women'
        component={this.renderField}
      />
      </form>
    )
  }
}

export default reduxForm({
  form: 'BrandSentenceForm'
})(
  connect(null, { updateAnswer })(BrandSentence)
)
