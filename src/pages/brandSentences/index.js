import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { connect } from 'react-redux'
import { fetchSentence, createSentence, updateSentence } from '../../actions/sentence'
import { Form, TextArea, Radio, Progress, Portal, Segment, Loader} from 'semantic-ui-react'
import { QualiHeading } from '../../components'
import _ from 'lodash'
import axios from 'axios'

import './brandSentence.css'

class BrandSentences extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      renderChangeError: false,
      currentSelect: '',
      currentId: '',
      finalAnswer: '',
      input: '',
      textlength: 0,
      progressBar: 0,
    }

    this.brandId = this.props.match.params.id

    this.handleRadio = this.handleRadio.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleNav = this.handleNav.bind(this)
    this.handlePortal = this.handlePortal.bind(this)
  }

  //calls API to receive currently saved contact details for brand
  componentWillMount() {
    this.setState({isLoading: true})
    this.props.fetchSentence(this.brandId)
  }

  //when component receives props with data from API, will set details to be managed in state
  componentWillReceiveProps(nextProps) {
    if(nextProps.sentence !== this.props.sentence) {
      if(nextProps.sentence) {
        _.map(nextProps.sentence, ident => {
          if(ident.is_selected === true) {
            this.setState({currentSelect: ident.slug, currentId: ident.id, finalAnswer: ident.text, finalSource: ident.source})
            ident.text === '' ? this.setState({progressBar: 0 }) : this.state.progressBar++
          }
          this.setState({[ident.slug]: ident.slug})
        })
        this.setState({isLoading: false})
      }
    }
  }

  //toggles editing mode for specified question
  handleEdit(event) {
    event.preventDefault()
    this.setState({isEditing: '1'})
  }

  //clears all errors in state and recalls API to ensure all data displayed to user is up to date
  handleCancel(event) {
    event.preventDefault()
    this.setState({
      changeError: false,
      renderChangeError: false,
      finalSource: null,
      finalAnswer: null,
      currentId: null,
      currentSelect: null,
      isEditing: null,
      isLoading: true,
    })
    this.props.fetchSentence(this.brandId)
  }

  //if the currently selected sentence already exists in props, will send PATCH request to API, otherwise will send POST.
  handleSave(event) {
    if(this.props.sentence[this.state.currentSelect]) {
      this.props.updateSentence(this.brandId, this.state.currentId, {text: this.state.finalAnswer, is_selected: true})
    } else {
      this.props.createSentence({brand: this.brandId, text: this.state.finalAnswer, is_selected: true})
      this.state.progressBar++
    }
    if(this.state.finalAnswer === '') {
      this.setState({progressBar: 0})
    }
    if(event.target.value === 'next') {
      this.props.history.push(`/brandSummary/${this.brandId}`)
    } else {
      this.setState({changeError: false, renderChangeError: false, isEditing: null, save: true})
    }
  }

  //Allows users to select pre-defined sentences if they exist in API/props.  Will also assign selected text to value of text area so that it can be edited by user
  handleRadio(event){
    if(this.props.sentence.length > 0) {
      _.map(this.props.sentence, check => {
        if(event.target.name === check.slug) {
          this.setState({textlength: event.target.value.length, currentSelect: check.slug, finalAnswer: event.target.value, currentId: check.id, finalSource: check.source})
        }
      })
    } else {
      this.setState({textlength: event.target.value.length, finalAnswer: event.target.value})
    }
    this.setState({currentEditing: '#sentence', changeError: true})
  }

  //finds pre-defined sentences in API/props if they exist and renders them as inputs that behave as radio buttons
  renderField() {
    return _.map(this.props.sentence, check => {
      if(check.slug === 'default-1' || check.slug === 'default-2') {
        return(
          <Form>
            <Form.Field inline key={check.id}>
              <Radio
                label={check.text}
                onChange={this.handleRadio}
                checked={this.state.currentSelect===check.slug}
                name={check.slug}
                value={check.text}
              />
            </Form.Field>
            <div>Source: {check.source}</div>
          </Form>
        )}
    })
  }

  //renders message if no pre-defined sentences exist
  renderNone(){
    return(
      <div>No default sentences found, Please create one</div>
    )
  }

  //close portal upon clicking Go button
  handlePortal() {
    this.setState({portal: false})
  }

  //handles navigation between pages to prevent users from leaving current page while they are currently editing a question.
  handleNav(event) {
    if(this.state.changeError === true) {
      this.setState({renderChangeError: true, portal: true})
    } else {
      if(event.target.name === 'previous') {
        this.props.history.push(`/brandCauses/${this.brandId}`)
      } else if(event.target.name === 'next') {
        this.props.history.push(`/brandSummary/${this.brandId}`)
      } else if(event.target.name === 'landing') {
        this.props.history.push(`/brandLanding/${this.brandId}`)
      }
    }
  }

  render() {
    const isEditing = this.state.isEditing
    const state = this.state
    const props = this.props.sentence
    return(
      <div className='form-container'>
        <QualiHeading id={this.brandId} brand={this.props.brand}/>
        <div className='forms-header'><button onClick={this.handleNav} name='landing'>Back to Summary</button></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><button onClick={this.handleNav} name='previous' className='previous'>Previous</button></div>
            <div><h3>Brand Sentences</h3></div>
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
        {state.isLoading === true ? <Loader active inline='centered' /> :
          <Form>
            {isEditing === '1' ? (
              <div className='editing' id='sentence'>
                <h5>What is the one sentence that describes the brand best?</h5>
                {state['default-1'] || state['default-2'] ? <p>Select one of the proposed sentences shown below.  If required, edit it and then choose save</p> : <p>No default sentences found, Please create one</p>}
                {state['default-1'] || state['default-2'] ? this.renderField() : ''}
                <h5>Edit the one you chose or write a new one</h5>
                <TextArea
                  autoHeight
                  maxLength='255'
                  onFocus={this.handleRadio}
                  onChange={this.handleRadio}
                  value={state.finalAnswer}
                  name='custom'/>
                <p>{this.state.textlength}/255</p>
                <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='button-container'>
                  <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                  <div><button onClick={this.handleSave}>Save</button></div>
                  <div><button onClick={this.handleSave} value='next'>Save & Next</button></div>
                </div>
              </div>) : (
              <div className='not-editing'>
                <h5>What is the one sentence that describes the brand best?</h5>
                <p>{this.state.finalAnswer}</p>
                <p>{this.state.finalSource}</p>
                <div className='button-container'>
                  <div></div>
                  <div><button name='1' onClick={this.handleEdit} value='1'>Edit</button></div>
                </div>
              </div>
            )}
          </Form>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sentence: state.sentence,
    brand: state.brandInfo,
  }
}

export default connect(mapStateToProps, { updateSentence, fetchSentence, createSentence })(BrandSentences)
