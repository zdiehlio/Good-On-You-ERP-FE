import React, {Component} from 'react';

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
      isChecked: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }
    handleChange(event){
      this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit(event){
      event.preventDefault();
    }
    handleCheckboxChange(){
      if({isChecked: true}){
        this.setState({isChecked: false})
      } else {
        this.setState({isChecked: true})
      }
      console.log(this.state.isChecked);
    }
  render() {
    return(
      <div>
        <form className='brand-general'>
          <h5>What is the Brand Name and Website</h5>
          <h6>Brand Name</h6>
          <input
            placeholder='name of brand'
            name='brandName'
            value={this.state.brandName}
            onChange={this.handleChange}
          />
          <h6>Brand Website</h6>
          <input
            placeholder='url'
            name='website'
            value={this.state.website}
            onChange={this.handleChange}
          />
          <h5>Which Month Does the Brand release its sustainability report</h5>
          <h6>Brand Name</h6>
          <input
            placeholder='MM/DD/YYYY'
            name='reportDate'
            value={this.state.reportDate}
            onChange={this.handleChange}
          />
          <h5>Which Month Does Good On You need to review the brand?</h5>
          <h6>Brand Review Date</h6>
          <input
            placeholder='MM/DD/YYYY'
            name='reviewDate'
            value={this.state.reviewDate}
            onChange={this.handleChange}
          />
          <h5>What is the Size of the Brand?</h5>
          <h6>Brand Size</h6>
          <h6>Brand Criteria</h6>
          <input
          type='checkbox'
          value={this.state.isChecked}
          onChange={this.handleCheckboxChange}
          />Listed Company
          <input
          type='checkbox'
          value={this.state.isChecked}
          onChange={this.handleCheckboxChange}
          />Subsidiary Company
          <input
          type='checkbox'
          value={this.state.isChecked}
          onChange={this.handleCheckboxChange}
          />Alexa > 200k
          <input
          type='checkbox'
          value={this.state.isChecked}
          onChange={this.handleCheckboxChange}
          />FaceBook + Instagram > 75k
          <input
          type='checkbox'
          value={this.state.isChecked}
          onChange={this.handleCheckboxChange}
          />LinkedIn Employees > 50
          <input
          type='checkbox'
          value={this.state.isChecked}
          onChange={this.handleCheckboxChange}
          />Manual Override after company provided data satisfying Good On You criteria
          <h6>Parent Company</h6>
          <input
            placeholder='Parent Company Name'
            name='reviewDate'
            value={this.state.reviewDate}
            onChange={this.handleChange}
          />
        </form>
      </div>
    )
  }
}

export default BrandGeneral
