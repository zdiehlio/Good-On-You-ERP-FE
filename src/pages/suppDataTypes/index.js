import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { HashLink } from 'react-router-hash-link'
import { Form, Checkbox, Progress, Portal, Segment } from 'semantic-ui-react'
import { fetchType, createType, deleteType } from '../../actions/type'
import { SuppHeading } from '../../components'
import _ from 'lodash'

class SuppDataTypes extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      typeValues: [],
      deleteValues: [],
      validateTypes: [],
      typeOptions: ['activewear', 'casualwear', 'eveningwear', 'smartcasual', 'workwear'],
      save: false,
      renderChangeError: false,
      progressBar: 0,
    }

    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleNav = this.handleNav.bind(this)
    this.handlePortal = this.handlePortal.bind(this)
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchType(id)
  }

  componentWillReceiveProps(nextProps) {
    const { id } = this.props.match.params
    if(nextProps.types !== this.props.types) {
      _.mapValues(nextProps.types, type => {
        this.setState({[type.product]: type.product})
        this.state.validateTypes.push(type.product)
      })
      if(Object.keys(nextProps.types).length > 0) {
        this.state.progressBar++
      }
      // this.setState({typeValues: _.map(nextProps.types, type => {return {brand: id, product: type.product} })})
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
    const { id }  = this.props.match.params
    _.map(this.state.typeValues, val => {
      this.setState({[val.product]: null})
    })
    this.setState({changeError: false, renderChangeError: false, error: false, isEditing: null, typeValues: []})
    this.props.fetchType(id)
  }

  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state.typeValues.length > 0 || this.state.deleteValues.length > 0 ) {
      if(this.state.validateTypes.length <= 0) {
        this.setState({error: true})
      } else {
        _.map(this.state.deleteValues, type => {
          this.props.deleteType(id, type)
        })
        this.props.createType(this.state.typeValues)
        event.target.value === 'next' ? this.props.history.push(`/suppDataPrice/${id}`) : this.setState({changeError: false, renderChangeError: false, isEditing: null})
        this.state.progressBar++
      }
    } else {
      if(this.state.validateTypes.length > 0) {
        event.target.value === 'next' ? this.props.history.push(`/suppDataPrice/${id}`) : this.setState({changeError: false, renderChangeError: false, isEditing: null})
      } else {
        this.setState({error: true})
      }
    }
  }

  handleCheckbox(event, { name }) {
    const { id }  = this.props.match.params
    if(this.state[name] === name) {
      this.setState({
        [name]: null,
        typeValues: this.state.typeValues.filter(type => {return type.product !== name}),
        validateTypes: this.state.validateTypes.filter(type => {return type !== name}),
        deleteValues: [...this.state.deleteValues, name],
      })
    } else {
      this.setState({
        [name]: name,
        validateTypes: [...this.state.validateTypes, name],
        typeValues: [...this.state.typeValues, {brand: id, product: name}],
        deleteValues: this.state.deleteValues.filter(type => {return type !== name}),
        error: false,
      })
    }
    this.setState({changeError: true, currentEditing: '#type'})
  }

  renderSelected() {
    return _.map(this.state.typeOptions, type => {
      if(this.state[type] === type)
        return(
          <li key={type}>
            {type}
          </li>
        )
    })
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
        this.props.history.push(`/suppDataStyles/${id}`)
      } else if(event.target.name === 'next') {
        this.props.history.push(`/suppDataPrice/${id}`)
      } else if(event.target.name === 'landing') {
        this.props.history.push(`/brandLanding/${id}`)
      }
    }
  }

  render() {
    console.log('props', this.props.types)
    console.log('state', this.state)
    const isEditing = this.state.isEditing
    const state = this.state
    const props = this.props.types
    const { id }  = this.props.match.params
    return(
      <div className='form-container'>
        <SuppHeading id={id} brand={this.props.brand}/>
        <div className='forms-header'><button onClick={this.handleNav} name='landing'>Back to Summary</button></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><button onClick={this.handleNav} name='previous' className='previous'>Previous</button></div>
            <div><h3>Product Types</h3></div>
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
        <form className='brand-form'>
          {isEditing === '1' ? (
            <div className='editing' id='type'>
              <h5>What are the product types?  Select one or more *</h5>
              <Form.Field inline className={state.error === true ? 'ui error checkbox' : 'ui checkbox'}>
                <Checkbox
                  label='Workwear'
                  onChange={this.handleCheckbox}
                  checked={state.workwear ? true : false}
                  name='workwear'
                />
              </Form.Field>
              <Form.Field inline>
                <Checkbox
                  label='Activewear'
                  onChange={this.handleCheckbox}
                  checked={state.activewear ? true : false}
                  name='activewear'
                />
              </Form.Field>
              <Form.Field inline>
                <Checkbox
                  label='Casualwear'
                  onChange={this.handleCheckbox}
                  checked={state.casualwear ? true : false}
                  name='casualwear'
                />
              </Form.Field>
              <Form.Field inline>
                <Checkbox
                  label='Eveningwear'
                  onChange={this.handleCheckbox}
                  checked={state.eveningwear ? true : false}
                  name='eveningwear'
                />
              </Form.Field>
              <Form.Field inline>
                <Checkbox
                  label='Smart Casual'
                  onChange={this.handleCheckbox}
                  checked={state.smartcasual ? true : false}
                  name='smartcasual'
                />
              </Form.Field>
              <p className='error-message'>{state.error === true ? 'Please select at least one option' : ''}</p>
              <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button onClick={this.handleSave} name='1'>Save</button></div>
                <div><button onClick={this.handleSave} name='1' value='next'>Save & Next</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h5>What are the product types? *</h5>
              <p>{this.renderSelected()}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='1' onClick={this.handleEdit}>Edit</button></div>
              </div>
            </div>
          )}
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    types: state.types,
    brand: state.brandInfo,
  }
}

export default connect(mapStateToProps, { fetchType, createType, deleteType})(SuppDataTypes)
