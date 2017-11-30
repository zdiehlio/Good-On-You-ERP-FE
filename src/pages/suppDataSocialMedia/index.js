import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchGeneral, updateSocial } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'

class SuppDataSocialMedia extends Component {
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
  this.props.fetchGeneral(id, 'social-media')

}

componentWillReceiveProps(nextProps) {
  if(nextProps.qa != this.props.qa) {
    this.setState({facebook_url: nextProps.qa.facebook_url, instagram_url: nextProps.qa.instagram_url})
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
    this.props.updateSocial(id, {facebook_url: this.state.facebook_url, instagram_url:this.state.instagram_url})
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
          <div><Link to={`/brandSummary/${id}`}><button className='previous'>Previous</button></Link></div>
          <div><h3>Social Media</h3></div>
          <div><Link to={`/suppDataImages/${id}`}><button className='next'>Next</button></Link></div>
        </span>
      </div>
      <form className='brand-form'>
      {isEditing === 'social' ? (
        <div className='editing'>
        <ul>
            <h5>What is the Facebook URL </h5>
            <li><Field
              placeholder={props.facebook_url}
              onChange={this.handleInput}
              name='facebook_url'
              component='input'/>
            </li>
            <h5>What is the Instagram URL? </h5>
            <li><Field
              placeholder={props.instagram_url}
              onChange={this.handleInput}
              name='instagram_url'
              component='input'/>
            </li>
          </ul>
          <button onClick={this.handleCancel}>Cancel</button>
          <button onClick={this.handleSave} name='social'>Save</button>
        </div>) : (
        <div className='not-editing'>
          <h5>Brand Social Media</h5>
          <p>Facebook URL: {state.facebook_url}</p>
          <p>Instagram URL: {state.instagram_url}</p>
          <button name='social' onClick={this.handleEdit}>Edit</button>
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
  form: 'SuppDataSocialMediaForm'
})(
  connect(mapStateToProps, { fetchGeneral, updateSocial })(SuppDataSocialMedia)
)
