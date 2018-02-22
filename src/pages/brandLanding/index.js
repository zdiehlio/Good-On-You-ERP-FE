import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { fetchBrandInfo } from '../../actions'
import { fetchRatingScore } from '../../actions/rating'
import { fetchGeneral } from '../../actions/general'
import { fetchContact } from '../../actions/contact'
import { fetchAlias } from '../../actions/alias'
import { fetchCause } from '../../actions/cause'
import { fetchSentence } from '../../actions/sentence'
import { fetchSummary } from '../../actions/summary'
import { fetchSocial } from '../../actions/socialMedia'
import { fetchImage, fetchLogo } from '../../actions/image'
import { fetchStyles } from '../../actions/style'
import { fetchBrandCategory } from '../../actions/category'
import { fetchType} from '../../actions/type'
import { fetchRetailers} from '../../actions/retailer'
import { fetchSku} from '../../actions/sku'


import { Icon, Loader } from 'semantic-ui-react'
import _ from 'lodash'

import './brandLanding.css'

class BrandLanding extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: null,
      styleArr: [],
      generalProgress: 0,
      contactProgress: 0,
      aliasProgress: 0,
      causeProgress: 0,
      sentenceProgress: 0,
      summaryProgress: 0,
      socialProgress: 0,
      imageProgress: 0,
      genderProgress: 0,
      priceProgress: 0,
      categoryProgress: 0,
      typeProgress: 0,
      retailerProgress: 0,
      skuProgress: 0,
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
    this.props.fetchAlias(id)
    this.props.fetchCause(id)
    this.props.fetchSentence(id)
    this.props.fetchSummary(id)
    this.props.fetchSocial(id)
    this.props.fetchImage(id)
    this.props.fetchLogo(id)
    this.props.fetchStyles(id)
    this.props.fetchBrandCategory(id)
    this.props.fetchType(id)
    this.props.fetchRetailers(id)
    this.props.fetchSku(id)
    this.setState({
      loadingHeader: true,
      loadingGeneral: true,
      loadingContact: true,
      loadingAlias: true,
      loadingRating: true,
      loadingCause: true,
      loadingSentence: true,
      loadingSummary: true,
      loadingSocial: true,
      loadingImage: true,
      loadingCategory: true,
      loadingStyle: true,
      loadingProduct: true,
      loadingRetailer: true,
      loadingSku: true,
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.general !== this.props.general) {
      this.setState({loadingGeneral: false})
      if(nextProps.general.name) {
        this.state.generalProgress++
      }
      if(nextProps.general.size) {
        this.state.generalProgress++
      }
    }
    if(nextProps.contact !== this.props.contact) {
      this.setState({loadingContact: false})
      if(nextProps.contact.contact) {
        this.state.contactProgress++
      }
    }
    if(nextProps.alias !== this.props.alias) {
      this.setState({loadingAlias: false})
      if(nextProps.alias.length > 0) {
        this.state.aliasProgress++
      }
    }
    if(nextProps.score !== this.props.score) {
      this.setState({loadingRating: false})
    }
    if(nextProps.cause !== this.props.cause) {
      this.setState({loadingCause: false})
      nextProps.cause.map(val => {
        this.state.causeProgress++
      })
    }
    if(nextProps.sentence !== this.props.sentence) {
      this.setState({loadingSentence: false})
      if(nextProps.sentence.length > 0) {
        this.state.sentenceProgress++
      }
    }
    if(nextProps.summary !== this.props.summary) {
      this.setState({loadingSummary: false})
      if(nextProps.summary.length > 0) {
        this.state.summaryProgress++
      }
    }
    if(nextProps.social !== this.props.social) {
      this.setState({loadingSocial: false})
      if(nextProps.social.facebook_url) {
        this.state.socialProgress++
      }
      if(nextProps.social.instagram_url) {
        this.state.socialProgress++
      }
    }
    if(nextProps.image !== this.props.image) {
      this.setState({loadingImage: false})
      if(nextProps.image.length > 0) {
        this.state.imageProgress++
      }
    }
    if(nextProps.logo !== this.props.logo) {
      if(nextProps.logo.length > 0) {
        this.state.imageProgress++
      }
    }
    if(nextProps.styles !== this.props.styles) {
      this.setState({loadingStyle: false})
      nextProps.styles.map(style => {
        if(style.style_qa.question === 'gender') {
          this.state.genderProgress++
        } else if(style.style_qa.question === 'price') {
          this.state.priceProgress++
        } else {
          if(this.state.styleArr.includes(style.style_qa.question)) {
            console.log('style array', this.state.styleArr)
          } else {
            this.state.styleArr.push(style.style_qa.question)
          }
        }
      })
    }
    if(nextProps.categories !== this.props.categories) {
      this.setState({loadingCategory: false})
      if(nextProps.categories.length > 0) {
        this.state.categoryProgress++
        nextProps.categories.map(val => {
          if(val.dominant === true) {
            this.state.categoryProgress++
          }
        })
      }
    }
    if(nextProps.types !== this.props.types) {
      this.setState({loadingProduct: false})
      if(nextProps.types.length > 0) {
        this.state.typeProgress++
      }
    }
    if(nextProps.retailer !== this.props.retailer) {
      this.setState({loadingRetailer: false})
      if(nextProps.retailer.length > 0) {
        if(nextProps.retailer[0].name) {
          this.state.retailerProgress++
        }
        // nextProps.retailer.map(val => {
        //   if(val.name && val.online_only) {
        //     this.state.retailerProgress++
        //   }
        // })
      }
    }
    if(nextProps.sku !== this.props.sku) {
      this.setState({loadingSku: false})
      if(nextProps.sku.sku) {
        this.state.skuProgress++
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
    console.log('props', props.sku)
    return(
      <div className='summary-container'>
        <div className='landing-header'>
          <span className='landing-brand'>
            <div className='summary-heading'>Rate a brand for: {state.loadingGeneral === true ? <Loader active inline='centered' /> : <h1> {props.general.name}</h1>}</div>
            <p className='small-divider'></p>
            <div className='summary-heading'>URL: {state.loadingGeneral === true ? <Loader active inline='centered' /> : <h5>{props.general.website}</h5>}</div>
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
        {state.loadingGeneral === true ? <Loader active inline='centered' /> :
          <div className='summary-view'>
            <div>General</div>
            <div><p className='progress'>{state.generalProgress >= 2 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
            <div><Link to={`/brandGeneral/${id}`}><button>{state.generalProgress >= 2 ? 'View' : 'Start'}</button></Link></div>
          </div>}
        <p className='small-divider'></p>
        {state.loadingContact === true ? <Loader active inline='centered' /> :
          <div className='summary-view'>
            <div>Contact Details</div>
            <div><p className='progress'>{state.contactProgress >= 1 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
            <div><Link to={`/brandContact/${id}`}><button>{state.contactProgress >= 1 ? 'View' : 'Start'}</button></Link></div>
          </div>}
        <p className='small-divider'></p>
        {state.loadingAlias === true ? <Loader active inline='centered' /> :
          <div className='summary-view'>
            <div>Alternative Names / Spelling</div>
            <div><p className='progress'>{state.aliasProgress >= 1 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
            <div><Link to={`/suppDataAlias/${id}`}><button>{state.aliasProgress >= 1 ? 'View' : 'Start'}</button></Link></div>
          </div>}
        <p className='small-divider'></p>

        {state.loadingRating === true ? <Loader active inline='centered' /> :
          <div className='summary-heading'>
            <div><h1>Ratings</h1></div>
            <div className='rating-score'>
              {props.score.score ? <div>{props.score.score}{props.score.max_score ? `/${props.score.max_score}` : ''}</div> : <div><Icon name='remove' color='red' />
              </div>}
            </div>
            <div>
              {props.score.dots >= 1 ? <Icon name='circle'/> : <Icon name='circle thin' />}
              {props.score.dots >= 2 ? <Icon name='circle'/> : <Icon name='circle thin' />}
              {props.score.dots >= 3 ? <Icon name='circle'/> : <Icon name='circle thin' />}
              {props.score.dots >= 4 ? <Icon name='circle'/> : <Icon name='circle thin' />}
              {props.score.dots >= 5 ? <Icon name='circle'/> : <Icon name='circle thin' />}
            </div>
            <div>{props.score.label}</div>
          </div>}
        <p className='divider'></p>

        {state.loadingRating === true ? <Loader active inline='centered' /> :
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
          </div>}
        <p className='small-divider'></p>

        {state.loadingRating === true ? <Loader active inline='centered' /> :
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
                <p className='small-divider'></p>
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
          </div>}
        <p className='small-divider'></p>

        {state.loadingRating === true ? <Loader active inline='centered' /> :
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
          </div>}
        <p className='small-divider'></p>

        <div className='summary-heading'><h1>Qualitative Ratings</h1></div>
        <p className='divider'></p>
        {state.loadingCause === true ? <Loader active inline='centered' /> :
          <div className='summary-view'>
            <div>Causes</div>
            <div><p className='progress'>{state.causeProgress >= 8 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
            <div><Link to={`/brandCauses/${id}`}><button>{state.causeProgress >= 1 ? 'View' : 'Start'}</button></Link></div>
          </div>}
        <p className='small-divider'></p>

        {state.loadingSentence === true ? <Loader active inline='centered' /> :
          <div className='summary-view'>
            <div>Sentence</div>
            <div><p className='progress'>{state.sentenceProgress >= 1 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
            <div><Link to={`/brandSentences/${id}`}><button>{state.sentenceProgress >= 1 ? 'View' : 'Start'}</button></Link></div>
          </div>}
        <p className='small-divider'></p>

        {state.loadingSummary === true ? <Loader active inline='centered' /> :
          <div className='summary-view'>
            <div>Summary</div>
            <div><p className='progress'>{state.summaryProgress >= 1 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
            <div><Link to={`/brandSummary/${id}`}><button>{state.summaryProgress >= 1 ? 'View' : 'Start'}</button></Link></div>
          </div>}
        <p className='small-divider'></p>

        <div className='summary-heading'><h1>Supplementary Data</h1></div>
        <p className='divider'></p>
        {state.loadingSocial === true ? <Loader active inline='centered' /> :
          <div className='summary-view'>
            <div>Social Media</div>
            <div><p className='progress'>{state.socialProgress >= 2 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
            <div><Link to={`/suppDataSocialMedia/${id}`}><button>{state.socialProgress >= 2 ? 'View' : 'Start'}</button></Link></div>
          </div>}
        <p className='small-divider'></p>

        {state.loadingImage === true ? <Loader active inline='centered' /> :
          <div className='summary-view'>
            <div>Images</div>
            <div><p className='progress'>{state.imageProgress >= 2 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
            <div><Link to={`/suppDataImage/${id}`}><button>{state.imageProgress >= 2 ? 'View' : 'Start'}</button></Link></div>
          </div>}
        <p className='small-divider'></p>

        {state.loadingStyle === true ? <Loader active inline='centered' /> :
          <div className='summary-view'>
            <div>Genders/Ages</div>
            <div><p className='progress'>{state.genderProgress >= 1 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
            <div><Link to={`/suppDataGender/${id}`}><button>{state.genderProgress >= 1 ? 'View' : 'Start'}</button></Link></div>
          </div>}
        <p className='small-divider'></p>

        {state.loadingCategory === true ? <Loader active inline='centered' /> :
          <div className='summary-view'>
            <div>Categories</div>
            <div><p className='progress'>{state.categoryProgress >= 2 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
            <div><Link to={`/suppDataCategory/${id}`}><button>{state.categoryProgress >= 2 ? 'View' : 'Start'}</button></Link></div>
          </div>}
        <p className='small-divider'></p>

        {state.loadingSku === true ? <Loader active inline='centered' /> :
          <div className='summary-view'>
            <div>Number of SKUs</div>
            <div><p className='progress'>{state.skuProgress >= 1 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
            <div><Link to={`/suppDataSku/${id}`}><button>{state.skuProgress >= 1 ? 'View' : 'Start'}</button></Link></div>
          </div>}
        <p className='small-divider'></p>

        {state.loadingStyle === true ? <Loader active inline='centered' /> :
          <div className='summary-view'>
            <div>Styles</div>
            <div><p className='progress'>{state.styleArr.length >= 13 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
            <div><Link to={`/suppDataStyles/${id}`}><button>{state.styleArr.length >= 13 ? 'View' : 'Start'}</button></Link></div>
          </div>}
        <p className='small-divider'></p>

        {state.loadingProduct === true ? <Loader active inline='centered' /> :
          <div className='summary-view'>
            <div>Product Types</div>
            <div><p className='progress'>{state.typeProgress >= 1 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
            <div><Link to={`/suppDataTypes/${id}`}><button>{state.typeProgress >= 1 ? 'View' : 'Start'}</button></Link></div>
          </div>}
        <p className='small-divider'></p>

        {state.loadingStyle === true ? <Loader active inline='centered' /> :
          <div className='summary-view'>
            <div>Price</div>
            <div><p className='progress'>{state.priceProgress >= 1 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
            <div><Link to={`/suppDataPrice/${id}`}><button>{state.priceProgress >= 1 ? 'View' : 'Start'}</button></Link></div>
          </div>}
        <p className='small-divider'></p>

        {state.loadingRetailer === true ? <Loader active inline='centered' /> :
          <div className='summary-view'>
            <div>Retailers</div>
            <div><p className='progress'>{state.retailerProgress >= 1 ? <Icon name='checkmark' color='green' /> : <Icon name='remove' color='red' />}</p></div>
            <div><Link to={`/suppDataRetailers/${id}`}><button>{state.retailerProgress >= 1 ? 'View' : 'Start'}</button></Link></div>
          </div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    contact: state.contact,
    general: state.general,
    score: state.ratingScore,
    alias: state.alias,
    cause: state.causes,
    sentence: state.sentence,
    summary: state.summary,
    social: state.social,
    image: state.image,
    logo: state.logo,
    styles: state.styles,
    categories: state.categories,
    types: state.types,
    retailer: state.retailer,
    sku: state.sku,
  }
}

export default connect(mapStateToProps, {
  fetchGeneral,
  fetchContact,
  fetchBrandInfo,
  fetchRatingScore,
  fetchAlias,
  fetchCause,
  fetchSentence,
  fetchSummary,
  fetchSocial,
  fetchImage,
  fetchLogo,
  fetchStyles,
  fetchBrandCategory,
  fetchType,
  fetchRetailers,
  fetchSku,
})(BrandLanding)
