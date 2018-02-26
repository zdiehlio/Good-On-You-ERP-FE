import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { connect } from 'react-redux'
import { Form, TextArea, Progress, Portal, Segment} from 'semantic-ui-react'
import { fetchSummary, createSummary, updateSummary } from '../../actions/summary'
import { fetchRawRating } from '../../actions/rating'
import { QualiHeading } from '../../components'
import _ from 'lodash'
import axios from 'axios'

class BrandSummary extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: null,
      renderSummary: null,
      renderChangeError: false,
      save: false,
      textlength: 0,
      progressBar: 0,
    }


    this.handleInput = this.handleInput.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleNav = this.handleNav.bind(this)
    this.handlePortal = this.handlePortal.bind(this)
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchSummary(id)
    this.props.fetchRawRating(id)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.summary !== this.props.summary) {
      _.map(nextProps.summary, summary=> {
        this.setState({renderSummary: summary.text, originalAnswer: summary.text, currentAnswer: summary.text})
        if(summary.text) {
          summary.text === '' ? this.setState({progressBar: 0}) : this.state.progressBar++
        }
      })
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
    this.setState({changeError: false, renderChangeError: false, isEditing: null, currentAnswer: this.state.originalAnswer})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state.renderSummary) {
      this.props.updateSummary(id, {text: this.state.currentAnswer})
      this.setState({renderSummary: this.state.currentAnswer})
      this.state.currentAnswer === '' ? this.setState({progressBar: 0}) : this.state.progressBar++
    } else {
      this.props.createSummary({brand: id, text: this.state.currentAnswer})
      this.setState({renderSummary: this.state.currentAnswer})
      this.state.currentAnswer === '' ? this.setState({progressBar: 0}) : this.state.progressBar++
    }
    if(event.target.value === 'next') {
      this.props.history.push(`/suppDataSocialMedia/${id}`)
    } else {
      this.setState({isEditing: null, changeError: false, renderChangeError: false})
    }
  }
  //handle text input change status, must be written seperate since value properties are inconsistent with radio buttons.
  handleInput(event) {
    this.setState({currentEditing: '#summary', changeError: true, textlength: event.target.value.length, currentAnswer: event.target.value})
  }

  renderRawRatings() {
    if(this.props.pre_qa) {
      if(this.props.pre_qa.length > 0) {
        let count = 0
        return _.map(this.props.pre_qa, answer => {
          return(
            <div key={count++}>{answer.text}</div>
          )
        })
      } else {
        return <p>There is no answer at the rating section yet</p>
      }
    }
  }

  handlePortal() {
    this.setState({portal: false})
  }

  handleNav(event) {
    const { id }  = this.props.match.params
    if(this.state.changeError === true) {
      this.setState({renderChangeError: true, portal: true})
    } else {
      if(event.target.name === 'previous') {
        this.props.history.push(`/brandSentences/${id}`)
      } else if(event.target.name === 'next') {
        this.props.history.push(`/suppDataSocialMedia/${id}`)
      } else if(event.target.name === 'landing') {
        this.props.history.push(`/brandLanding/${id}`)
      }
    }
  }

  //render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props', this.props.summary)
    console.log('pre props', this.props.pre_qa)
    console.log('state', this.state)
    const isEditing = this.state.isEditing
    const props = this.props.summary
    const state = this.state
    const { id }  = this.props.match.params
    return(
      <div className='form-container'>
        <QualiHeading id={id} brand={this.props.brand}/>
        <div className='forms-header'><button onClick={this.handleNav} name='landing'>Back to Summary</button></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><button onClick={this.handleNav} name='previous' className='previous'>Previous</button></div>
            <div><h3>Brand Summary</h3></div>
            <div><button onClick={this.handleNav} name='next' className='next'>Next</button></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress total={1} value={state.progressBar} progress />
        {state.renderChangeError === true ? (
          <Portal open={state.portal} className='portal'>
            <Segment style={{ left: '35%', position: 'fixed', top: '50%', zIndex: 1000}}>
              <p>Please Save or Cancel your selected answers before proceeding</p>
              <HashLink to={state.currentEditing}><button onClick={this.handlePortal}>Go</button></HashLink>
            </Segment>
          </Portal>
        ) : ''}
        <Form>
          {isEditing === '1' ? (
            <div className='editing' id='summary'>
              <h5>What is the Summary for the Brand? *</h5>
              <TextArea
                autoHeight
                maxLength='3000'
                placeholder={this.currentAnswer}
                onChange={this.handleInput}
                value={state.currentAnswer}
                name='summary'/>
              <p>{this.state.textlength}/3000</p>
              <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button onClick={this.handleSave}>Save</button></div>
                <div><button onClick={this.handleSave} value='next'>Save & Next</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h5>What is the Summary for the Brand?</h5>
              <div className='button-container'>
                <div></div>
                <div><button name='1' onClick={this.handleEdit} value='1'>Edit</button></div>
              </div>
            </div>
          )}
          <div className='not-editing'>
            <h4>{state.renderSummary ? 'Current Brand Summary' : ''}</h4>
            <div>{state.renderSummary}</div>
          </div>
          <div className='not-editing'>
            <p className='small-divider'></p>
            <h4>Rating Answers</h4>
            {this.renderRawRatings()}
          </div>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    summary: state.summary,
    pre_qa: state.preQa,
    brand: state.brandInfo,
  }
}

export default connect(mapStateToProps, { updateSummary, fetchSummary, createSummary, fetchRawRating })(BrandSummary)
