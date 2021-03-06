import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { connect } from 'react-redux'
import { Form, Input, Progress, Portal, Segment, Loader } from 'semantic-ui-react'
import { fetchBrandCategory, createBrandCategory, updateBrandCategory, fetchAllCategory } from '../../actions/category'
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
      originalSelected: [],
      finalAnswer: null,
      input: null,
      dominantOptions: [],
      dominant_id: [],
      dominant: null,
      progressBar: 0,
      changeError: false,
      renderChangeError: false,
    }

    this.brandId = this.props.match.params.id

    this.handleCateChange = this.handleCateChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleCatSave = this.handleCatSave.bind(this)
    this.handleDominantChange = this.handleDominantChange.bind(this)
    this.handlePortal = this.handlePortal.bind(this)
    this.handleNav = this.handleNav.bind(this)
  }
  componentWillMount() {
    this.setState({isLoading: true})
    this.props.fetchAllCategory()
    this.props.fetchBrandCategory(this.brandId)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.pre_qa !== this.props.pre_qa) {
      _.map(nextProps.pre_qa, cat => {
        this.setState({ [cat.name]: 'chip' })
      })
    }
    if(nextProps.categories !== this.props.categories) {
      _.map(nextProps.categories, check => {
        this.setState({[check.category.name]: 'chip-selected'})
        this.state.currentAnswer.push({ brand: this.brandId, category_id: check.id })
        if(check.dominant === true) {
          this.setState({current_dominant_id: check.id, dominant: true })
          this.state.progressBar++
        }
      })
      _.map(nextProps.categories, check => {
        if(check.dominant === true) {
          this.setState({ current_dominant_id: check.category_id, current_dominant_name: check.category.name })
        }
      })
      this.setState({
        currentAnswer: _.map(nextProps.categories, cat => {return { brand: this.brandId, category_id: cat.category_id }}),
        dominantOptions: _.map(nextProps.categories, dom => {return { name: dom.category.name, id: dom.category_id }}),
        dominant_id: _.map(nextProps.categories, check => {return check.category_id}),
      })
      if(Object.keys(nextProps.categories).length > 0) {
        this.state.progressBar++
      }
      this.setState({isLoading: false})
    }
  }

  //toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    if(this.state.changeError === false) {
      this.setState({isEditing: event.target.value})
    } else {
      this.setState({renderChangeError: true, portal: true})
    }
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
    event.preventDefault()
    _.map(this.props.pre_qa, cat => {
      this.setState({[cat.name]: 'chip'})
    })
    this.setState({
      changeError: false,
      renderChangeError: false,
      dominantOptions: [],
      current_dominant_id: null,
      current_dominant_name: null,
      isEditing: null,
      save: true,
      isLoading: true,
    })
    this.props.fetchBrandCategory(this.brandId)
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleCatSave(event) {
    event.preventDefault()
    if(event.target.name === '1') {
      this.props.createBrandCategory(this.brandId, this.state.currentAnswer)
      this.setState({originalSelected: _.map(this.state.currentAnswer, check => check.name)})
      event.target.value === 'next' ? this.setState({isEditing: '2'}) : this.setState({isEditing: null})
      if(this.props.categories.length === 0) {
        this.state.progressBar++
      }
    } else if(event.target.name === '2') {
      this.props.updateBrandCategory(this.brandId, this.state.current_dominant_id, this.state.dominant)
      event.target.value === 'next' ? this.props.history.push(`/suppDataSku/${this.brandId}`) : this.setState({isEditing: null})
      this.state.progressBar++
    }
    this.setState({changeError: false, renderChangeError: false})
  }
  //handle radio buttons change status, must be written seperate since value properties are inconsistent with text input.
  handleCateChange(event){
    event.preventDefault()
    if(this.state[event.target.name] === 'chip-selected') {
      if(parseInt(event.target.value) === this.state.current_dominant_id) {
        this.setState({current_dominant_id: null})
      }
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
        currentAnswer: [...this.state.currentAnswer, {brand: this.brandId, category_id: this.props.pre_qa[event.target.name].id}],
        dominantOptions: [...this.state.dominantOptions, {name: event.target.name, id: parseInt(event.target.value)}],
      })
    }
    this.setState({currentEditing: '#category', changeError: true})
  }

  handleDominantChange(event) {
    event.preventDefault()
    this.setState({
      current_dominant_id: parseInt(event.target.value),
      current_dominant_name: event.target.name,
      dominant: {dominant: true},
      changeError: true,
      currentEditing: '#dominant',
    })
  }

  handlePortal() {
    this.setState({portal: false})
  }

  handleNav(event) {
    if(this.state.changeError === true) {
      this.setState({renderChangeError: true, portal: true})
    } else {
      if(event.target.name === 'previous') {
        this.props.history.push(`/suppDataGender/${this.brandId}`)
      } else if(event.target.name === 'next') {
        this.props.history.push(`/suppDataSku/${this.brandId}`)
      } else if(event.target.name === 'landing') {
        this.props.history.push(`/brandLanding/${this.brandId}`)
      }
    }
  }

  //render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    const state = this.state
    const props = this.props.categories
    const isEditing = this.state.isEditing
    return(
      <div className='form-container'>
        <SuppHeading id={this.brandId} brand={this.props.brand}/>
        <div className='forms-header'><button onClick={this.handleNav} name='landing'>Back to Summary</button></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><button onClick={this.handleNav} name='previous' className='previous'>Previous</button></div>
            <div><h3>Brand Categories</h3></div>
            <div><button onClick={this.handleNav} name='next' className='next'>Next</button></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress total={2} value={state.progressBar} progress />
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
              <div className='editing' id='category'>
                <h5>What are the categories?</h5>
                <ul>
                  {this.renderCategories()}
                </ul>
                <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='button-container'>
                  <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                  <div><button onClick={this.handleCatSave} name='1'>Save</button></div>
                  <div><HashLink to='#dominant'><button onClick={this.handleCatSave} name='1' value='next'>Save & Next</button></HashLink></div>
                </div>
              </div>) : (
              <div className='not-editing'>
                <h5>What are the categories?</h5>
                <ul>{_.map(state.dominantOptions, cat => {return (<li key={cat.id}>{cat.name}</li>)})}</ul>
                <div className='button-container'>
                  <div></div>
                  <div><button name='1' onClick={this.handleEdit} value='1'>Edit</button></div>
                </div>
                <p className='small-divider'></p>
              </div>
            )}
            {isEditing === '2' ? (
              <div className='editing' id='dominant'>
                <h5>What is the Brands dominant category?</h5>
                {state.dominantOptions.length <= 0 ? <p className='error-message'>Please select categories at the previous question first</p> : ''}
                {state.dominantOptions.length > 0 && !state.current_dominant_id ? <p className='error-message'>No dominant category selected, pick one</p> : ''}
                <ul>
                  {this.renderDominant()}
                </ul>
                <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='button-container'>
                  <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                  <div><button onClick={this.handleCatSave} name='2'>Save</button></div>
                  <div><button onClick={this.handleCatSave} name='2' value='next'>Save & Next</button></div>
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
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    pre_qa: state.preQa,
    brand: state.brandInfo,
  }
}

export default connect(mapStateToProps, { fetchBrandCategory, createBrandCategory, updateBrandCategory, fetchAllCategory })(SuppDataCategory)
