import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class HeaderWater extends Component {

  render() {
    console.log('params', this.props);
    return(
      <div className='rating-header'>
        <div className='forms-header'><Link to={`/brandLanding/${this.props.id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/chemical/${this.props.id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Environment/Water</h3></div>
            <div><Link to={`/worker_policies/${this.props.id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
      </div>
    )
  }
}


export default HeaderWater
