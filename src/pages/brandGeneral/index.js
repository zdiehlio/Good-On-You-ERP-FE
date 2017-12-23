import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { fetchGeneral, updateGeneral, createBrandSize, deleteBrandSize } from '../../actions'
import { FormsHeader } from '../../components'
import { Form, Input, Radio, Checkbox} from 'semantic-ui-react'
import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'

import './brandGeneral.css'

class BrandGeneral extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: '',
      sizeValues: [],
      deleteSize: [],
      currentValues: [],
      parent_company: '',
      sizeOptions: ['alexa', 'insta-fb', 'linked-in', 'manual', 'subsidiary', 'listed'],
      input: null,
      dateValid: false,
      renderError: false
    }


    this.handleRadio = this.handleRadio.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleSubmitSize = this.handleSubmitSize.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleSizeCancel = this.handleSizeCancel.bind(this)
  }
componentWillMount() {
  const { id } = this.props.match.params
  this.props.fetchGeneral(id, 'general')
}

componentWillReceiveProps(nextProps) {
  const { id } = this.props.match.params
  if(nextProps.qa !== this.props.qa) {
    _.map(nextProps.qa.size, crit => {
      if(crit) {
        this.setState({[`original${crit.criteria}`]: crit.criteria, [crit.criteria]: crit.criteria})
      }
    })
    if(nextProps.qa.size) {
      this.setState({sizeValues: _.map(nextProps.qa.size, val => {return {brand: id, criteria: val.criteria}})})
    }
    this.setState({
      name: nextProps.qa.name,
      originalname: nextProps.qa.name,
      website: nextProps.qa.website,
      sustainability_report_date: nextProps.qa.sustainability_report_date,
      originalsustainability_report_date: nextProps.qa.sustainability_report_date,
      review_date: nextProps.qa.review_date,
      originalreview_date: nextProps.qa.review_date,
      parent_company: nextProps.qa.parent_company,
      originalparent_company: nextProps.qa.parent_company
    })
  }
}

validateDate(val) {
  let date = moment(`${val.target.value}`, 'DD/MM/YYYY', true)
  if (date.isValid()) {
    this.setState({dateValid: true})
  } else {
    this.setState({dateValid: false})
  }
}

//toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.setState({isEditing: event.target.value})
}
//sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    this.setState({isEditing: null, currentAnswer: null, [event.target.name]: this.state[`original${event.target.name}`]})
  }
  handleSizeCancel(event) {
    _.map(this.state.sizeOptions, size => {
      this.setState({[size]: this.state[`original${size}`]})
    })
    this.setState({isEditing: null, parent_company: this.state.originalparent_company})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(event.target.name === '1') {
      this.props.updateGeneral(id, {name: this.state.name})
      this.setState({isEditing: null})
    } else if(event.target.name === '5') {
      this.props.createBrandSize(id, this.state.sizeValues)
      this.props.updateGeneral(id, {parent_company: this.state.parent_company})
      this.setState({isEditing: null})
    } else {
      if(this.state.dateValid === true) {
        this.props.updateGeneral(id, {sustainability_report_date: this.state.sustainability_report_date, review_date: this.state.review_date})
        this.setState({renderError: false, isEditing: null})
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

  handleCheckbox(event) {
    const { id }  = this.props.match.params
      if(this.state[event.target.name]) {
        this.setState({[event.target.name]: null, sizeValues: this.state.sizeValues.filter(select => {return select.criteria != event.target.name})})
      } else {
        this.setState({[event.target.name]: event.target.name, sizeValues: [...this.state.sizeValues, {brand: id, criteria: event.target.name}]})
      }
      console.log(this.state.sizeValues);
  }

  renderCriteria() {
      return _.map(this.state.sizeValues, crit => {
        return (
          <li key={crit.criteria}>
            {crit.criteria}
          </li>
        )
      })
    }

  //handle radio buttons change status, must be written seperate since value properties are inconsistent with text input.
  handleRadio(event){
    if(event.target.name ==='small') {
      this.setState({is_large: false})
    }
    if(event.target.name === 'large') {
      this.setState({is_large: true})
    }
  }
  //handle text input change status, must be written seperate since value properties are inconsistent with radio buttons.
  handleInput(event) {
    this.validateDate(event)
    this.setState({currentAnswer: event.target.name, [event.target.name]: event.target.value, input: event.target.value})
  }


  render() {
    console.log('props', this.props.qa);
    console.log('state', this.state);
    const isEditing = this.state.isEditing
    const state = this.state
    const props = this.props.qa
    const { id }  = this.props.match.params
    const moments = date => moment(new Date(date)).format('DD/MM/YYYY')
    return(
      <div className='form-container'>
        <FormsHeader />
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><button className='previous'>Previous</button></div>
            <div><h3>Brand General</h3></div>
            <div><Link to={`/brandContact/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <Form>
        {isEditing === '1' ? (
          <div className='editing'>
          <h5>What is the Brand Name and Website?</h5>
              <Form.Field inline>
                <Input
                  label='Brand name'
                  value={state.name}
                  onChange={this.handleInput}
                  name='name'
                  />
              </Form.Field>
              <Form.Field inline>
                <Input
                  disabled
                  label='Brand Website'
                  value={props.website}
                  />
              </Form.Field>
            <button className='cancel' onClick={this.handleCancel} name='name'>Cancel</button>
            <button onClick={this.handleSave} name='1' value='1'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h5>What is the Brand Name and Website?</h5>
            <p>{state.name}</p>
            <p>{state.website}</p>
            <button name='1' onClick={this.handleEdit} value='1'>Edit</button>
          </div>
          )}
            <div className='not-editing'>
              <h5>What is the rating date and verification date</h5>
              <div>Rating Date: {props.rating_date ? moments(props.rating_date) : ''}</div>
              <div>Verification Date: {props.verification_date ? moments(props.verification_date) : ''}</div>
            </div>
            {isEditing === '3' ? (
              <div className='editing'>
              <h5>Which month does the brand release its sustainability report?</h5>
                  <Form.Field inline>
                    <Input
                      label='Sustainability Report Date'
                      placeholder='DD/MM/YYYY'
                      value={moments(state.sustainability_report_date)}
                      onFocus={this.handleInput}
                      onChange={this.handleInput}
                      name='sustainability_report_date'
                    />
                  </Form.Field>
                    <div className='error-message'>{state.renderError === true ? 'Please enter a valid Date in DD/MM/YYYY format' : ''}</div>
                <button className='cancel' onClick={this.handleCancel} name='sustainability_report_date'>Cancel</button>
                <button onClick={this.handleSave} name='3' value='3'>Save</button>
              </div>) : (
              <div className='not-editing'>
                <h5>Which month does the brand release its sustainability report?</h5>
                <p>Report Date: {state.sustainability_report_date ? moments(state.sustainability_report_date) : ''}</p>
                <button name='3' onClick={this.handleEdit} value='3'>Edit</button>
              </div>
              )}
              {isEditing === '4' ? (
                <div className='editing'>
                <h5>Which month does Good On You need to review the Brand?</h5>
                  <Form.Field inline>
                    <Input
                      label='Brand Review Date'
                      placeholder='DD/MM/YYYY'
                      value={moments(state.review_date)}
                      onFocus={this.handleInput}
                      onChange={this.handleInput}
                      name='review_date'
                      />
                  </Form.Field>
                      <div className='error-message'>{state.renderError === true ? 'Please enter a valid Date in DD/MM/YYYY format' : ''}</div>
                  <button className='cancel' onClick={this.handleCancel} name='review_date'>Cancel</button>
                  <button onClick={this.handleSave} name='4' value='4'>Save</button>
                </div>) : (
                <div className='not-editing'>
                  <h5>Which month does Good On You need to review the Brand?</h5>
                  <p>Review Date: {state.review_date? moments(state.review_date) : ''}</p>
                  <button name='4' onClick={this.handleEdit} value='4'>Edit</button>
                </div>
                )}
                {isEditing === '5' ? (
                  <div className='editing'>
                  <h5>What is the size of the Brand?</h5>
                      <p>Brand Size: </p>
                      <Form.Field inline>
                        <Radio
                          disabled
                          label='Small'
                          onChange={this.handleRadio}
                          name='small'
                          checked={state.sizeValues.length === 0 && (state.parent_company === null || state.parent_company === '')}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Radio
                          disabled
                          label='Large'
                          onChange={this.handleRadio}
                          name='large'
                          checked={state.sizeValues.length > 0 || state.parent_company}
                        />
                      </Form.Field>
                      <p>Does the Brand meet at least one of the following large brand criteria?</p>
                      <Form.Field>
                        <Checkbox
                          label='Listed Company'
                          onChange={this.handleCheckbox}
                          checked={state.listed}
                          name='listed'
                        />
                      </Form.Field>
                      <Form.Field>
                        <Checkbox
                          label='Subsidiary Company'
                          onChange={this.handleCheckbox}
                          checked={state.subsidiary}
                          name='subsidiary'
                        />
                      </Form.Field>
                      <Form.Field>
                        <Checkbox
                          label='Alexa &#60; 200k'
                          onChange={this.handleCheckbox}
                          checked={state.alexa}
                          name='alexa'
                        />
                      </Form.Field>
                      <Form.Field>
                        <Checkbox
                          label='Insta + FB &#62; 75k'
                          onChange={this.handleCheckbox}
                          checked={state['insta-fb']}
                          name='insta-fb'
                        />
                      </Form.Field>
                      <Form.Field>
                        <Checkbox
                          label='Linkedin employees &#62; 50'
                          onChange={this.handleCheckbox}
                          checked={state['linked-in']}
                          name='linked-in'
                        />
                      </Form.Field>
                      <Form.Field>
                        <Checkbox
                          label='Manual override after company provided data satisfying Good On You criteria'
                          onChange={this.handleCheckbox}
                          checked={state.manual}
                          name='manual'
                        />
                      </Form.Field>
                        <Form.Field inline>
                          <Input
                            label='Parent Company Name'
                            onFocus={this.handleInput}
                            onChange={this.handleInput}
                            name='parent_company'
                            value={state.parent_company}
                          />
                        </Form.Field>
                    <button className='cancel' onClick={this.handleSizeCancel} name='5'>Cancel</button>
                    <button onClick={this.handleSave} name='5' value='5'>Save</button>
                  </div>) : (
                  <div className='not-editing'>
                    <h5>What is the size of the Brand?</h5>
                    <p>Size of Brand: {state.sizeValues.length > 0 || state.parent_company ? 'Large' : 'Small'}</p>
                    <p>Criteria: </p>
                      <ul>{this.renderCriteria()}</ul>
                    <p>Parent Company: {state.parent_company}</p>
                    <button name='5' onClick={this.handleEdit} value='5'>Edit</button>
                  </div>
                  )}
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {qa: state.qa}
}

export default reduxForm({
  form: 'BrandGeneralForm'
})(
  connect(mapStateToProps, { updateGeneral, fetchGeneral, createBrandSize, deleteBrandSize})(BrandGeneral)
)
