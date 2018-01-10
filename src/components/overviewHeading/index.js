import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './overviewHeading.css'

class OverviewHeading extends Component {

  render() {
    const  id   = this.props.id
    const brand = this.props.brand
    console.log('header props', this.props)
    return(
      <div className='forms-header'>
        <div className='summary-heading'>Brand: <h5>{brand.name}</h5></div>
        <p className='small-divider'></p>
        <div className='summary-heading'>URL: <h5>{brand.website}</h5></div>
        <p className='small-divider'></p>
        <Link to={`/brandGeneral/${id}`}><div className='overview-header'>Brand Overview</div></Link>
        <div>>></div>
        <Link to={`/resource/${id}`}><div>Rating</div></Link>
        <div>>></div>
        <Link to={`/brandCauses/${id}`}><div>Qualitative Ratings</div></Link>
        <div>>></div>
        <Link to={`/suppDataSocialMedia/${id}`}><div>Supplementary Data</div></Link>
        <p className='divider'></p>
      </div>
    )
  }
}


export default OverviewHeading
