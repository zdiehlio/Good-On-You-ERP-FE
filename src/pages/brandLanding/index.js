import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

class BrandLanding extends Component {

  render() {
    const  id   = this.props.match.params.id
    return(
      <div>
        <Link to={`/brandCauses/${id}`}>Brand Causes</Link>
      </div>
    )
  }
}

export default BrandLanding
