import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

class BrandLanding extends Component {

  render() {
    const  id   = this.props.match.params.id
    return(
      <div>
        <div>
          <Link to={`/brandCauses/${id}`}>Brand Causes</Link>
        </div>
        <div>
          <Link to={`/brandSentences/${id}`}>Brand Sentences</Link>
        </div>
        <div>
          <Link to={`/brandSummary/${id}`}>Brand Summary</Link>
        </div>
        <div>
          <Link to={`/suppDataCategory/${id}`}>Brand Categories</Link>
        </div>
      </div>
    )
  }
}

export default BrandLanding
