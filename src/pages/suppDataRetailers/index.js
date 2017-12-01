import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchRetailers, createRetailer, fetchTerritories, updateRetailer } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'

class SuppDataRetailers extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      territories: []
    }


    this.handleInput = this.handleInput.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDropDown = this.handleDropDown.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }
componentWillMount() {
  const { id } = this.props.match.params
  this.props.fetchRetailers(id)
  this.props.fetchTerritories()
}

componentWillReceiveProps(nextProps) {
  if(nextProps.qa != this.props.qa) {
    this.setState({name: nextProps.qa.name, website: nextProps.qa.website, online_only: nextProps.qa.online_only})
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
    this.setState({isEditing: null, currentAnswer: null})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(event.target.name === 'retailer') {
      this.props.createRetailer({brand: id, name: this.state.name, website:this.state.website, territories: this.state.territories})
    } else if(event.target.name === 'online') {
      this.props.updateRetailer(id, {online_only: this.state.online_only})
    }
    this.setState({isEditing: null})
    console.log('save', this.state);
  }
  //handle text input change status, must be written seperate since value properties are inconsistent with radio buttons.
  handleInput(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  handleDropDown(event) {
    if(this.state[event.target.value] === event.target.value) {
      console.log('Territory already added');
    } else {
      this.setState({[event.target.value]: event.target.value, territories: [...this.state.territories, {name: event.target.value}]})
      console.log('drop', this.state.territories);
    }
  }
  renderDropDown() {
    return _.map(this.props.pre_qa, zone => {
      return(
        <option key={zone.id} value={zone.name}>{zone.name}</option>
      )
    })
  }

  handleRemove(event) {
    this.setState({[event.target.value]: null, territories: this.state.territories.filter(select => {return select.name != event.target.value})})
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
  console.log('props', this.props.qa);
  console.log('preQA', this.props.pre_qa);
  console.log('state', this.state);
  const isEditing = this.state.isEditing
  const { id }  = this.props.match.params
  const state = this.state
  const props = this.props.qa
  return(
    <div className='form-container'>
      <FormsHeader />
      <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
      <div className='forms-header'>
        <span className='form-navigation'>
          <div><Link to={`/suppDataTypes/${id}`}><button className='previous'>Previous</button></Link></div>
          <div><h3>Retailer</h3></div>
          <div><Link to={`/suppDataPrice/${id}`}><button className='next'>Next</button></Link></div>
        </span>
      </div>
      <form className='brand-form'>
      {isEditing === 'retailer' ? (
        <div className='editing'>
        <ul>
            <h5>What is the main retailer?</h5>
            <li>Retailer Name<Field
              placeholder={props.name}
              onChange={this.handleInput}
              name='name'
              component='input'/>
            </li>
            <h5>Retailer Website </h5>
            <li><Field
              placeholder={props.website}
              onChange={this.handleInput}
              name='website'
              component='input'/>
            </li>
            <li><Field
              name='territories'
              component='select'
              onChange={this.handleDropDown}>
                <option />
                {this.renderDropDown()}
              </Field>
            </li>
            <h5>List of Retailer Territories</h5>
            {this.renderTerritorries()}
          </ul>
          <button onClick={this.handleCancel}>Cancel</button>
          <button onClick={this.handleSave} name='retailer'>Save</button>
        </div>) : (
        <div className='not-editing'>
          <h5>Main Retailer</h5>
          <p>Retailer Name: {state.name}</p>
          <p>Retailer Website: {state.website}</p>
          <button name='retailer' onClick={this.handleEdit}>Edit</button>
        </div>
        )}

        {isEditing === 'online' ? (
          <div className='editing'>
          <ul>
              <h5>Is the brand sold online only?</h5>
              <li><Field
                type='radio'
                onChange={this.handleInput}
                name='online_only'
                value={true}
                checked={state.online_only === 'true'}
                component='input'/> Yes
              </li>
              <li><Field
                type='radio'
                onChange={this.handleInput}
                name='online_only'
                value={false}
                checked={state.online_only === 'false'}
                component='input'/> No
              </li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave} name='online'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h5>Is the brand sold online only?</h5>
            <p>Online only: {state.online_only}</p>
            <button name='online' onClick={this.handleEdit}>Edit</button>
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
    pre_qa: state.preQa
  }
}

export default reduxForm({
  form: 'SuppDataRetailersForm'
})(
  connect(mapStateToProps, { fetchRetailers, createRetailer, fetchTerritories, updateRetailer })(SuppDataRetailers)
)
