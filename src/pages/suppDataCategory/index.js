import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Input, Progress } from 'semantic-ui-react'
import { fetchBrandCategory, createBrandCategory, updateBrandCategory, fetchAllCategory } from '../../actions'
import { SuppHeading } from '../../components'
import _ from 'lodash'
import axios from 'axios'

const ROOT_URL = 'https://goy-ed-2079.nodechef.com'


class SuppDataCategory extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: [],
      catOptions: [],
      categories: [],
      finalAnswer: null,
      input: null,
      save: false,
      dominantOptions: [],
      dominant_id: [],
      dominant: null,
    }


    this.handleCateChange = this.handleCateChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleCatSave = this.handleCatSave.bind(this)
    this.handleDominantChange = this.handleDominantChange.bind(this)
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchAllCategory()
    this.props.fetchBrandCategory(id)
  }

  componentWillReceiveProps(nextProps) {
    const { id } = this.props.match.params
    if(nextProps.pre_qa !== this.props.pre_qa) {
      _.map(nextProps.pre_qa, cat => {
        this.setState({[cat.name]: 'chip'})
      })
    }
    if(nextProps.qa !== this.props.qa) {
      _.map(nextProps.qa, check => {
        this.setState({[check.category.name]: 'chip-selected'})
      })
      _.map(nextProps.qa, check => {
        if(check.dominant === true) {
          this.setState({current_dominant_id: check.category_id, current_dominant_name: check.category.name})
        }
      })
      this.setState({
        currentAnswer: _.map(nextProps.qa, cat => {return {brand: id, category_id: cat.category_id}}),
        dominantOptions: _.map(nextProps.qa, dom => {return {name: dom.category.name, id: dom.category_id}}),
        dominant_id: _.map(nextProps.qa, check => {return check.category_id}),
      })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { id } = this.props.match.params
    if (nextState.save == true && this.state.save == false) {
      this.setState({currentAnswer: _.map(nextProps.qa, cat => {return {brand: id, category_id: cat.category_id}})})
    }
  }

  componentDidUpdate() {
    if(this.state.save === true) {
      this.setState({save: false})
    }
  }

  //toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.setState({isEditing: event.target.value})
  }

  renderDominant() {
    return _.map(this.state.dominantOptions, dom => {
      return(
        <button key={dom.name} value={dom.id} className={this.state.current_dominant_id === dom.id ? 'chip-selected' : 'chip'} name={dom.name} onClick={this.handleDominantChange}>
          {dom.name}
        </button>
      )
    })
  }

  renderCategories() {
    return _.map(this.props.pre_qa, cat => {
      return(
        <button key={cat.id} value={cat.id} className={this.state[cat.name]} name={cat.name} onClick={this.handleCateChange}>
          {cat.name} {this.state[cat.name] === 'chip-selected' ? 'x' : '+'}
        </button>
      )
    })
  }
  //sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    event.default()
    this.setState({isEditing: null, save: true})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleCatSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(event.target.name === '1') {
      this.props.createBrandCategory(id, this.state.currentAnswer)
    } else if(event.target.name === '2') {
      this.props.updateBrandCategory(id, this.state.current_dominant_id, this.state.dominant)
    }
    this.setState({isEditing: null, save: true})
  }
  //handle radio buttons change status, must be written seperate since value properties are inconsistent with text input.
  handleCateChange(event){
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state[event.target.name] === 'chip-selected') {
      this.setState({
        [event.target.name]: 'chip',
        currentAnswer: this.state.currentAnswer.filter(cat => {return cat.category_id != event.target.value}),
        dominantOptions: this.state.dominantOptions.filter(dom => {return dom.id !== parseInt(event.target.value)}),
      })
      if(event.target.name === this.state.current_dominant_name) {
        this.setState({current_dominant_name: null})
      }
    } else {
      this.setState({
        [event.target.name]: 'chip-selected',
        currentAnswer: [...this.state.currentAnswer, {brand: id, category_id: this.props.pre_qa[event.target.name].id}],
        dominantOptions: [...this.state.dominantOptions, {name: event.target.name, id: parseInt(event.target.value)}],
      })
    }
  }

  handleDominantChange(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.setState({
      current_dominant_id: parseInt(event.target.value),
      current_dominant_name: event.target.name,
      dominant: {dominant: true},
    })
  }

  //render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props', this.props.qa)
    console.log('state', this.state)
    console.log('pre_qa', this.props.pre_qa)
    const state = this.state
    const props = this.props.qa
    const isEditing = this.state.isEditing
    const { id }  = this.props.match.params
    return(
      <div className='form-container'>
        <SuppHeading id={id}/>
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/suppDataImage/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Brand Categories</h3></div>
            <div><Link to={`/suppDataStyles/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress total={4} value={state.progressBar} progress />
        <form className='brand-form'>
          {isEditing === '1' ? (
            <div className='editing'>
              <h5>What are the categories?</h5>
              <ul>
                {this.renderCategories()}
              </ul>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button onClick={this.handleCatSave} name='1' value='1'>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h5>What are the categories?</h5>
              <ul>{_.map(state.dominantOptions, cat => {return (<li key={cat.id}>{cat.name}</li>)})}</ul>
              <div className='button-container'>
                <div></div>
                <div><button name='1' onClick={this.handleEdit} value='1'>Edit</button></div>
              </div>
            </div>
          )}
          {isEditing === '2' ? (
            <div className='editing'>
              <h5>What is the Brands dominant category?</h5>
              <ul>
                {this.renderDominant()}
              </ul>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button onClick={this.handleCatSave} name='2' value='2'>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h5>What is the Brands dominant category?</h5>
              <ul>{state.current_dominant_name}</ul>
              <div className='button-container'>
                <div></div>
                <div><button name='2' onClick={this.handleEdit} value='2'>Edit</button></div>
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

export default connect(mapStateToProps, { fetchBrandCategory, createBrandCategory, updateBrandCategory, fetchAllCategory })(SuppDataCategory)
