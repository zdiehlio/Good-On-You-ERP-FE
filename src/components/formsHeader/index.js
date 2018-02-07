import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGeneral } from '../../actions'

import './formsHeader.css'

class FormsHeader extends Component {

  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchGeneral(id, 'general')
  }

  render() {
    return(
      <div className='forms-header'>
        <div className='summary-heading'>Create a brand for: <h1>{this.props.brand.name}</h1></div>
        <p className='small-divider'></p>
        <div className='summary-heading'>URL: <h5>{this.props.brand.website}</h5></div>
        <p className='small-divider'></p>
        <div className='summary-heading'><h1>Brand Overview</h1></div>
        <p className='divider'></p>
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

function mapStateToProps(state) {
  return {brand: state.qa}
}



export default connect(mapStateToProps, { fetchGeneral })(FormsHeader)
