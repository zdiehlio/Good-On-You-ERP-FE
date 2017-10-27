import React, {Component} from 'react'

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
  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event){
    event.preventDefault();
  }

  render() {
    return(
      <form className='contact-form'>
        <h6>Brand Name</h6>
        <input
          placeholder='contact name'
          name='contactName'
          value={this.state.contactName}
          onChange={this.handleChange}
        />
        <h6>Brand Name</h6>
        <input
          placeholder='name of brand'
          name='contactEmail'
          value={this.state.contactEmail}
          onChange={this.handleChange}
        />
        <h6>Brand Name</h6>
        <input
          placeholder='name of brand'
          name='goyManager'
          value={this.state.goyManager}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}

export default BrandContact
