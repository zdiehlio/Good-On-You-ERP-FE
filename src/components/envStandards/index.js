import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EnvStandardsCompliance extends Component {

  render() {
    return(
      <div className='rating-header'>
        <div className='forms-header'><Link to={`/brandLanding/${this.props.id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/suppDataAlias/${this.props.id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Standards Compliance</h3></div>
            <div><Link to={`/env-resource/${this.props.id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
      </div>
    )
  }
}


export default EnvStandardsCompliance
