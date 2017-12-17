import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class HeaderSuppliers extends Component {

  render() {
    console.log('params', this.props);
    return(
      <div className='rating-header'>
        <div className='forms-header'><Link to={`/brandLanding/${this.props.id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/wages/${this.props.id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Labour/Suppliers</h3></div>
            <div><Link to={`/practices/${this.props.id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
      </div>
    )
  }
}


export default HeaderSuppliers
