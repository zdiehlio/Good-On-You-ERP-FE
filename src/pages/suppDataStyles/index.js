import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, Fields, reduxForm } from 'redux-form'
import { SelectList } from 'react-widgets'
import { updateAnswer } from '../../actions'

class SuppDataStyles extends Component {
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
          <h6>Does this Brand Sell Clothes for Children?</h6>
          <Field label='Yes' component={this.renderField} />
          <Field label='No' component={this.renderField} />
        </form>
        <form>
          <h6>Does this Brand Sell Clothes for Men?</h6>
          <Field label='Yes' component={this.renderField} />
          <Field label='No' component={this.renderField} />
        </form>
        <form>
          <h6>Does this Brand Sell Clothes for Older Women?</h6>
          <Field label='Yes' component={this.renderField} />
          <Field label='No' component={this.renderField} />
        </form>
        <form>
          <h6>Does this Brand Sell Clothes for Younger Women?</h6>
          <Field label='Yes' component={this.renderField} />
          <Field label='No' component={this.renderField} />
        </form>
        <form>
          <h6>Where is the brand Designed?</h6>
          <Field label='Yes' component={this.renderField} />
          <Field label='No' component={this.renderField} />
        </form>
        <form>
          <h6>Does the brand sell basics?</h6>
          <Field label='Yes' component={this.renderField} />
          <Field label='No' component={this.renderField} />
        </form>
        <form>
          <h6>Does the brand sell luxury clothes?</h6>
          <Field label='Yes' component={this.renderField} />
          <Field label='No' component={this.renderField} />
        </form>
        <form>
          <h6>Does the brand sell bags?</h6>
          <Field label='Yes' component={this.renderField} />
          <Field label='No' component={this.renderField} />
        </form>
        <form>
          <h6>Does the brand sell fitness clothes?</h6>
          <Field label='Yes' component={this.renderField} />
          <Field label='No' component={this.renderField} />
        </form>
        <form>
          <h6>Does the brand sell shoes?</h6>
          <Field label='Yes' component={this.renderField} />
          <Field label='No' component={this.renderField} />
        </form>
        <form>
          <h6>Does the brand sell underwear?</h6>
          <Field label='Yes' component={this.renderField} />
          <Field label='No' component={this.renderField} />
        </form>
      </form>
    )
  }
}

export default reduxForm({
  form: 'SuppDataStylesForm'
})(
  connect(null, { updateAnswer })(SuppDataStyles)
)
