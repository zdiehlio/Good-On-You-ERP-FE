import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class HeaderAngora extends Component {

  render() {
    return(
      <div className='rating-header'>
        <div className='forms-header'><Link to={`/brandLanding/${this.props.id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/feathers/${this.props.id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Animal/Angora</h3></div>
            <div><Link to={`/hairs/${this.props.id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
      </div>
    )
  }
}


export default HeaderAngora
