import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { connect } from 'react-redux'
import { Form, Input, Select, Radio, Progress } from 'semantic-ui-react'
import { fetchRetailers, createRetailer, fetchTerritories, updateRetailer } from '../../actions/retailer'
import { SuppHeading } from '../../components'
import _ from 'lodash'

class SuppDataRetailers extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      errorname: false,
      territories: [],
      originalTerritories: [],
      territoryOptions: [],
      save: false,
      progressBar: 0,
      changeError: false,
      renderChangeError: false,
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
    if(nextProps.retailer !== this.props.retailer) {
      _.map(nextProps.retailer, check => {
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
        if(check.name || check.website) {
          this.state.progressBar++
        }
        if(check.online_only) {
          this.state.progressBar++
        }
      })
    }
  }

  //toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state.changeError === false) {
      this.setState({isEditing: event.target.name})
    } else {
      this.setState({renderChangeError: true})
      alert(`Please click Save on previously edited question to save your selected answers or cancel to disregard your selections`)
    }
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
      errorname: false,
      changeError: false,
      renderChangeError: false,
    })
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state.name && this.state.errorwebsite === false){
      if(!this.state.id) {
        new Promise((resolve, reject) => {
          resolve(this.props.createRetailer({brand: id, name: this.state.name, website:this.state.website.length > 0 ? this.state.website : null, territories: this.state.territories}))
        }).then(this.props.fetchRetailers(id))
        this.state.progressBar++
        event.target.value === 'next' ? this.setState({isEditing: 'online'}) : this.setState({isEditing: null})
        this.setState({renderChangeError: false, changeError: false, save: true, errorname: false})
      } else {
        this.props.updateRetailer(this.state.id, {name: this.state.name, website: this.state.website.length > 0 ? this.state.website : null, territories: this.state.territories})
        event.target.value === 'next' ? this.setState({isEditing: 'online'}) : this.setState({isEditing: null})
        this.setState({renderChangeError: false, changeError: false, errorname: false})
      }
    } else {
      this.setState({errorname: this.state.name ? false : true, errorwebsite: this.state.name ? false : true})
    }
  }

  handleOnlineSave(event) {
    const { id }  = this.props.match.params
    this.props.updateRetailer(this.state.id, {online_only: this.state.online_only})
    this.state.progressBar++
  }

  handleError(value, name) {
    if(name === 'name' && value === '') {
      this.setState({[`error${name}`]: true})
    } else {
      this.setState({[`error${name}`]: false})
    }
    if(name === 'website' && value.length > 0) {
      if((/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value) && value !== '') || (/^(www\.)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/.test(value) && value !== '')){
        this.setState({errorwebsite: false})
      } else {
        this.setState({[`error${name}`]: true})
      }
    } else {
      this.setState({[`error${name}`]: false})
    }
  }

  //handle text input change status, must be written seperate since value properties are inconsistent with radio buttons.
  handleInput(event, { value, name }) {
    this.setState({changeError: true, [name]: value})
    this.handleError(value, name)
  }

  handleDropDown(event, { value }) {
    if(this.state[value]) {
      this.handleDropDownError()
    } else {
      this.setState({changeError: true, errorTerritory: false, [value]: value, territories: [...this.state.territories, {name: value}]})
    }
  }

  renderOnline() {
    if(this.state.online_only === 'true') {
      return <p>Online Only: Yes</p>
    } else if(this.state.online_only === 'false') {
      return <p>Online Only: No</p>
    }
  }
  handleDropDownError() {
    this.setState({errorTerritory: true})
  }

  handleRemove(event) {
    this.setState({changeError: true, [event.target.value]: null, territories: this.state.territories.filter(select => {return select.name !== event.target.value})})
  }

  renderTerritorries() {
    let sorted = this.state.territories.sort((a, b) => {
      let nameA=a.name.toLowerCase()
      let nameB=b.name.toLowerCase()
      if(nameA < nameB) {
        return -1
      }
      if(nameA > nameB) {
        return 1
      }
      return 0
    })
    if(this.state.territories.length > 0) {
      return _.map(sorted, select => {
        return(
          <button key={select.name} value={select.name} className='chip' onClick={this.handleRemove}>
            {select.name} {'x'}
          </button>
        )
      })
    } else {
      return(
        <p>No retailer{'\''}s territory selected</p>
      )
    }
  }

  //render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props', this.props.retailer)
    console.log('preQA', this.props.pre_qa)
    console.log('state', this.state)
    const isEditing = this.state.isEditing
    const { id }  = this.props.match.params
    const state = this.state
    const props = this.props.qa
    let sorted = this.state.territories.sort((a, b) => {
      let nameA=a.name.toLowerCase()
      let nameB=b.name.toLowerCase()
      if(nameA < nameB) {
        return -1
      }
      if(nameA > nameB) {
        return 1
      }
      return 0
    })
    return(
      <div className='form-container'>
        <SuppHeading id={id} brand={this.props.brand}/>
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/suppDataPrice/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Retailer</h3></div>
            <div><button disabled className='next disabled'>Next</button></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress total={2} value={state.progressBar} progress />
        <form className='brand-form'>
          {isEditing === 'retailer' ? (
            <div className='editing'>
              <h5>What is the main retailer? *</h5>
              <Form.Field inline className={state.errorname === true ? 'ui error input' : 'ui input'}>
                <Input
                  label='Retailer Name *'
                  value={state.name}
                  onChange={this.handleInput}
                  name='name'
                />
              </Form.Field>
              <p className='error-message'>{state.errorname === true ? 'Please enter retailer name' : ''}</p>
              <Form.Field inline className={state.errorwebsite === true ? 'ui error input' : 'ui input'}>
                <Input
                  label='Retailer Website'
                  value={state.website}
                  onChange={this.handleInput}
                  name='website'
                />
              </Form.Field>
              <p className='error-message'>{state.errorwebsite === true ? 'Please enter a valid URL' : ''}</p>
              <h5>Select one or more Retailer territories</h5>
              <Form.Field>
                <Select
                  name='territories'
                  placeholder='Choose Territory'
                  onChange={this.handleDropDown}
                  options={
                    this.state.territoryOptions.sort((a, b) => {
                      let nameA=a.text.toLowerCase()
                      let nameB=b.text.toLowerCase()
                      if(nameA < nameB) {
                        return -1
                      }
                      if(nameA > nameB) {
                        return 1
                      }
                      return 0
                    })}
                />
              </Form.Field>
              <p className='error-message'>{state.errorTerritory === true ? 'Territory already added' : ''}</p>
              <h5>List of Retailer Territories</h5>
              {this.renderTerritorries()}
              <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
              <div className='button-container'>
                <div><button className='button-container' onClick={this.handleCancel}>Cancel</button></div>
                <div><button onClick={this.handleSave} name='retailer'>Save</button></div>
                <div><HashLink to='#online'><button onClick={this.handleSave} name='retailer' value='next'>Save & Next</button></HashLink></div>
              </div>
              <div className='error-message'>{this.state.errorname === true ?
                'Please fill out all required fields' : ''}</div>
            </div>) : (
            <div className='not-editing'>
              <h5>What is the Main Retailer? *</h5>
              {state.name ? <p>Retailer Name: {state.name}</p> : ''}
              {state.website ? <p>Retailer Website: {state.website}</p> : ''}
              {state.territories.length > 0 ? <h5>Retailer Territories</h5> : ''}
              {state.territories.length > 0 ?
                <ul>{_.map(sorted, list => {return (<li key={list.name}>{list.name}</li>)})}</ul> :
                '' }
              <div className='button-container'>
                <div></div>
                <div><button name='retailer' onClick={this.handleEdit}>Edit</button></div>
              </div>
              <p className='small-divider'></p>
            </div>
          )}

          {isEditing === 'online' ? (
            <div className='editing' id='online'>
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
              <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button onClick={this.handleOnlineSave} name='online'>Save</button></div>
                <div><Link to={`/brandLanding/${id}`}><button onClick={this.handleOnlineSave} name='online'>Save & Finish</button></Link></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h5>Is the brand sold online only?</h5>
              {this.renderOnline()}
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
    retailer: state.retailer,
    pre_qa: state.preQa,
    brand: state.brandInfo,
  }
}

export default connect(mapStateToProps, { fetchRetailers, createRetailer, fetchTerritories, updateRetailer })(SuppDataRetailers)
