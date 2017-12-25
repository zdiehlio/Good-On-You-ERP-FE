import React, { Component } from 'react'

import './suppHeading.css'

class SuppHeading extends Component {


  render() {
    return(
      <div className='forms-header'>
        <div className='overview-header'>Brand Overview</div>
        <div>>></div>
        <div className='rating-header'>Rating</div>
        <div>>></div>
        <div className='qualitative-header'>Qualitative Ratings</div>
        <div>>></div>
        <div className='suppData-header'>Supplementary Data</div>
        <p className='divider'></p>
      </div>
    )
  }
}


export default SuppHeading
