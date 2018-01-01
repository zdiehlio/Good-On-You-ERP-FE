import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Input, Select, Radio, Progress } from 'semantic-ui-react'
import { fetchRetailers, createRetailer, fetchTerritories, updateRetailer } from '../../actions'
import { SuppHeading } from '../../components'
import _ from 'lodash'

class SuppDataRetailers extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      errorname: false,
      errorwebsite: false,
      territories: [],
      originalTerritories: [],
      territoryOptions: [],
      save: false,
    }

    const { id } = this.props.match.params

    this.handleInput = this.handleInput.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDropDown = this.handleDropDown.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleOnlineSave = this.handleOnlineSave.bind(this)
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchRetailers(id)
    this.props.fetchTerritories()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.pre_qa !== this.props.pre_qa) {
      _.map(nextProps.pre_qa, opt => {
        this.state.territoryOptions.push({text: opt.name, value: opt.name, key: opt.id})
      })
    }
    if(nextProps.qa !== this.props.qa) {
      _.map(nextProps.qa, check => {
        _.map(check.territories, ter => {
          this.state.territories.push({name: ter.name})
          this.state.originalTerritories.push({name: ter.name})
          this.setState({[ter.name]: ter.name})
        })
        this.setState({
          id: check.id,
          name: check.name,
          website: check.website,
          online_only: check.online_only,
          originalId: check.id,
          originalName: check.name,
          originalWebsite: check.website,
          originalOnline_only: check.online_only,
        })
      })
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
    _.map(this.state.territories, check => {
      if(this.state.originalTerritories.includes(check)) {
        return
      } else {
        this.setState({[check.name]: null})
      }
    })
    this.setState({
      isEditing: null,
      currentAnswer: null,
      id: this.state.originalId,
      name: this.state.originalName,
      website: this.state.originalWebsite,
      online_only: this.state.originalOnline_only,
      territories: this.state.originalTerritories,
    })
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state.name && this.state.website && this.state.errorwebsite === false){
      if(!this.state.id) {
        new Promise((resolve, reject) => {
          resolve(this.props.createRetailer({brand: id, name: this.state.name, website:this.state.website, territories: this.state.territories}))
        }).then(this.props.fetchRetailers(id))
        this.setState({save: true, isEditing: null, errorwebsite: false, errorname: false})
        console.log('create retailer')
      } else {
        this.props.updateRetailer(this.state.id, {name: this.state.name, website: this.state.website, territories: this.state.territories})
        this.setState({isEditing: null, errorwebsite: false, errorname: false})
        console.log('update retailer')
      }
    } else {
      console.log('catch')
      this.setState({errorwebsite: this.state.website &&  this.state.errorwebsite === false ? false : true, errorname: this.state.name ? false : true})
    }
  }

  handleOnlineSave() {
    const { id }  = this.props.match.params
    this.props.updateRetailer(this.state.id, {online_only: this.state.online_only})
    this.setState({isEditing: null})
    console.log('update online')
  }

  handleError(value, name) {
    if(value === '') {
      this.setState({[`error${name}`]: true})
    } else {
      this.setState({[`error${name}`]: false})
    }
    if(name === 'website') {
      if(/^(www\.)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/.test(value) && value !== ''){
        this.setState({errorwebsite: false})
      } else {
        this.setState({[`error${name}`]: true})
      }
    }
  }

  //handle text input change status, must be written seperate since value properties are inconsistent with radio buttons.
  handleInput(event, { value, name }) {
    this.setState({[name]: value})
    this.handleError(value, name)
  }

  handleDropDown(event, { value }) {
    if(this.state[value]) {
      console.log('error')
      this.handleDropDownError()
    } else {
      this.setState({errorTerritory: false, [value]: value, territories: [...this.state.territories, {name: value}]})
      console.log('drop', this.state.territories.name)
    }
  }

  handleDropDownError() {
    this.setState({errorTerritory: true})
  }

  handleRemove(event) {
    this.setState({[event.target.value]: null, territories: this.state.territories.filter(select => {return select.name !== event.target.value})})
  }

  renderTerritorries() {
    return _.map(this.state.territories, select => {
      return(
        <button key={select.name} value={select.name} className='chip' onClick={this.handleRemove}>
          {select.name} {'x'}
        </button>
      )
    })
  }

  //render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props', this.props.qa)
    console.log('preQA', this.props.pre_qa)
    console.log('state', this.state)
    const isEditing = this.state.isEditing
    const { id }  = this.props.match.params
    const state = this.state
    const props = this.props.qa
    return(
      <div className='form-container'>
        <SuppHeading id={id}/>
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/suppDataTypes/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Retailer</h3></div>
            <div><Link to={`/suppDataPrice/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress total={4} value={state.progressBar} progress />
        <form className='brand-form'>
          {isEditing === 'retailer' ? (
            <div className='editing'>
              <h5>What is the main retailer?</h5>
              <Form.Field inline>
                <Input
                  label='Retailer Name'
                  value={state.name}
                  onChange={this.handleInput}
                  name='name'
                />
                <div className='error-message'>{state.errorname === true ? 'Please enter retailer name' : ''}</div>
              </Form.Field>
              <Form.Field inline>
                <Input
                  label='Retailer Website'
                  value={state.website}
                  onChange={this.handleInput}
                  name='website'
                />
                <div className='error-message'>{state.errorwebsite === true ? 'Please enter valid website' : ''}</div>
              </Form.Field>
              <h5>Select one or more Retailer territories</h5>
              <Form.Field>
                <Select
                  name='territories'
                  placeholder='Choose Territory'
                  onChange={this.handleDropDown}
                  options={this.state.territoryOptions}
                />
                <div className='error-message'>{state.errorTerritory === true ? 'Territory already added' : ''}</div>
              </Form.Field>
              <h5>List of Retailer Territories</h5>
              {this.renderTerritorries()}
              <div className='button-container'>
                <div><button className='button-container' onClick={this.handleCancel}>Cancel</button></div>
                <div><button onClick={this.handleSave} name='retailer'>Save</button></div>
              </div>
              <div className='error-message'>{this.state.errorname === true || this.state.errorwebsite === true ?
                'Please fill out all required fields' : ''}</div>
            </div>) : (
            <div className='not-editing'>
              <h5>Main Retailer</h5>
              <p>Retailer Name: {state.name}</p>
              <p>Retailer Website: {state.website}</p>
              <h5>Retailer Territorries</h5>
              <ul>{_.map(state.territories, list => {return (<li key={list.name}>{list.name}</li>)})}</ul>
              <div className='button-container'>
                <div></div>
                <div><button name='retailer' onClick={this.handleEdit}>Edit</button></div>
              </div>
            </div>
          )}

          {isEditing === 'online' ? (
            <div className='editing'>
              <h5>Is the brand sold online only?</h5>
              <Form.Field inline>
                <Radio
                  label='Yes'
                  onChange={this.handleInput}
                  name='online_only'
                  value='true'
                  checked={state.online_only === 'true' ? true : false}
                />
              </Form.Field>
              <Form.Field inline>
                <Radio
                  label='No'
                  onChange={this.handleInput}
                  name='online_only'
                  value='false'
                  checked={state.online_only === 'false' ? true : false}
                />
              </Form.Field>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button onClick={this.handleOnlineSave} name='online'>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h5>Is the brand sold online only?</h5>
              <p>Online only: {state.online_only === 'true' ? 'Yes' : 'No'}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='online' onClick={this.handleEdit}>Edit</button></div>
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
    qa: state.qa,
    pre_qa: state.preQa,
  }
}

export default connect(mapStateToProps, { fetchRetailers, createRetailer, fetchTerritories, updateRetailer })(SuppDataRetailers)
