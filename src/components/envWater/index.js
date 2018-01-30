import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EnvWater extends Component {

  render() {
    console.log('params', this.props)
    return(
      <div className='rating-header'>
        <div className='forms-header'><Link to={`/brandLanding/${this.props.id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/env-chemicals/${this.props.id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Water</h3></div>
            <div><Link to={`/env-positive-citizenship/${this.props.id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
      </div>
    )
  }
}


export default EnvWater
