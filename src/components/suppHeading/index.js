import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './suppHeading.css'

class SuppHeading extends Component {

  render() {
    const  id   = this.props.id
    return(
      <div className='forms-header'>
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
