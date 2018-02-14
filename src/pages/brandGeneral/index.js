import React, {Component} from 'react'
import { Link, Route, Router} from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { connect } from 'react-redux'
import { fetchGeneral, updateGeneral, createBrandSize } from '../../actions/general'
import { OverviewHeading } from '../../components'
import { Form, Input, Radio, Checkbox, Progress} from 'semantic-ui-react'
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
      parent_company: '',
      sizeOptions: ['alexa', 'insta-fb', 'linked-in', 'goy-large', 'goy-small', 'subsidiary', 'listed', 'none', 'parent'],
      input: null,
      dateValid: true,
      renderError: false,
      changeError: false,
      progressBar: 0,
      name: '',
    }


    this.handleInput = this.handleInput.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleSubmitSize = this.handleSubmitSize.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleSizeCancel = this.handleSizeCancel.bind(this)
    this.handleNA = this.handleNA.bind(this)
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchGeneral(id, 'general')
  }

  componentWillReceiveProps(nextProps) {
    const { id } = this.props.match.params
    if(nextProps.general !== this.props.general) {
      if(nextProps.general.size_criteria) {
        console.log('mapping')
        if(nextProps.general.size_criteria.criteria === 'none') {
          console.log('none')
          this.setState({none: 'none', noValues: {name: 'none'}})
        } else {
          _.map(nextProps.general.size_criteria, crit => {
            this.state.sizeValues.push({name: crit.criteria})
            this.state.originalSizeValues.push({name: crit.criteria})
            this.setState({[`original${crit.criteria}`]: crit.criteria, [crit.criteria]: crit.criteria})
          })
        }
      }
      this.setState({
        name: nextProps.general.name,
        originalname: nextProps.general.name,
        website: nextProps.general.website,
        sustainability_report: nextProps.general.sustainability_report,
        sustainability_report_date: nextProps.general.sustainability_report_date ? moments(nextProps.general.sustainability_report_date) : '',
        originalsustainability_report_date: nextProps.general.review_date ? moments(nextProps.general.sustainability_report_date) : '',
        review_date: nextProps.general.review_date ? moments(nextProps.general.review_date) : '',
        originalreview_date: nextProps.general.review_date ? moments(nextProps.general.review_date) : '',
        parent_company: nextProps.general.parent_company,
        originalparent_company: nextProps.general.parent_company,
        size: nextProps.general.size,
      })
      if(nextProps.general.name) {
        this.state.progressBar++
      }
      if(nextProps.general.review_date) {
        this.state.progressBar++
      }
      if(nextProps.general.sustainability_report_date) {
        this.state.progressBar++
      }
      if(nextProps.general.size) {
        this.state.progressBar++
      }
    }
  }

  //toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state.changeError === false) {
      this.setState({isEditing: event.target.value})
    } else {
      this.setState({renderChangeError: true})
      alert(`Please click Save on previously edited question to save your selected answers or Cancel to disregard your selections`)
    }
  }

  //sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    this.setState({
      renderChangeError: false,
      changeError: false,
      isEditing: null,
      currentAnswer: null, [event.target.name]: this.state[`original${event.target.name}`]})
  }

  handleSizeCancel(event) {
    _.map(this.state.sizeOptions, size => {
      this.setState({[size]: this.state[`original${size}`]})
    })
    this.setState({renderChangeError: false,
      changeError: false,
      sizeValues: this.state.originalSizeValues,
      isEditing: null,
      parent_company: this.state.originalparent_company})
  }

  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(event.target.name === '1') {
      if(this.state.name.length <= 0) {
        this.setState({nameError: true})
      } else if(event.target.value === 'next') {
        if(event.target.name === '1') {
          this.setState({renderChangeError: false, changeError: false, isEditing: '2'})
        }
        this.props.updateGeneral(id, {name: this.state.name})
      } else {
        this.props.updateGeneral(id, {name: this.state.name})
        this.setState({renderChangeError: false, changeError: false, isEditing: null})
      }
    } else if(event.target.name === '4') {
      if(!this.state.size) {
        this.setState({sizeError: true})
      } else if(this.state.subsidiary && this.state.parent_company.length <=0) {
        this.setState({parentError: true})
      } else {
        this.props.createBrandSize({brand: id, criteria: this.state.sizeValues.length > 0 ? this.state.sizeValues : this.state.noValues})
        this.props.updateGeneral(id, {parent_company: this.state.parent_company})
        this.setState({renderChangeError: false, changeError: false, isEditing: null})
        if(event.target.value === 'next') {
          this.props.history.push(`/brandContact/${id}`)
        }
      }
      return this.state.progressBar++
    } else {
      if(this.state.dateValid === true) {
        if(event.target.name === '2' && event.target.value === 'next') {
          this.setState({renderChangeError: false, changeError: false, renderError: false, isEditing: '3'})
          this.props.updateGeneral(id, {
            sustainability_report: this.state.sustainability_report,
            sustainability_report_date: this.state.sustainability_report === false ? null : dayMoment(`02/${this.state.sustainability_report_date}`),
          })
        } else if(event.target.name === '3' && event.target.value === 'next') {
          this.setState({renderChangeError: false, changeError: false, renderError: false, isEditing: '4'})
          this.props.updateGeneral(id, {review_date: dayMoment(`02/${this.state.review_date}`)})
        } else {
          this.setState({renderChangeError: false, changeError: false, enderError: false, isEditing: null})
        }
        return this.state.progressBar++
      } else {
        this.setState({renderError: true})
      }
    }
  }

  handleSubmitSize(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.setState({isEditing: null})
  }

  handleCheckbox(event, { value }) {
    const { id }  = this.props.match.params
    if(value === 'none') {
      this.state.sizeOptions.map(val => this.setState({[val]: null}))
      this.setState({none: value, sizeValues: [], noValues: [{name: 'none'}], size: 'small'})
    } else {
      if(this.state[value]) {
        if(value === 'subsidiary') {
          this.setState({parentError: false})
        }
        this.setState({[value]: null, sizeValues: this.state.sizeValues.filter(select => {return select.name != value})})
      } else {
        this.setState({[value]: value, sizeValues: [...this.state.sizeValues, {name: value}]})
      }
      this.setState({size: value === 'goy-small' && this.state.size !== 'small' ? 'small' : 'large', none: null, noValues: []})
    }
    this.setState({changeError: true, sizeError: false})
  }

  renderCriteria() {
    return _.map(this.state.sizeValues, crit => {
      return (
        <li key={crit.name}>
          {crit.name}
        </li>
      )
    })
  }

  handleNA(event) {
    event.preventDefault()
    this.setState({sustainability_report: false, sustainability_report_date: '', dateValid: true})
  }

  validateDate(val) {
    let date = moment(`${val}`, 'MM/YYYY', true)
    if (date.isValid()) {
      this.setState({dateValid: true})
    } else {
      this.setState({dateValid: false})
    }
  }

  //handle text input change status, must be written seperate since value properties are inconsistent with radio buttons.
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
    this.setState({changeError: true, currentAnswer: name, [name]: value, input: value})
  }

  capitalize(string) {
    return string[0].toUpperCase() + string.slice(1)
  }


  render() {
    console.log('props', this.props.general)
    console.log('state', this.state)
    const isEditing = this.state.isEditing
    const state = this.state
    const props = this.props.general
    const { id }  = this.props.match.params
    return(
      <div className='form-container'>
        <OverviewHeading id={id} brand={this.props.brand}/>
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><button className='previous disabled' disabled>Previous</button></div>
            <div><h3>Brand General</h3></div>
            <div><Link to={`/brandContact/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress total={4} value={state.progressBar} progress />
        <Form>
          {isEditing === '1' ? (
            <div className='editing'>
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
                <div><button onClick={this.handleSave} name='1' value='1'>Save</button></div>
                <div><HashLink to='#sustainability'><button onClick={this.handleSave} name='1' value='next'>Save & Next</button></HashLink></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h5>What is the Brand Name and Website? *</h5>
              <p>{state.name}</p>
              <p>{state.website}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='1' onClick={this.handleEdit} value='1'>Edit</button></div>
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
          {isEditing === '2' ? (
            <div className='editing' id='sustainability'>
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
                <div><button onClick={this.handleSave} name='2' value='2'>Save</button></div>
                <div><HashLink to='#review'><button onClick={this.handleSave} name='2' value='next'>Save & Next</button></HashLink></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h5>When will the brand release its next sustainability report?</h5>
              <p>{state.sustainability_report === false ? 'N/A' : state.sustainability_report_date}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='2' onClick={this.handleEdit} value='2'>Edit</button></div>
              </div>
              <p className='small-divider'></p>
            </div>
          )}
          {isEditing === '3' ? (
            <div className='editing' id='review'>
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
                <div><button onClick={this.handleSave} name='3' value='3'>Save</button></div>
                <div><HashLink to='#size'><button onClick={this.handleSave} name='3' value='next'>Save & Next</button></HashLink></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h5>Which month does Good On You need to review the Brand?</h5>
              <p>{state.review_date? state.review_date : ''}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='3' onClick={this.handleEdit} value='3'>Edit</button></div>
              </div>
              <p className='small-divider'></p>
            </div>
          )}
          {isEditing === '4' ? (
            <div className='editing' id='size'>
              <h5>What is the size of the Brand? *</h5>

              <p>Does it clearly meet at least one of the following 'large brand' criteria?</p>
              <Form.Field>
                <Checkbox
                  label='is listed on the stock exchange'
                  onChange={this.handleCheckbox}
                  checked={state.listed ? true : false}
                  value='listed'
                />
              </Form.Field>
              <Form.Field className='parent-company'>
                <Checkbox
                  label='is a subsidiary company'
                  onChange={this.handleCheckbox}
                  checked={state.subsidiary ? true : false}
                  value='subsidiary'
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
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label='has Alexa rating &#60; 200k'
                  onChange={this.handleCheckbox}
                  checked={state.alexa ? true : false}
                  value='alexa'
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label='has Insta + Facebook followers &#62; 75k'
                  onChange={this.handleCheckbox}
                  checked={state['insta-fb'] ? true : false}
                  value='insta-fb'
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label='has Linkedin employees &#62; 50'
                  onChange={this.handleCheckbox}
                  checked={state['linked-in'] ? true : false}
                  value='linked-in'
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label='Is considered large according to other Good On You criteria'
                  onChange={this.handleCheckbox}
                  checked={state['goy-large'] ? true : false}
                  value='goy-large'
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label='None of the above, therefore it is considered small'
                  onChange={this.handleCheckbox}
                  checked={state['none'] ? true : false}
                  value='none'
                />
              </Form.Field>

              <Form.Field>
                <Checkbox
                  label='Good On You is satisfied that the company is small, despite meeting some of the above criteria'
                  onChange={this.handleCheckbox}
                  checked={state['goy-small'] ? true : false}
                  value='goy-small'
                />
              </Form.Field>

              <p className='brand-size'>Brand Size: </p>
              <Form.Field className='brand-size'>
                <Radio
                  readOnly
                  label='Small'
                  onChange={this.handleRadio}
                  name='small'
                  checked={state.size === 'small' ? true : false}
                />
              </Form.Field>
              <Form.Field className='brand-size'>
                <Radio
                  readOnly
                  label='Large'
                  onChange={this.handleRadio}
                  name='large'
                  checked={state.size === 'large' ? true : false}
                />
              </Form.Field>
              <p className='error-message'>{state.sizeError === true ? 'Please make a selection' : ''}</p>
              <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleSizeCancel} name='4'>Cancel</button></div>
                <div><button onClick={this.handleSave} name='4' value='4'>Save</button></div>
                <div><Link to={`/brandContact/${id}`}><button onClick={this.handleSave} name='4' value='next'>Save & Next</button></Link></div>
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
                <div><button name='4' onClick={this.handleEdit} value='4'>Edit</button></div>
              </div>
            </div>
          )}
        </Form>
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
