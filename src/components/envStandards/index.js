import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EnvStandardsCompliance extends Component {

  render() {
    return(
      <div className='rating-header'>
        <div className='forms-header'><button onClick>Back to Summary</button></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={this.props.prevPage}><button className='previous'>Previous</button></Link></div>
            <div><h3>Environment / Standards Compliance</h3></div>
            <div><Link to={this.props.nextPage}><button className='next'>Next</button></Link></div>
          </span>
        </div>
      </div>
    )
  }
}


export default EnvStandardsCompliance
