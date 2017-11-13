import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

class BrandLanding extends Component {

  render() {
    const  id   = this.props.match.params.id
    return(
      <div>
        <div className='summary-view'>
          Brand Causes
          <Link to={`/brandCauses/${id}`}><button>Start</button></Link>
        </div>
        <div className='summary-view'>
          Brand Sentences
          <Link to={`/brandSentences/${id}`}><button>Start</button></Link>
        </div>
        <div className='summary-view'>
          Brand Summary
          <Link to={`/brandSummary/${id}`}><button>Start</button></Link>
        </div>
        <div className='summary-view'>
          Brand Categories
          <Link to={`/suppDataCategory/${id}`}><button>Start</button></Link>
        </div>
      </div>
    )
  }
}

export default BrandLanding
