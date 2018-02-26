import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Input, Progress, Portal, Segment } from 'semantic-ui-react'
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
      error_name: true,
      errorContact: false,
      error_relationship_manager: true,
      changeError: false,
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
    this.props.fetchContact(id)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.contact.contact !== this.props.contact.contact) {
      if(nextProps.contact.contact) {
        if(nextProps.contact.contact.length > 1) {
          this.setState({errorContact: true})
        }
        this.setState({
          error_email: nextProps.contact.contact.email ? false : true,
          name: nextProps.contact.contact.name,
          email: nextProps.contact.contact.email,
          relationship_manager: nextProps.contact.contact.relationship_manager,
          originalName: nextProps.contact.contact.name,
          originalEmail: nextProps.contact.contact.email,
          originalRelationship_manager: nextProps.contact.contact.relationship_manager,
        })
        return this.state.progressBar++
      }
    }
  }

  //toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.setState({isEditing: event.target.name})
  }
  //sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    event.preventDefault()
    this.setState({
      renderError: false,
      renderChangeError: false,
      changeError: false,
      isEditing: null,
      name: this.state.originalName,
      email: this.state.originalEmail,
      relationship_manager: this.state.originalRelationship_manager})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state.error_email === false) {
      if(this.props.contact.contact) {
        this.props.updateContact(id, {name: this.state.name, email:this.state.email, relationship_manager: this.state.relationship_manager})
        if(event.target.value === 'next') {
          this.props.history.push(`/suppDataAlias/${id}`)
        }
      } else {
        this.props.createContact({brand: id, name: this.state.name, email:this.state.email, relationship_manager: this.state.relationship_manager})
        if(event.target.value === 'next') {
          this.props.history.push(`/suppDataAlias/${id}`)
        }
      }
      this.setState({isEditing: null, renderChangeError: false, changeError: false, enderError: false, error_email: false})
      return this.state.progressBar++
    } else {
      this.setState({renderError: true})
    }
  }
  //handle text input change status, must be written seperate since value properties are inconsistent with radio buttons.
  handleInput(event, { value, name }) {
    if(name === 'email') {
      if (value=== '') {
        this.setState({error_email: true})
      } else if(/^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/.test(value)) {
        this.setState({error_email: false})
      } else {
        this.setState({error_email: true})
      }
    }
    this.setState({currentEditing: '#contact', changeError: true, [name]: value})
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
        this.props.history.push(`/brandGeneral/${id}`)
      } else if(event.target.name === 'next') {
        this.props.history.push(`/suppDataAlias/${id}`)
      } else if(event.target.name === 'landing') {
        this.props.history.push(`/brandLanding/${id}`)
      }
    }
  }

  //render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props', this.props.contact)
    console.log('state', this.state)
    const isEditing = this.state.isEditing
    const { id }  = this.props.match.params
    const state = this.state
    const props = this.props.contact
    return(
      <div className='form-container'>
        <OverviewHeading id={id} brand={this.props.brand}/>
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
