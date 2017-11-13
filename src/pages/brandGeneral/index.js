import React, {Component} from 'react';
import { connect } from 'react-redux'
import { updateCause } from '../../actions'
import { Field, reduxForm } from 'redux-form'

import './brandGeneral.css'

class BrandGeneral extends Component {
  constructor(props){
    super(props);

    this.state = {
      brandName: '',
      website: '',
      reportDate: '',
      reviewDate: '',
      brandSize: '',
      brandSizeCriteria: '',
      parentCompany: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params
    console.log('id', id);
  }
    handleChange(event){
      this.props.updateCause()
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

    handleSubmit(event){
      event.preventDefault();
    }

  render() {
    return(
      <div>
        <form className='brand-general'>
          <h5>What is the Brand Name and Website</h5>
          <Field label='name of brand' name='brandName' onChange={this.props.updateCause}
            component={this.renderField}
          />
          <h6>Brand Website</h6>
          <input placeholder='url' name='website' onChange={this.props.updateCause}
            component={this.renderField}
          />
          <h5>Which Month Does the Brand release its sustainability report</h5>
          <h6>Brand Name</h6>
          <input placeholder='MM/DD/YYYY' name='reportDate' onChange={this.props.updateCause}
            component={this.renderField}
          />
          <h5>Which Month Does Good On You need to review the brand?</h5>
          <h6>Brand Review Date</h6>
          <input placeholder='MM/DD/YYYY' name='reviewDate' onChange={this.props.updateCause}
            component={this.renderField}
          />
          <h5>What is the Size of the Brand?</h5>
          <h6>Brand Size</h6>
          <h6>Brand Criteria</h6>
          <input type='checkbox' onChange={this.props.updateCause}
            component={this.renderField}
          />Listed Company
          <input type='checkbox' onChange={this.props.updateCause}
            component={this.renderField}
          />Subsidiary Company
          <input type='checkbox' onChange={this.props.updateCause}
            component={this.renderField}
          />Alexa > 200k
          <input type='checkbox' onChange={this.props.updateCause}
            component={this.renderField}
          />FaceBook + Instagram > 75k
          <input type='checkbox' onChange={this.props.updateCause}
            component={this.renderField}
          />LinkedIn Employees > 50
          <input type='checkbox' onChange={this.props.updateCause}
            component={this.renderField}
          />Manual Override after company provided data satisfying Good On You criteria
          <h6>Parent Company</h6>
          <input placeholder='Parent Company Name' name='reviewDate' onChange={this.props.updateCause}
            component={this.renderField}
          />
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'BrandGeneralForm'
})(
  connect(null, { updateCause })(BrandGeneral)
)
