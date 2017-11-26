import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBrandCategory, createBrandCategory, updateBrandCategory, fetchAllCategory } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'
import axios from 'axios'

const ROOT_URL = 'http://34.212.110.48:3000'


class SuppDataCategory extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: [],
      catOptions: [],
      finalAnswer: null,
      input: null,
      save: false,
      dominantOptions: [],
      dominant_id: [],
      dominant: []
    }


    this.handleCateChange = this.handleCateChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleCatSave = this.handleCatSave.bind(this)
    this.handleDominantEdit = this.handleDominantEdit.bind(this)
    this.handleDominantChange = this.handleDominantChange.bind(this)
  }
componentWillMount() {
  const { id } = this.props.match.params
  this.props.fetchAllCategory()
}

componentWillUpdate(nextProps, nextState) {
  const { id } = this.props.match.params
  if (nextState.save == true && this.state.save == false) {
    return
  }
}

componentDidUpdate() {
  if(this.state.save === true) {
    this.setState({save: false, currentAnswer: []})
  }
}

//toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.props.qa) {
      //if state of target button 'name' already exists, will set state of same target name to the current answer value and also toggle editing
      _.map(this.props.qa, cat => {
          this.setState({[cat.name]: 'chip', isEditing: event.target.value})
        })
    }
    axios.get(`${ROOT_URL}/brands-categories?brand=${id}`)
    .then(res => {
      this.state.currentAnswer.map(ans => this.setState({catOptions: [...this.state.catOptions, ans.category_id]}))
      res.data.data.map(check => {
        if(this.state.catOptions.includes(check.category_id)) {
          this.setState({[check.category.name]: 'chip-selected'})
        } else {
          this.setState({[check.category.name]: 'chip-selected', currentAnswer: [...this.state.currentAnswer, {brand: id, category_id: check.category_id}]})
        }
      })
    })
  }
  handleDominantEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    axios.get(`${ROOT_URL}/brands-categories?brand=${id}`)
    .then(res => {
      res.data.data.map(check => {
        if(this.state.dominant_id.includes(check.category_id)) {
          console.log('return');
          return
        } else {
          this.setState({dominantOptions: [...this.state.dominantOptions, check], dominant_id: [...this.state.dominant_id, check.category_id]})
        }
      })
    })
    this.setState({isEditing: event.target.name})
  }

  renderDominant() {
    return _.map(this.state.dominantOptions, dom => {
      return(
        <button key={dom.category.name} value={dom.category_id} className={dom.dominant === false ? 'chip' : 'chip-selected'} name={dom.category.name} onClick={this.handleDominantChange}>
          {dom.category.name}
        </button>
      )
    })
  }

  renderCategories() {
    return _.map(this.props.qa, cat => {
        return(
            <button key={cat.id} value={cat.id} className={this.state[cat.name]} name={cat.name} onClick={this.handleCateChange}>
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
  handleCatSave(event) {
    const { id }  = this.props.match.params
    if(event.target.name === '1') {
      this.props.createBrandCategory(id, this.state.currentAnswer)
    } else if(event.target.name === '2') {
      this.props.updateBrandCategory(id, this.state.dominant)
    }
    this.setState({isEditing: null})
  }
  //handle radio buttons change status, must be written seperate since value properties are inconsistent with text input.
  handleCateChange(event){
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state[event.target.name] === 'chip-selected') {
      this.setState({[event.target.name]: 'chip', currentAnswer: this.state.currentAnswer.filter(cat => {return cat.category_id != event.target.value})})
      console.log('value', event.target.value);
    } else {
      this.setState({[event.target.name]: 'chip-selected', currentAnswer: [...this.state.currentAnswer, {brand: id, category_id: this.props.qa[event.target.name].id}]})
    }
  }

  handleDominantChange(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.setState({dominant: [{category_id: parseInt(event.target.value), dominant: true}]})
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
            <button onClick={this.handleCatSave} name='1' value='1'>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h5>What are the categories?</h5>
            <button name='1' onClick={this.handleEdit} value='1'>Edit</button>
          </div>
          )}
          {isEditing === '2' ? (
            <div className='editing'>
            <h5>What is the Brands dominant category?</h5>
              <ul>
              {this.renderDominant()}
              </ul>
              <button onClick={this.handleCancel}>Cancel</button>
              <button onClick={this.handleCatSave} name='2' value='2'>Save</button>
            </div>) : (
            <div className='not-editing'>
              <h5>What is the Brands dominant category?</h5>
              <button name='2' onClick={this.handleDominantEdit} value='2'>Edit</button>
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
