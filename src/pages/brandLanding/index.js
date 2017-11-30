import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { fetchGeneral } from '../../actions'

import './brandLanding.css'

class BrandLanding extends Component {

  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchGeneral(id, 'general')
  }


  render() {
    const  id   = this.props.match.params.id
    const props = this.props.qa
    console.log(this.props.qa);
    return(
      <div className='summary-container'>
        <div className='summary-heading'>Create a brand for: <h1>{props.name}</h1></div>
        <p className='small-divider'></p>
        <div className='summary-heading'>URL: <h5>{props.website}</h5></div>
        <p className='small-divider'></p>
        <div className='summary-heading'><h1>Brand Overview</h1></div>
        <p className='divider'></p>
        <div className='summary-view'>
          <div>General</div>
          <div><Link to={`/brandGeneral/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Contact Details</div>
          <div><Link to={`/brandContact/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>

        <div className='summary-heading'><h1>Qualitative Ratings</h1></div>
        <p className='divider'></p>
        <div className='summary-view'>
          <div>Causes</div>
          <div><Link to={`/brandCauses/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Sentence</div>
          <div><Link to={`/brandSentences/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Summary</div>
          <div><Link to={`/brandSummary/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>

        <div className='summary-heading'><h1>Supplementary Data</h1></div>
        <p className='divider'></p>
        <div className='summary-view'>
          <div>Social Media</div>
          <div><Link to={`/suppDataSocialMedia/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Categories</div>
          <div><Link to={`/suppDataCategory/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Styles</div>
          <div><Link to={`/suppDataStyles/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Product Types</div>
          <div><Link to={`/suppDataTypes/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Price</div>
          <div><Link to={`/suppDataPrice/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Gender</div>
          <div><Link to={`/suppDataGender/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Brand Alias</div>
          <div><Link to={`/suppDataAlias/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {qa: state.qa}
}

export default connect(mapStateToProps, { fetchGeneral })(BrandLanding)
