import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { fetchBrandInfo } from '../../actions'
import { fetchRatingScore } from '../../actions/rating'
import { fetchGeneral } from '../../actions/general'
import { fetchContact } from '../../actions/contact'
import { Icon } from 'semantic-ui-react'
import _ from 'lodash'

import './brandLanding.css'

class BrandLanding extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: null,
      generalProgress: 0,
      contactProgress: 0,
    }
    this.handleShow = this.handleShow.bind(this)
    this.handleHide = this.handleHide.bind(this)
  }

  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchBrandInfo(id, 'general')
    this.props.fetchGeneral(id, 'general')
    this.props.fetchContact(id)
    this.props.fetchRatingScore(id)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.general !== this.props.general) {
      if(nextProps.general.name) {
        this.state.generalProgress++
      }
      if(nextProps.general.review_date) {
        this.state.generalProgress++
      }
      if(nextProps.general.sustainability_report_date) {
        this.state.generalProgress++
      }
      if(nextProps.general.size) {
        this.state.generalProgress++
      }
    }
    if(nextProps.contact !== this.props.contact) {
      if(nextProps.contact.contact) {
        this.state.contactProgress++
      }
    }
  }

  handleShow(event) {
    event.preventDefault()
    this.setState({show: event.target.name})
  }

  handleHide(event) {
    event.preventDefault()
    this.setState({show: null})
  }

  capitalize(string) {
    return string[0].toUpperCase() + string.slice(1)
  }

  handleHeadline(head) {
    return _.map(this.props.score.headlines, check => {
      if(head === check.name) {
        return(
          <div key={check.name} className='rating-summary'>
            <div>{this.capitalize(check.name)}</div>
            {check.score ? (
              <div>{check.score}{check.max_score ? `/${check.max_score}` : ''}</div>
            ) : (
              <div><Icon name='remove' color='red' /></div>
            )}
            <div>{this.state.show !== head ?
              (<button name={head} onClick={this.handleShow}>Show</button>) :
              (<button name={head} onClick={this.handleHide}>Hide</button>)}
            </div>
            <div>{check.label}</div>
          </div>
        )
      }
    })
  }

  handleThemeScore(head, id) {
    return _.map(this.props.score.headlines, check => {
      if(check.name === head) {
        return _.map(check.themes, val => {
          if(val.id === id) {
            return(
              val.score ? (
                <div key={val.id}>{val.score}{val.max_score ? `/${val.max_score}` : ''}</div>
              ) : (
                <div><Icon name='remove' color='red' /></div>
              )
            )
          }
        })
      }
    })
  }

  render() {
    const  id   = this.props.match.params.id
    const props = this.props
    const state = this.state
    console.log('state', state)
    console.log('props', props.score.headlines)
    return(
      <div className='summary-container'>
        <div className='landing-header'>
          <span className='landing-brand'>
            <div className='summary-heading'>Rate a brand for: <h1>{props.general.name}</h1></div>
            <p className='small-divider'></p>
            <div className='summary-heading'>URL: <h5>{props.general.website}</h5></div>
            <p className='small-divider'></p>
          </span>
          <span className='landing-status'>
            <div>Rating status: Under Development</div>
            <p className='small-divider'></p>
            <div>Supplementary data: Under Development</div>
            <p className='small-divider'></p>
            <div>Last modified by: Under Development</div>
            <p className='small-divider'></p>
            <div>Verified by: Under Development</div>
            <p className='small-divider'></p>
          </span>
        </div>

        <div className='status-header'>
          <div>Draft</div>
          <div className='arrow-divider'>>></div>
          <div>Scraped</div>
          <div className='arrow-divider'>>></div>
          <div>Rated</div>
          <div className='arrow-divider'>>></div>
          <div>Verified</div>
          <div className='arrow-divider'>>></div>
          <div>Approved</div>
          <div className='arrow-divider'>>></div>
          <div>Published</div>
        </div>

        <div className='summary-heading'><h1>Brand Overview</h1></div>
        <p className='divider'></p>
        <div className='summary-view'>
          <div>General</div>
          <div><p className='progress'>{state.generalProgress >= 4 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
          <div><Link to={`/brandGeneral/${id}`}><button>{state.generalProgress >= 4 ? 'View' : 'Start'}</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Contact Details</div>
          <div><p className='progress'>{state.contactProgress >= 1 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
          <div><Link to={`/brandContact/${id}`}><button>{state.contactProgress >= 1 ? 'View' : 'Start'}</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Alternative Names / Spelling</div>
          <div><Link to={`/suppDataAlias/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>

        <div className='summary-heading'><h1>Ratings</h1></div>
        <p className='divider'></p>
        <div className='summary-view'>
          {this.handleHeadline('environment')}
          {this.state.show === 'environment' ? (
            <span className='show-summary'>
              <p className='small-divider'></p>
              <span className='summary-view'>
                <div>Standards Compliance</div>
                {this.handleThemeScore('environment', 1)}
                <div><Link to={`/env-standards-compliance/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'environment' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Resource</div>
                {this.handleThemeScore('environment', 2)}
                <div><Link to={`/env-resource/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'environment' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Climate Change</div>
                {this.handleThemeScore('environment', 3)}
                <div><Link to={`/env-climate-change/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'environment' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Chemicals</div>
                {this.handleThemeScore('environment', 4)}
                <div><Link to={`/env-chemicals/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'environment' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Water</div>
                {this.handleThemeScore('environment', 5)}
                <div><Link to={`/env-water/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'environment' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Positive Citizenship</div>
                {this.handleThemeScore('environment', 6)}
                <div><Link to={`/env-positive-citizenship/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'environment' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Negative Citizenship</div>
                {this.handleThemeScore('environment', 7)}
                <div><Link to={`/env-negative-citizenship/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}

        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          {this.handleHeadline('labour')}
          {this.state.show === 'labour' ? (
            <span className='show-summary'>
              <p className='small-divider'></p>
              <span className='summary-view'>
                <div>Ethical Fashion Report</div>
                {this.handleThemeScore('labour', 8)}
                <div><Link to={`/labour-ethical-fashion-report/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'labour' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Certification</div>
                {this.handleThemeScore('labour', 9)}
                <div><Link to={`/labour-certification/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'labour' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Policies & Worker Empowerment</div>
                {this.handleThemeScore('labour', 10)}
                <div><Link to={`/labour-policies-worker-empowerment/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'labour' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Supply Chain</div>
                {this.handleThemeScore('labour', 11)}
                <div><Link to={`/labour-supply-chain/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'labour' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Low Risk Production</div>
                {this.handleThemeScore('labour', 12)}
                <div><Link to={`/labour-low-risk-production/${id}`}><button>Start</button></Link></div>
              </span>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'labour' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Living Wage</div>
                {this.handleThemeScore('labour', 13)}
                <div><Link to={`/labour-living-wage/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'labour' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Knowing Suppliers</div>
                {this.handleThemeScore('labour', 14)}
                <div><Link to={`/labour-knowing-suppliers/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'labour' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Supplier Relationships & Auditing</div>
                {this.handleThemeScore('labour', 15)}
                <div><Link to={`/labour-supplier-relationships-auditing/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'labour' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Positive Citizenship</div>
                {this.handleThemeScore('labour', 16)}
                <div><Link to={`/labour-positive-citizenship/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'labour' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Negative Citizenship</div>
                {this.handleThemeScore('labour', 17)}
                <div><Link to={`/labour-negative-citizenship/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
        </div>
        <p className='small-divider'></p>

        <div className='summary-view'>
          {this.handleHeadline('animal')}
          {this.state.show === 'animal' ? (
            <span className='show-summary'>
              <p className='small-divider'></p>
              <span className='summary-view'>
                <div>Animal Products</div>
                {this.handleThemeScore('animal', 18)}
                <div><Link to={`/animal-animal-products/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'animal' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Positive Citizenship</div>
                {this.handleThemeScore('animal', 19)}
                <div><Link to={`/animal-positive-citizenship/${id}`}><button>Start</button></Link></div>
              </span>
              <p className='small-divider'></p>
            </span> ) :
            (<span className='hide-summary'></span>)}
          {this.state.show === 'animal' ? (
            <span className='show-summary'>
              <span className='summary-view'>
                <div>Negative Citizenship</div>
                {this.handleThemeScore('animal', 20)}
                <div><Link to={`/animal-negative-citizenship/${id}`}><button>Start</button></Link></div>
              </span>
            </span> ) :
            (<span className='hide-summary'></span>)}
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
          <div>Images</div>
          <div><Link to={`/suppDataImage/${id}`}><button>Start</button></Link></div>
        </div>
        <p className='small-divider'></p>
        <div className='summary-view'>
          <div>Gender/Ages</div>
          <div><Link to={`/suppDataGender/${id}`}><button>Start</button></Link></div>
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
          <div>Retailers</div>
          <div><Link to={`/suppDataRetailers/${id}`}><button>Start</button></Link></div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    contact: state.contact,
    general: state.general,
    score: state.ratingScore,
  }
}

export default connect(mapStateToProps, { fetchGeneral, fetchContact, fetchBrandInfo, fetchRatingScore })(BrandLanding)
