import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Input, Progress, Portal, Segment, Loader } from 'semantic-ui-react'
import { HashLink } from 'react-router-hash-link'
import { fetchContact, createContact, updateContact } from '../../actions/contact'
import { OverviewHeading } from '../../components'
import _ from 'lodash'

import './brandContact.css'

class BrandContact extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      emailValid: false,
      error_email: true,
      error_your_voice_email: true,
      error_name: true,
      errorContact: false,
      error_relationship_manager: true,
      changeError: false,
      progressBar: 0,
      your_voice_email: '',
      name: '',
      email: '',
      headquarters: '',
      relationship_manager: '',
    }

    this.brandId = this.props.match.params.id
    this.handleInput = this.handleInput.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleNav = this.handleNav.bind(this)
    this.handlePortal = this.handlePortal.bind(this)
  }

  //calls API to receive currently saved contact details for brand
  componentWillMount() {
    this.setState({isLoading: true})
    this.props.fetchContact(this.brandId)
  }

  //when component receives props with data from API, will set details to be managed in state
  componentWillReceiveProps(nextProps) {
    if(nextProps.contact.contact !== this.props.contact.contact) {
      if(nextProps.contact.contact) {
        //if clause that catches if there are multiple contacts created for current brand, can be removed if BE is cleared of all multiple contacts
        if(nextProps.contact.contact.length > 1) {
          this.setState({errorContact: true})
        }
        this.setState({
          error_email: nextProps.contact.contact.email ? false : true,
          name: nextProps.contact.contact.name,
          email: nextProps.contact.contact.email,
          relationship_manager: nextProps.contact.contact.relationship_manager,
          your_voice_email: nextProps.contact.contact.your_voice_email,
          headquarters: nextProps.contact.contact.headquarters,
        })
        //if contact exists, will set progress bar to 100%
        this.state.progressBar++
      }
      this.setState({isLoading: false})
    }
  }

  //toggles editing mode for specified question
  handleEdit(event) {
    event.preventDefault()
    this.setState({isEditing: event.target.name})
  }

  //clears all errors in state and recalls API to ensure all data displayed to user is up to date
  handleCancel(event) {
    event.preventDefault()
    this.setState({
      renderError: false,
      renderChangeError: false,
      changeError: false,
      isLoading: true,
      isEditing: null,
    })
    this.props.fetchContact(this.brandId)
  }

  //if contact already exists in props, save will send PATCH request to API to update contact details.  If no previous contact details have been saved, will send POST request to API to create contact details.
  handleSave(event) {
    event.preventDefault()
    if(this.state.error_email === false && this.state.error_email === false) {
      if(this.props.contact.contact) {
        this.props.updateContact(
          this.brandId,
          {
            name: this.state.name,
            email:this.state.email,
            relationship_manager: this.state.relationship_manager,
            your_voice_email: this.state.your_voice_email,
            headquarters: this.state.headquarters,
          }
        )
        //if save and next button is clicked, will save contact details and navigate to next page
        if(event.target.value === 'next') {
          this.props.history.push(`/suppDataAlias/${this.brandId}`)
        }
      } else {
        this.props.createContact({
          brand: this.brandId,
          name: this.state.name,
          email:this.state.email,
          relationship_manager: this.state.relationship_manager,
          your_voice_email: this.state.your_voice_email,
          headquarters: this.state.headquarters,
        })
        //if save and next button is clicked, will save contact details and navigate to next page
        if(event.target.value === 'next') {
          this.props.history.push(`/suppDataAlias/${this.brandId}`)
        }
      }
      //toggle editing mode and clears all errors.
      this.setState({isEditing: null, renderChangeError: false, changeError: false, renderError: false, error_email: false, your_voice_email: false})
      return this.state.progressBar++
    } else {
      //if error's exist will render them upon clicking save and prevent all other behaviour
      this.setState({renderError: true})
    }
  }

  //set value of input to state and if input is email, will validate that the value meets parameters of email address
  handleInput(event, { value, name }) {
    if(name === 'email') {
      if (value=== '') {
        this.setState({[`error_${name}`]: true})
      } else if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        this.setState({[`error_${name}`]: false})
      } else {
        this.setState({[`error_${name}`]: true})
      }
    }
    this.setState({currentEditing: '#contact', changeError: true, [name]: value})
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
        this.props.history.push(`/brandGeneral/${this.brandId}`)
      } else if(event.target.name === 'next') {
        this.props.history.push(`/suppDataAlias/${this.brandId}`)
      } else if(event.target.name === 'landing') {
        this.props.history.push(`/brandLanding/${this.brandId}`)
      }
    }
  }

  //render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props', this.props.contact)
    console.log('state', this.state)
    const isEditing = this.state.isEditing
    const state = this.state
    const props = this.props.contact
    return(
      <div className='form-container'>
        <OverviewHeading id={this.brandId} brand={this.props.brand}/>
        <div className='forms-header'><button onClick={this.handleNav} name='landing'>Back to Summary</button></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><button onClick={this.handleNav} name='previous' className='previous'>Previous</button></div>
            <div><h3>Brand Contact</h3></div>
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
              <div className='editing' id='contact'>
                <Form.Field inline>
                  <Input
                    label='Brand contact name'
                    placeholder='contact name'
                    onChange={this.handleInput}
                    name='name'
                    value={state.name}
                  />
                </Form.Field>
                <Form.Field inline className={state.renderError === true && state.error_email === true ? 'ui error input' : 'ui input'}>
                  <Input
                    label='Brand contact email *'
                    placeholder='email'
                    onChange={this.handleInput}
                    name='email'
                    value={state.email}
                  />
                </Form.Field>
                <p className='error-message'>{state.renderError === true && state.error_email === true ? 'Please enter Valid Email' : ''}</p>
                <Form.Field inline>
                  <Input
                    label='Brand GOY Relationship Manager'
                    placeholder='manager name'
                    onChange={this.handleInput}
                    name='relationship_manager'
                    value={state.relationship_manager}
                  />
                </Form.Field>
                <Form.Field inline>
                  <Input
                    label='Your voice email'
                    placeholder='your voice email'
                    onChange={this.handleInput}
                    name='your_voice_email'
                    value={state.your_voice_email}
                  />
                </Form.Field>
                <p className='error-message'>{state.renderError === true && state.error_your_voice_email === true ? 'Please enter Valid Email' : ''}</p>
                <Form.Field inline>
                  <Input
                    label='Headquarters'
                    placeholder='headquarters location'
                    onChange={this.handleInput}
                    name='headquarters'
                    value={state.headquarters}
                  />
                </Form.Field>
                <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='button-container'>
                  <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                  <div><button onClick={this.handleSave} name='1'>Save</button></div>
                  <div><button onClick={this.handleSave} name='1' value='next'>Save & Next</button></div>
                </div>
              </div>) : (
              <div className='not-editing'>
                <h5>Brand Contact Information *</h5>
                <p>{state.name ? `Contact Name: ${state.name}` : ''}</p>
                <p>{state.email ? `Contact Email: ${state.email}` : ''}</p>
                <p>{state.relationship_manager ? `GOY Manager: ${state.relationship_manager}` : ''}</p>
                <p className='error-message'>{state.errorContact === true ? 'Multiple Contacts exists, invalid Test Account' : ''}</p>
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
    contact: state.contact,
    brand: state.brandInfo,
  }
}

export default connect(mapStateToProps, { updateContact, fetchContact, createContact })(BrandContact)
