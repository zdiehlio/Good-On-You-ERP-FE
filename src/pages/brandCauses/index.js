import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { updateAnswer } from '../../actions'

import './brandCauses.css'

class BrandCauses extends Component {
  constructor(props){
    super(props);

    this.state = {
      brandOrigin: '',
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
      <form className='contact-form'>
        <form>
        <h6>Which of the following countries are 100% of the brands final stage of productions suppliers located in?</h6>
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />Australia
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />Canada
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />New Zealand
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />USA
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />None of the Above
        </form>
        <form>
        <h6>Is the Brand Certified B-Corp?</h6>
        <h6>B-Corp</h6>
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />Is certified B-Corp
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />Is not certified B-corp
        </form>
        <form>
        <h6>Is the brand a social enterprise that provides employment for people from a disadvantaged background?</h6>
        <h6>Social Enterprise</h6>
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />Brand is a social enterprise that provides employment for people from a disadvantaged background
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />Brand is not a social enterprise that provides employment for people from a disadvantaged background
        </form>
        <form>
        <h6>Does the brand have a 1 for 1 model?</h6>
        <h6>1 for 1 *</h6>
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />Brand has a 1 for 1 model
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />Brand does not have a 1 for 1 model
        </form>
        <form>
        <h6>Is the brand Vegan?</h6>
        <h6>Vegan *</h6>
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />Brand is 100% Vegan
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />Brand is not Vegan
        </form>
        <form>
        <h6>Are 100% of products certified Fair Trade?</h6>
        <h6>Fair Trade *</h6>
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />100% of products are certified Fair Trade
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />-50% of products are certified Fair Trade
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />There is no evidence of any/many products being certified Fair Trade
        </form>
        <form>
        <h6>Are 100% of products made from certified Organic materials?</h6>
        <h6>Organic Materials *</h6>
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />100% of products are made from certified Organic materials
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />-50% of products are made from certified Organic materials
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />There is no evidence of any/many products are made from certified Organic materials
        </form>
        <form>
        <h6>Are 100% of products made from a substantial proportion(-50%) of recycled/upcycled materials?</h6>
        <h6>Recycled *</h6>
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />100% of products are made from as substantial proportion recycled/upcycled materials
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />-50% of products are made from as substantial proportion recycled/upcycled materials
          <Field
            type= 'radio'
            name='brandOrigin'
            onChange={this.handleChange}
            component={this.renderField}
          />There is no evidence that any/many products are made from as substantial proportion recycled/upcycled materials
        </form>
      </form>
    )
  }
}

export default reduxForm({
  form: 'BrandCausesForm'
})(
  connect(null, { updateAnswer })(BrandCauses)
)
