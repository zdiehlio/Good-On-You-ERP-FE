import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

class BrandLanding extends Component {


  handleChange(event){
    console.log(this.props.state);
  }
  handleSubmit(event){
    event.preventDefault();
  }
  render() {
    return(
      <div>
        <Link to='/brandCauses/:id'>Brand Causes</Link>
      </div>
    )
  }
}

export default BrandLanding
