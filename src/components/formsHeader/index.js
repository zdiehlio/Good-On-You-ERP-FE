import React, { Component } from 'react'

import './formsHeader.css'

class FormsHeader extends Component {

  render() {
    return(
      <div className='forms-header'>
        <div>Brand Overview</div>
        <div>>></div>
        <div>Rating</div>
        <div>>></div>
        <div>Qualitative Ratings</div>
        <div>>></div>
        <div>Supplementary Data</div>
        <span className='form-navigation'>
          <div><button className='previous'>Previous</button></div>
          <div><h3>Causes</h3></div>
          <div><button className='next'>Next</button></div>
        </span>
      </div>
    )
  }
}

export default FormsHeader
