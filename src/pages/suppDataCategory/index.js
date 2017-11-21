import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBrandCategory, createBrandCategory, updateBrandCategory, fetchAllCategory } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'
import axios from 'axios'


class SuppDataCategory extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: [],
      catOptions: [],
      finalAnswer: null,
      input: null
    }


    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }
componentWillMount() {
  const { id } = this.props.match.params
  this.props.fetchAllCategory()
  // this.props.fetchBrandCategory(id)
}

//toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.props.qa) {
      //if state of target button 'name' already exists, will set state of same target name to the current answer value and also toggle editing
      _.map(this.props.qa, cat => {
          this.setState({[cat.name]: 'chip'})
    })
      //if state of target 'name' does not yet exist, will pull value of answer off props and set state to that answer and also toggle editing
    }
    //if an answer has not yet been created(first time visiting this specific question for this brand), will create a post request and toggle editing
    else {
      console.log('post');
    }
    this.setState({isEditing: event.target.value})
  }

  renderCategories() {
    return _.map(this.props.qa, cat => {
        return(
            <button key={cat.id} className={this.state[cat.name]} name={cat.name} onClick={this.handleChange}>
              {cat.name} {this.state[cat.name] === 'chip-selected' ? 'x' : '+'}
            </button>
        )
      })
  }
//sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    this.setState({isEditing: null})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    const { id }  = this.props.match.params
    this.props.createBrandCategory(id, this.state.currentAnswer)
    this.setState({isEditing: null})
    console.log('save', this.state);
  }
  //handle radio buttons change status, must be written seperate since value properties are inconsistent with text input.
  handleChange(event){
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state[event.target.name] === 'chip-selected') {
      this.setState({[event.target.name]: 'chip', currentAnswer: this.currenAnswer.slice()})
    } else {
      this.setState({[event.target.name]: 'chip-selected', currentAnswer: [...this.state.currentAnswer, {brand: id, category_id: this.props.qa[event.target.name].id}]})
    }
  }

//render contains conditional statements based on state of isEditing as described in functions above.
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
            <div><Link to={`/brandSummary/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Brand Categories</h3></div>
            <div><button className='next'>Next</button></div>
          </span>
        </div>
        <form className='brand-form'>
        {isEditing === '1' ? (
          <div className='editing'>
          <h5>What are the categories?</h5>
            <ul>
              {this.renderCategories()}
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave} name='1' value='1'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h5>What is the one sentence that describes the brand best?</h5>
            <button name='1' onClick={this.handleEdit} value='1'>Edit</button>
          </div>
          )}
          {isEditing === '2' ? (
            <div className='editing'>
            <h5>What is the Brands dominant category?</h5>
            <p>Select one of the proposed sentences shown below.  If required, edit it and then choose save</p>
              <ul>
              </ul>
              <button onClick={this.handleCancel}>Cancel</button>
              <button onClick={this.handleSave} name='2' value='2'>Save</button>
            </div>) : (
            <div className='not-editing'>
              <h5>What is the Brands dominant category?</h5>
              <button name='2' onClick={this.handleEdit} value='2'>Edit</button>
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
  form: 'SuppDataCategoryForm'
})(
  connect(mapStateToProps, { fetchBrandCategory, createBrandCategory, updateBrandCategory, fetchAllCategory })(SuppDataCategory)
)
