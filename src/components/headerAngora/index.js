import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class HeaderAngora extends Component {

  render() {
    const id = 1
    console.log('params', this.props);
    return(
      <div className='forms-header'>
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/feathers/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Animal/Angora</h3></div>
            <div><Link to={`/hairs/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
      </div>
    )
  }
}


export default HeaderAngora
