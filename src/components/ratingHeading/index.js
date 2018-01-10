import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './ratingHeading.css'

class RatingHeading extends Component {

  render() {
    const  id   = this.props.id
    const brand = this.props.brand
    return(
      <div className='forms-header'>
        <div className='summary-heading'>Brand: <h5>{brand.name}</h5></div>
        <p className='small-divider'></p>
        <div className='summary-heading'>URL: <h5>{brand.website}</h5></div>
        <Link to={`/brandGeneral/${id}`}><div>Brand Overview</div></Link>
        <div>>></div>
        <Link to={`/resource/${id}`}><div className='rating-header'>Rating</div></Link>
        <div>>></div>
        <Link to={`/brandCauses/${id}`}><div>Qualitative Ratings</div></Link>
        <div>>></div>
        <Link to={`/suppDataSocialMedia/${id}`}><div>Supplementary Data</div></Link>
        <p className='divider'></p>
      </div>
    )
  }
}


export default RatingHeading
