import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Input, Progress, Portal, Segment, Loader } from 'semantic-ui-react'
import { HashLink } from 'react-router-hash-link'
import { fetchAlias, createAlias, deleteAlias  } from '../../actions/alias'
import { SuppHeading } from '../../components'
import _ from 'lodash'
import axios from 'axios'

import './suppDataAlias.css'

class SuppDataAlias extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: '',
      renderAlias: null,
      renderChangeError: false,
      save: false,
      aliasArr: [],
      progressBar: 0,
    }

    this.brandId = this.props.match.params.id

    this.handleInput = this.handleInput.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleNav = this.handleNav.bind(this)
    this.handlePortal = this.handlePortal.bind(this)
  }

  //calls API to receive currently saved Alias names for brand
  componentWillMount() {
    this.setState({isLoading: true})
    this.props.fetchAlias(this.brandId)
  }

  //when component receives props with data from API, will push alias names in array in state
  componentWillReceiveProps(nextProps) {
    if(nextProps.alias !== this.props.alias) {
      _.map(nextProps.alias, val => {
        this.state.aliasArr.push({alias: val.alias})
      })
      if(nextProps.alias.length > 0) {
        this.state.progressBar++
      }
      this.setState({isLoading: false})
    }
  }

  //toggles editing mode for specified question and sets state of all alias names to be displayed under input
  handleEdit(event) {
    event.preventDefault()
    _.map(this.props.alias, name=> {
      this.setState({[name.alias]: name.alias})
    })
    this.setState({isEditing: event.target.name})
  }

  //clears all errors in state and recalls API to ensure all data displayed to user is up to date
  handleCancel(event) {
    event.preventDefault()
    this.setState({aliasArr: [], changeError: false, renderChangeError: false, isLoading: true, isEditing: null, renderCurrent: null, currentAnswer: ''})
    this.props.fetchAlias(this.brandId)
  }

  //handles state of alias names to be displayed in non editing mode
  handleSave(event) {
    event.preventDefault()
    this.setState({isEditing: null, renderCurrent: this.state.currentAnswer})
    if(event.target.value === 'next') {
      this.props.history.push(`/env-standards-compliance/${this.brandId}`)
    }
    if(this.state.aliasArr.length > 0) {
      this.state.progressBar++
    } else {
      this.setState({progressBar: 0})
    }
    this.setState({renderCurrent: null, currentAnswer: '', changeError: false, renderChangeError: false})
  }

  //sets state of the input value, toggles change error, and sets current editing as hashlink
  handleInput(event, { value }) {
    this.setState({currentEditing: '#alias', changeError: true,  currentAnswer: value})
  }

  //deletes specified alias name from state and sends DELETE request to API
  handleDelete(event) {
    event.preventDefault()
    this.props.deleteAlias(this.brandId, event.target.name)
    this.setState({aliasArr: this.state.aliasArr.filter(ali => {return ali.alias !== event.target.name}), [event.target.name]: null})
  }

  //adds value of current answer to array of alias names in state and sends POST request to API
  handleAdd(event) {
    event.preventDefault()
    this.props.createAlias({brand: this.brandId, alias: this.state.currentAnswer})
    this.setState({aliasArr: [...this.state.aliasArr, {alias: this.state.currentAnswer}]})
  }

  //render list of currently saved alias names along with delete button that will remove the name from state and API
  renderAlias() {
    return _.map(this.state.aliasArr, name => {
      if(name) {
        return(
          <div className='alias-item' key={name.id}>
            <div>{name.alias}</div>
            <div><button className='delete-alias' onClick={this.handleDelete} name={name.id}>Delete</button></div>
          </div>
        )
      }
    })
  }

  //closes portal upon clicking Go button
  handlePortal() {
    this.setState({portal: false})
  }

  //handles navigation between pages to prevent users from leaving current page while they are currently editing a question.
  handleNav(event) {
    if(this.state.changeError === true) {
      this.setState({renderChangeError: true, portal: true})
    } else {
      if(event.target.name === 'previous') {
        this.props.history.push(`/brandContact/${this.brandId}`)
      } else if(event.target.name === 'next') {
        this.props.history.push(`/env-standards-compliance/${this.brandId}`)
      } else if(event.target.name === 'landing') {
        this.props.history.push(`/brandLanding/${this.brandId}`)
      }
    }
  }

  //render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props', this.props.alias)
    console.log('state', this.state)
    const isEditing = this.state.isEditing
    const prop = this.props.alias
    const state = this.state
    const { id }  = this.props.match.params
    return(
      <div className='form-container'>
        <SuppHeading id={id} brand={this.props.brand}/>
        <div className='forms-header'><button onClick={this.handleNav} name='landing'>Back to Summary</button></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><button onClick={this.handleNav} name='previous' className='previous'>Previous</button></div>
            <div><h3>Alternative Names / Spelling</h3></div>
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
          <form className='brand-form'>
            {isEditing === '1' ? (
              <div className='editing' id='alias'>
                <h5>Add any alternative names the brand might have: </h5>
                <Form.Field inline>
                  <Input
                    label='Brand Alias'
                    placeholder={this.currentAnswer}
                    value={state.currentAnswer}
                    onChange={this.handleInput}
                    name='summary'
                  />
                  <button className='add' onClick={this.handleAdd} value={this.state.currentAnswer}>Add</button>
                </Form.Field>
                <p className='error-message'>{state.renderChangeError === true ? 'Please hit Done or Cancel your current input' : ''}</p>
                <h5>{state.aliasArr.length > 0 ? 'List of current Brand Aliases:' : ''} </h5>
                <div className='alias-list'>{
                  _.map(this.state.aliasArr, name => {
                    return(
                      <div className='alias-item' key={name.alias}>
                        <div>{name.alias}</div>
                        <div><button className='delete-alias' onClick={this.handleDelete} name={name.alias}>Delete</button></div>
                      </div>
                    )
                  })}</div>
                <div className='button-container'>
                  <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                  <div><button onClick={this.handleSave}>Done</button></div>
                  <div><button onClick={this.handleSave} value='next'>Next</button></div>
                </div>
              </div>) : (
              <div className='not-editing'>
                <h5>Add any alternative names the brand might have: </h5>
                <h5>{state.aliasArr.length > 0 ? 'List of current Brand Aliases:' : ''} </h5>
                <ul>{_.map(state.aliasArr, ali => {
                  return(
                    <li key={ali.alias}>{ali.alias}</li>
                  )}
                )}
                </ul>
                <div className='button-container'>
                  <div></div>
                  <div><button name='1' onClick={this.handleEdit} value='1'>Edit</button></div>
                </div>
              </div>
            )}
          </form>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    alias: state.alias,
    brand: state.brandInfo,
  }
}

export default connect(mapStateToProps, { fetchAlias, createAlias, deleteAlias })(SuppDataAlias)
