import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { connect } from 'react-redux'
import { fetchGeneral, updateGeneral, createBrandSize } from '../../actions/general'
import { OverviewHeading } from '../../components'
import { Form, Input, Radio, Checkbox, Progress, Portal, Segment, Loader} from 'semantic-ui-react'
import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'

import './brandGeneral.css'

const moments = date => moment(new Date(date)).format('MM/YYYY')
const dayMoment = date => moment(new Date(date)).format('DD/MM/YYYY')

class BrandGeneral extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: '',
      sizeValues: [],
      originalSizeValues: [],
      deleteSize: [],
      currentValues: [],
      noValues: [],
      parent_company: '',
      sizeOptions: ['alexa', 'insta-fb', 'linked-in', 'goy-large', 'goy-small', 'subsidiary', 'listed', 'none', 'parent'],
      input: null,
      dateValid: true,
      renderError: false,
      changeError: false,
      progressBar: 0,
      name: '',
    }

    this.brandId = this.props.match.params.id

    this.handleInput = this.handleInput.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSaveName = this.handleSaveName.bind(this)
    this.handleSaveSustainDate = this.handleSaveSustainDate.bind(this)
    this.handleSaveReviewDate = this.handleSaveReviewDate.bind(this)
    this.handleSubmitSize = this.handleSubmitSize.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleNA = this.handleNA.bind(this)
    this.handlePortal = this.handlePortal.bind(this)
    this.handleNav = this.handleNav.bind(this)
  }

  //Before componenent loads, fetch current data for Brand General Overview questions
  componentWillMount() {
    this.setState({isLoading: true})
    this.props.fetchGeneral(this.brandId, 'general')
    //if the user has been redirected from the ratings section because no size has been entered yet, state will be set to editing mode on size question
    if(this.props.location.hash === '#size') {
      this.setState({isEditing: 'size'})
    }
  }

  //if the user has been redirected with a hashlink, page will scroll directly to question specified in hashURI
  componentDidUpdate() {
    let hash = this.props.location.hash.replace('#', '')
    if (hash) {
      let node = document.getElementById(hash)
      if (node) {
        node.scrollIntoView()
      }
    }
  }
  //Once API call returns data, component will set props to state
  componentWillReceiveProps(nextProps) {
    if(nextProps.general !== this.props.general) {
      if(nextProps.general.size_criteria.length > 0) {
        //if size criteria is set to none, will set state accordingly
        if(nextProps.general.size_criteria[0].criteria === 'none') {
          this.setState({none: 'none', noValues: {name: 'none'}})
        } else {
          //if size criteria contains at least 1 criteria that is not 'none', will set push criteria into sizeValues array and set each criteria to it's own key in state
          _.map(nextProps.general.size_criteria, crit => {
            if(crit.criteria) {
              this.state.sizeValues.push({name: crit.criteria})
            }
            this.setState({[crit.criteria]: crit.criteria})
          })
        }
      }
      //Set each key value in props to it's respected state
      this.setState({
        name: nextProps.general.name,
        originalname: nextProps.general.name,
        website: nextProps.general.website,
        sustainability_report: nextProps.general.sustainability_report,
        sustainability_report_date: nextProps.general.sustainability_report_date ? moments(nextProps.general.sustainability_report_date) : '',
        review_date: nextProps.general.review_date ? moments(nextProps.general.review_date) : '',
        parent_company: nextProps.general.parent_company,
        size: nextProps.general.size,
        isLoading: false,
      })
      //if props contains name and/or size, increment progress bar by 1 for each
      if(nextProps.general.name) {
        this.state.progressBar++
      }
      if(nextProps.general.size) {
        this.state.progressBar++
      }
    }
  }

  //if another question is not currently being answered, toggles editing mode for specified question, otherwise renders change error
  handleEdit(event) {
    event.preventDefault()
    if(this.state.changeError === false) {
      this.setState({isEditing: event.target.value})
    } else {
      this.setState({renderChangeError: true, portal: true})
    }
  }

  //resets change errors, sets size values to empty array, and makes another API call to ensure all saved data is up to date while canceling changes to current question
  handleCancel(event) {
    this.setState({
      renderChangeError: false,
      changeError: false,
      isEditing: null,
      isLoading: true,
      sizeValues: [],
    })
    this.props.fetchGeneral(this.brandId, 'general')
  }

  //inputs have at least 1 character, will save inputs for name and website question sending PATCH request to API, resetting change errors
  //if save and next button is clicked it redirect user to next question automatically
  handleSaveName(event) {
    event.preventDefault()
    if(this.state.name.length <= 0) {
      this.setState({nameError: true})
    } else {
      this.props.updateGeneral(this.brandId, {name: this.state.name})
      this.setState({renderChangeError: false, changeError: false, isEditing: event.target.value === 'next' ? 'sustain' : null})
    }
  }
  //if date is valid, will save inputs for sustainability_report question sending PATCH request to API, resetting change errors
  //if save and next button is clicked it redirect user to next question automatically
  handleSaveSustainDate(event) {
    event.preventDefault()
    if(this.state.dateValid === true) {
      this.setState({
        renderChangeError: false,
        changeError: false,
        renderError: false,
        isEditing: event.target.value === 'next' ? 'review' : null,
      })
      this.props.updateGeneral(this.brandId, {
        sustainability_report: this.state.sustainability_report,
        sustainability_report_date: this.state.sustainability_report === false ? null : dayMoment(`02/${this.state.sustainability_report_date}`),
      })
    } else {
      this.setState({renderError: true})
    }
  }

  //if date is valid, will save inputs for review_date question sending PATCH request to API, resetting change errors
  //if save and next button is clicked it redirect user to next question automatically
  handleSaveReviewDate(event) {
    event.preventDefault()
    if(this.state.dateValid === true) {
      this.setState({
        renderChangeError: false,
        changeError: false,
        renderError: false,
        isEditing: event.target.value === 'next' ? 'size' : null,
      })
      this.props.updateGeneral(this.brandId, {review_date: dayMoment(`02/${this.state.review_date}`)})
    } else {
      this.setState({renderError: true})
    }
  }

  //if values exist, will save inputs for size question sending PATCH request to API, resetting change errors
  //automatically sets size according to criteria
  //if save and next button is clicked it redirect user to next page automatically
  handleSubmitSize(event) {
    event.preventDefault()
    if(this.state.sizeValues.length <= 0 && this.state.noValues <= 0) {
      this.setState({sizeError: true})
    } else if(this.state.subsidiary && this.state.parent_company.length <=0) {
      this.setState({parentError: true})
    } else {
      this.props.createBrandSize({brand: this.brandId, criteria: this.state.sizeValues.length > 0 ? this.state.sizeValues : this.state.noValues})
      this.props.updateGeneral(this.brandId, {parent_company: this.state.parent_company})
      this.setState({renderChangeError: false, changeError: false, isEditing: null})
      if(event.target.value === 'next') {
        this.props.history.push(`/brandContact/${this.brandId}`)
      }
      if(!this.props.size) {
        this.state.progressBar++
      }
    }
  }

  //sets state for specified criteria for each checkbox
  handleCheckbox(event, { value, name }) {
    const { id }  = this.props.match.params
    //if none is checked, removes all criteria from sizeValues array, sets their respective state to null, sets size to small, and pushes none key into noValues array
    if(value === 'none') {
      this.state.sizeOptions.map(val => this.setState({[val]: null}))
      this.setState({
        none: !this.state.none ? value : null,
        sizeValues: [],
        noValues: [{name: 'none'}],
        size: 'small',
      })
    //All other checkboxes will set their respective states and set size to large, and sets none to null and noValues to empty array
    } else {
      if(this.state[value]) {
        if(value === 'subsidiary') {
          this.setState({parentError: false})
        }
        this.setState({[value]: null, sizeValues: this.state.sizeValues.filter(select => {return select.name != value})})
      } else {
        this.setState({[value]: value, sizeValues: [...this.state.sizeValues, {name: value}]})
      }
      //if last selection is choses, size will be set to small but retain all selected criteria
      if(value === 'goy-small') {
        this.setState({size: this.state.size !== 'small' ? 'small' : 'large'})
      } else {
        this.setState({size: this.state['goy-small'] ? 'small' : 'large'})
      }
      this.setState({none: null, noValues: []})
    }
    //sets state to the current questions id so that if change error is triggered, user will be redirected to current question waiting to be saved/canceled
    this.setState({currentEditing: `#${name}`, changeError: true, sizeError: false})
  }

  //renders currently selected size criteria in non-editing mode
  renderCriteria() {
    return _.map(this.state.sizeValues, crit => {
      return (
        <li key={crit.name}>
          {crit.name}
        </li>
      )
    })
  }

  //if NA checkbox in sustainability_report question is checked, will remove the sustainability_report_date and set value to false
  handleNA(event) {
    event.preventDefault()
    this.setState({sustainability_report: false, sustainability_report_date: '', dateValid: true})
  }

  //use moments.js to validate that input is in MM/YYYY format
  validateDate(val) {
    let date = moment(`${val}`, 'MM/YYYY', true)
    if (date.isValid()) {
      this.setState({dateValid: true})
    } else {
      this.setState({dateValid: false})
    }
  }

  //if inputs have at least 1 character, will set state to respective names and values
  handleInput(event, {value, name}) {
    this.validateDate(value)
    if(name === 'name') {
      if(value.length >= 1) {
        this.setState({nameError: false})
      }
    }
    if(name === 'parent_company') {
      if(value.length >= 1) {
        this.setState({parentError: false})
      }
    }
    if(name === 'sustainability_report_date') {
      if(value.length > 0) {
        this.setState({sustainability_report: true})
      }
    }
    this.setState({currentEditing: name === 'parent_company' ? '#size' : `#${name}`, changeError: true, currentAnswer: name, [name]: value, input: value})
  }

  //capitalize function to be used when rendering BE text that does not have first letter capitalized
  capitalize(string) {
    return string[0].toUpperCase() + string.slice(1)
  }

  //once change error is triggered and portal opens, this will close it after user clicks to be redirected to question
  handlePortal() {
    this.setState({portal: false})
  }

  //if changeError is false, will redirect user to the previous page, next page, or back to brand landing page
  handleNav(event) {
    const { id }  = this.props.match.params
    if(this.state.changeError === true) {
      this.setState({renderChangeError: true, portal: true})
    } else {
      if(event.target.name === 'next') {
        this.props.history.push(`/brandContact/${id}`)
      } else if(event.target.name === 'landing') {
        this.props.history.push(`/brandLanding/${id}`)
      }
    }
  }

  //render questions for form, will show loading symbol until props containing data are received from BE
  render() {
    const isEditing = this.state.isEditing
    const state = this.state
    const props = this.props
    const { id }  = this.props.match.params
    return(
      <div className='form-container'>
        <OverviewHeading id={id} brand={this.props.brand}/>
        <div className='forms-header'><button onClick={this.handleNav} name='landing'>Back to Summary</button></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><button className='previous disabled' disabled>Previous</button></div>
            <div><h3>Brand General</h3></div>
            <div><button onClick={this.handleNav} name='next' className='next'>Next</button></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress total={2} value={state.progressBar} progress />
        {state.renderChangeError === true ? (
          <Portal open={state.portal} className='portal'>
            <Segment style={{ left: '35%', position: 'fixed', top: '50%', zIndex: 1000}}>
              <p>Please Save or Cancel your selected answers before proceeding</p>
              <HashLink to={state.currentEditing}><button onClick={this.handlePortal}>Go</button></HashLink>
            </Segment>
          </Portal>
        ) : ''}
        {state.isLoading === true ? <Loader active inline='centered' /> :
          <Form>
            {isEditing === 'brand' ? (
              <div className='editing' id='name'>
                <h5>What is the Brand Name and Website?</h5>
                <Form.Field inline className={state.nameError === true ? 'ui error input' : 'ui input'}>
                  <Input
                    label='Brand name *'
                    value={state.name ? state.name : ''}
                    onChange={this.handleInput}
                    name='name'
                  />
                </Form.Field>
                <p className='error-message'>{state.nameError ? 'Please enter a brand name' : ''}</p>
                <Form.Field inline>
                  <Input
                    disabled
                    label='Brand Website *'
                    value={props.website}
                  />
                </Form.Field>
                <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='button-container'>
                  <div><button className='cancel' onClick={this.handleCancel} name='name'>Cancel</button></div>
                  <div><button onClick={this.handleSaveName} name='brand' value='brand'>Save</button></div>
                  <div><HashLink to='#sustainability_report_date'><button onClick={this.handleSaveName} name='brand' value='next'>Save & Next</button></HashLink></div>
                </div>
              </div>) : (
              <div className='not-editing'>
                <h5>What is the Brand Name and Website? *</h5>
                <p>{state.name}</p>
                <p>{state.website}</p>
                <div className='button-container'>
                  <div></div>
                  <div><button name='brand' onClick={this.handleEdit} value='brand'>Edit</button></div>
                </div>
                <p className='small-divider'></p>
              </div>
            )}
            <div className='not-editing'>
              <h5>Rating date and verification date</h5>
              <div>{props.rating_date ? moments(props.rating_date) : 'No rating date, the rating hasn\'t been submitted yet'}</div>
              <div>{props.verification_date ? moments(props.verification_date) : 'No verification date, the brand hasn\'t been verified yet'}</div>
              <p className='small-divider'></p>
            </div>
            {isEditing === 'sustain' ? (
              <div className='editing' id='sustainability_report_date'>
                <h5>When will the brand release its next sustainability report?</h5>
                <Form.Field inline className={state.renderError === true ? 'ui error input' : 'ui input'}>
                  <Input
                    label='Sustainability Report Date'
                    placeholder='MM/YYYY'
                    value={state.sustainability_report_date ? state.sustainability_report_date : ''}
                    onChange={this.handleInput}
                    name='sustainability_report_date'
                  />
                </Form.Field>
                <Form.Field inline>
                  <Checkbox
                    label='N/A'
                    onChange={this.handleNA}
                    checked={state.sustainability_report === false ? true : false}
                    name='NA'
                  />
                </Form.Field>
                <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='error-message'>{state.renderError === true ? 'Please enter a valid Date in MM/YYYY format' : ''}</div>
                <div className='button-container'>
                  <div><button className='cancel' onClick={this.handleCancel} name='sustainability_report_date'>Cancel</button></div>
                  <div><button onClick={this.handleSaveSustainDate} name='sustain' value='sustain'>Save</button></div>
                  <div><HashLink to='#review_date'><button onClick={this.handleSaveSustainDate} name='sustain' value='next'>Save & Next</button></HashLink></div>
                </div>
              </div>) : (
              <div className='not-editing'>
                <h5>When will the brand release its next sustainability report?</h5>
                <p>{state.sustainability_report === false ? 'N/A' : state.sustainability_report_date}</p>
                <div className='button-container'>
                  <div></div>
                  <div><button name='sustain' onClick={this.handleEdit} value='sustain'>Edit</button></div>
                </div>
                <p className='small-divider'></p>
              </div>
            )}
            {isEditing === 'review' ? (
              <div className='editing' id='review_date'>
                <h5>Which month does Good On You need to review the Brand?</h5>
                <Form.Field inline className={state.renderError === true ? 'ui error input' : 'ui input'}>
                  <Input
                    label='Brand Review Date'
                    placeholder='MM/YYYY'
                    value={state.review_date ? state.review_date : ''}
                    onChange={this.handleInput}
                    name='review_date'
                  />
                </Form.Field>
                <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='error-message'>{state.renderError === true ? 'Please enter a valid Date in MM/YYYY format' : ''}</div>
                <div className='button-container'>
                  <div><button className='cancel' onClick={this.handleCancel} name='review_date'>Cancel</button></div>
                  <div><button onClick={this.handleSaveReviewDate} name='review' value='review'>Save</button></div>
                  <div><HashLink to='#size'><button onClick={this.handleSaveReviewDate} name='review' value='next'>Save & Next</button></HashLink></div>
                </div>
              </div>) : (
              <div className='not-editing'>
                <h5>Which month does Good On You need to review the Brand?</h5>
                <p>{state.review_date? state.review_date : ''}</p>
                <div className='button-container'>
                  <div></div>
                  <div><button name='review' onClick={this.handleEdit} value='review'>Edit</button></div>
                </div>
                <p className='small-divider'></p>
              </div>
            )}
            {isEditing === 'size' ? (
              <div className='editing' id='size'>
                <h5>What is the size of the Brand? *</h5>

                <p>Does it clearly meet at least one of the following 'large brand' criteria?</p>
                <Form.Field>
                  <Checkbox
                    label='is listed on the stock exchange'
                    onChange={this.handleCheckbox}
                    checked={state.listed ? true : false}
                    value='listed'
                    name='size'
                  />
                </Form.Field>
                <Form.Field className='parent-company'>
                  <Checkbox
                    label='is a subsidiary company'
                    onChange={this.handleCheckbox}
                    checked={state.subsidiary ? true : false}
                    value='subsidiary'
                    name='size'
                  />
                </Form.Field>
                {state.subsidiary ?
                  <Form.Field className='parent-company'>
                    <Input
                      size='mini'
                      placeholder='Provide the parent company name'
                      onChange={this.handleInput}
                      name='parent_company'
                      value={state.parent_company}
                    />
                  </Form.Field> : ''}
                <p className='error-message'>{state.parentError === true ? 'Please enter the parent company name' : ''}</p>
                <Form.Field>
                  <Checkbox
                    label='is a Parent company'
                    onChange={this.handleCheckbox}
                    checked={state.parent ? true : false}
                    value='parent'
                    name='size'
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    label='has Alexa rating &#60; 200k'
                    onChange={this.handleCheckbox}
                    checked={state.alexa ? true : false}
                    value='alexa'
                    name='size'
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    label='has Insta + Facebook followers &#62; 75k'
                    onChange={this.handleCheckbox}
                    checked={state['insta-fb'] ? true : false}
                    value='insta-fb'
                    name='size'
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    label='has Linkedin employees &#62; 50'
                    onChange={this.handleCheckbox}
                    checked={state['linked-in'] ? true : false}
                    value='linked-in'
                    name='size'
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    label='Is considered large according to other Good On You criteria'
                    onChange={this.handleCheckbox}
                    checked={state['goy-large'] ? true : false}
                    value='goy-large'
                    name='size'
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    label='None of the above, therefore it is considered small'
                    onChange={this.handleCheckbox}
                    checked={state['none'] ? true : false}
                    value='none'
                    name='size'
                  />
                </Form.Field>

                <Form.Field>
                  <Checkbox
                    label='Good On You is satisfied that the company is small, despite meeting some of the above criteria'
                    onChange={this.handleCheckbox}
                    checked={state['goy-small'] ? true : false}
                    value='goy-small'
                    name='size'
                  />
                </Form.Field>

                <p className='brand-size'>Brand Size: </p>
                <Form.Field className='brand-size'>
                  <Radio
                    readOnly
                    label='Small'
                    onChange={this.handleRadio}
                    name='small'
                    checked={(state.size && state.sizeValues.length <= 0 && state.noValues.length <= 0) || this.state['goy-small'] || this.state.none ? true : false}
                  />
                </Form.Field>
                <Form.Field className='brand-size'>
                  <Radio
                    readOnly
                    label='Large'
                    onChange={this.handleRadio}
                    name='large'
                    checked={state.sizeValues.length >= 1 && !this.state['goy-small'] ? true : false}
                  />
                </Form.Field>
                <p className='error-message'>{state.sizeError === true ? 'Please make a selection' : ''}</p>
                <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='button-container'>
                  <div><button className='cancel' onClick={this.handleCancel} name='size'>Cancel</button></div>
                  <div><button onClick={this.handleSubmitSize} name='size' value='size'>Save</button></div>
                  <div><Link to={`/brandContact/${id}`}><button onClick={this.handleSubmitSize} name='size' value='next'>Save & Next</button></Link></div>
                </div>
              </div>) : (
              <div className='not-editing'>
                <h5>What is the size of the Brand? *</h5>
                <p>{state.size === 'small' || state.size === 'large' ? this.capitalize(state.size) : ''}</p>
                <p>{state.sizeValues.length > 0 ? 'Criteria:' : ''}</p>
                <ul>{this.renderCriteria()}</ul>
                <p>{state.parent_company && state.parent ? `Parent Company: ${state.parent_company}` : ''}</p>
                <div className='button-container'>
                  <div></div>
                  <div><button name='size' onClick={this.handleEdit} value='size'>Edit</button></div>
                </div>
              </div>
            )}
          </Form>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('app state', state)
  return {
    general: state.general,
    brand: state.brandInfo,
  }
}

export default connect(mapStateToProps, { updateGeneral, fetchGeneral, createBrandSize })(BrandGeneral)
