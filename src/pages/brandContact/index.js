import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchContact, createContact, updateContact } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'
import axios from 'axios'

class BrandContact extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
    }


    this.handleInput = this.handleInput.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    // this.handleDelete = this.handleDelete.bind(this)
  }
componentWillMount() {
  const { id } = this.props.match.params
  this.props.fetchContact(id)

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
    const { id }  = this.props.match.params
    this.props.updateContact(id, {name: this.state.name, email:this.state.email, relationship_manager: this.state.relationship_manager})
    this.setState({isEditing: null})
    console.log('save', this.state);
  }
  //handle text input change status, must be written seperate since value properties are inconsistent with radio buttons.
  handleInput(event) {
    this.setState({[event.target.name]: event.target.value})
  }

//render contains conditional statements based on state of isEditing as described in functions above.
render() {
  console.log('props', _.map(this.props.qa));
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
          <div><Link to={`/brandGeneral/${id}`}><button className='previous'>Previous</button></Link></div>
          <div><h3>Brand Contact</h3></div>
          <div><Link to={`/brandCauses/${id}`}><button className='next'>Next</button></Link></div>
        </span>
      </div>
      <form className='brand-form'>
      {isEditing === '1' ? (
        <div className='editing'>
        <ul>
          <h5>Brand Contact Name: </h5>
            <Field
              placeholder={props.name}
              onChange={this.handleInput}
              name='name'
              component='input'/>
          <h5>Brand Contact Email: </h5>
            <Field
              placeholder={props.email}
              onChange={this.handleInput}
              name='email'
              component='input'/>
            <h5>Brand GOY Relationship Manager: </h5>
              <Field
                placeholder={props.relationship_manager}
                onChange={this.handleInput}
                name='relationship_manager'
                component='input'/>
          </ul>
          <button onClick={this.handleCancel}>Cancel</button>
          <button onClick={this.handleSave} name='1' value='1'>Save</button>
        </div>) : (
        <div className='not-editing'>
          <h5>Brand Contact Information</h5>
          <p>Contact Name: {state.name ? state.name : props.name}</p>
          <p>Email: {state.email ? state.email : props.email}</p>
          <p>Relationship Manager: {state.relationship_manager ? state.relationship_manager : props.relationship_manager}</p>
          <button name='1' onClick={this.handleEdit} value='1'>Edit</button>
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
  form: 'BrandContactForm'
})(
  connect(mapStateToProps, { updateContact, fetchContact, createContact })(BrandContact)
)
