import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './suppHeading.css'

class SuppHeading extends Component {

  render() {
    const  id   = this.props.id
    const brand = this.props.brand
    return(
      <div className='forms-header'>
        <div className='qa-heading'>Rate a Brand for: <h1>{brand.name}</h1></div>
        <p className='small-divider'></p>
        <div className='qa-heading'>URL: <h5>{brand.website}</h5></div>
        <p className='small-divider'></p>
        <Link to={`/brandGeneral/${id}`}><div>Brand Overview</div></Link>
        <div>>></div>
        <Link to={`/resource/${id}`}><div>Rating</div></Link>
        <div>>></div>
        <Link to={`/brandCauses/${id}`}><div>Qualitative Ratings</div></Link>
        <div>>></div>
        <Link to={`/suppDataSocialMedia/${id}`}><div className='suppData-header'>Supplementary Data</div></Link>
        <p className='divider'></p>
      </div>
    )
  }
}


export default SuppHeading
