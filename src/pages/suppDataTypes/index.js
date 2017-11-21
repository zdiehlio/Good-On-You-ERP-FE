import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { fetchType, createType, deleteType } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'
import axios from 'axios'

class SuppDataTypes extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      typeValues: [],
      typeOptions: ['activewear', 'casualwear', 'eveningwear', 'smartcasual', 'workwear'],
      save: false
    }

    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
  }
componentWillMount() {
  const { id } = this.props.match.params
  this.props.fetchType(id)
}

componentWillUpdate(nextProps, nextState) {
  const { id } = this.props.match.params
  if (nextState.save == true && this.state.save == false) {
    this.props.fetchType(id)
  }
}

//toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    _.mapValues(this.props.qa, type => {
      this.setState({[type.product]: {type}})
    })
    this.setState({isEditing: event.target.name, save: false})
}
//sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    this.setState({isEditing: null})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.setState({isEditing: null, save: true})
  }

  handleCheckbox(event) {
    const { id }  = this.props.match.params
    if(this.state[event.target.name]) {
      this.props.deleteType(id, event.target.name)
      this.setState({[event.target.name]: null})
      console.log('delete');
    } else {
      this.props.createType([{brand: id, product: event.target.name}])
      this.setState({[event.target.name]: event.target.name})
      console.log('post');
    }
  }

  renderTypes() {
    return _.map(this.props.qa, type => {
      return(
        <li key={type.id}>
          {type.product}
        </li>
      )
    })
  }

  render() {
    console.log('props', this.props.qa);
    console.log('state', this.state);
    const isEditing = this.state.isEditing
    const { id }  = this.props.match.params
    return(
      <div className='form-container'>
        <FormsHeader />
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><button className='previous'>Previous</button></div>
            <div><h3>Product Types</h3></div>
            <div><button className='next'>Next</button></div>
          </span>
        </div>
        <form className='brand-form'>
          {isEditing === '1' ? (
            <div className='editing'>
                <ul>
                <h5>What are the product types?  Select one or more?</h5>
                  <li> <Field
                    type='checkbox'
                    onChange={this.handleCheckbox}
                    checked={this.state.workwear}
                    name='workwear'
                    component='input' />Workwear
                  </li>
                  <li> <Field
                    type='checkbox'
                    onChange={this.handleCheckbox}
                    checked={this.state.activewear}
                    name='activewear'
                    component='input' />Activewear
                  </li>
                  <li> <Field
                    type='checkbox'
                    onChange={this.handleCheckbox}
                    checked={this.state.casualwear}
                    name='casualwear'
                    component='input' />Casualwear
                  </li>
                  <li> <Field
                    type='checkbox'
                    onChange={this.handleCheckbox}
                    checked={this.state.eveningwear}
                    name='eveningwear'
                    component='input' />Eveningwear
                  </li>
                  <li> <Field
                    type='checkbox'
                    onChange={this.handleCheckbox}
                    checked={this.state.smartcasual}
                    name='smartcasual'
                    component='input' />SmartCasual
                  </li>
                </ul>
                <ul>
                </ul>
              <button onClick={this.handleCancel}>Cancel</button>
              <button onClick={this.handleSave} name='1'>Save</button>
            </div>) : (
            <div className='not-editing'>
              <h5>What is the size of the Brand?</h5>
              <p>Current sizes:</p>
              <p>{this.renderTypes()}</p>
              <button name='1' onClick={this.handleEdit}>Edit</button>
            </div>
            )}
        </form>
      </div>
    )
  }
}

  function mapStateToProps(state) {
    return {qa: state.qa}
  }

  export default reduxForm({
    form: 'SuppDataTypesForm'
  })(
    connect(mapStateToProps, { fetchType, createType, deleteType})(SuppDataTypes)
  )
