import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Progress } from 'semantic-ui-react'
import { fetchImage, updateImage, fetchLogo, updateLogo } from '../../actions'
import { SuppHeading } from '../../components'
import _ from 'lodash'

import './suppDataImage.css'

class SuppDataImage extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      progressBar: 0,
    }


    this.handleInput = this.handleInput.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleLogo = this.handleLogo.bind(this)
    this.handleImage = this.handleImage.bind(this)
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchImage(id)
    this.props.fetchLogo(id)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.pre_qa != this.props.pre_qa) {
      _.map(nextProps.pre_qa, logo => {
        if(logo.is_selected === true) {
          this.setState({logo_selected: logo.id, logo_url: logo.url, originalLogo_selected: logo.id, originalLogo_url: logo.url})
          this.state.progressBar++
        }
      })
    }
    if(nextProps.qa != this.props.qa) {
      _.map(nextProps.qa, image => {
        if(image.is_selected === true) {
          this.setState({image_selected: image.id, image_url: image.url, originalImage_selected: image.id, originalImage_url: image.url})
          this.state.progressBar++
        }
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
    if(event.target.name === 'image') {
      this.setState({image_selected: this.state.originalImage_selected, image_url: this.state.originalImage_url})
    } else if(event.target.name === 'logo') {
      this.setState({logo_selected: this.state.originalLogo_selected, logo_url: this.state.originalLogo_url})
    }
    this.setState({isEditing: null, currentAnswer: null})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(event.target.name === 'logo') {
      this.props.updateLogo(this.state.logo_selected, {is_selected: true})
      this.state.progressBar++
    } else if(event.target.name === 'image') {
      this.props.updateImage(this.state.image_selected, {is_selected: true})
      this.state.progressBar++
    }
    this.setState({isEditing: null})
  }
  //handle text input change status, must be written seperate since value properties are inconsistent with radio buttons.
  handleInput(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleLogo(event) {
    this.setState({logo_selected: parseInt(event.target.name), logo_url: event.target.src})
  }

  handleImage(event) {
    this.setState({image_selected: parseInt(event.target.name), image_url: event.target.src})
  }

  renderLogo() {
    if(this.state.logo_selected) {
      console.log('logo', this.state.logo_selected)
      return _.map(this.props.pre_qa, logo => {
        return(
          <div className='image-container' key={logo.id}>
            <img className={this.state.logo_selected === logo.id ? 'logo-selected' : 'logo'} onClick={this.handleLogo} name={logo.id} src={logo.url} />
          </div>
        )
      })
    } else {
      console.log('denied')
      return(
        <p>No Logos Found</p>
      )
    }
  }


  renderImage() {
    if(this.state.image_selected) {
      return _.map(this.props.qa, image => {
        return(
          <div className='image-container' key={image.id}>
            <img className={this.state.image_selected === image.id ? 'image-selected' : 'cover-image'}  onClick={this.handleImage} name={image.id} src={image.url} />
          </div>
        )
      })
    } else {
      return(
        <p>No Images Found</p>
      )
    }
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
            <div><Link to={`/suppDataSocialMedia/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Image</h3></div>
            <div><Link to={`/suppDataCategory/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress total={2} value={state.progressBar} progress />
        <Form>
          {isEditing === 'image' ? (
            <div className='editing'>
              <h5>What is the Brand Cover Image?</h5>
              {this.renderImage()}
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel} name='image'>Cancel</button></div>
                <div><button onClick={this.handleSave} name='image'>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h5>Brand Cover Image</h5>
              <div className='display'>{state.image_selected ? <img src={state.image_url} className='cover-image' /> : <p>No Image Found</p>}</div>
              <div className='button-container'>
                <div></div>
                <div><button name='image' onClick={this.handleEdit}>Edit</button></div>
              </div>
            </div>
          )}

          {isEditing === 'logo' ? (
            <div className='editing'>
              <h5>Select the Brand Logo?</h5>
              {this.renderLogo()}
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel} name='logo'>Cancel</button></div>
                <div><button onClick={this.handleSave} name='logo'>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h5>Brand Logo</h5>
              <div className='display'>{this.state.logo_selected ? <img src={state.logo_url} className='logo' /> : <p>No Logo found</p>}</div>
              <div className='button-container'>
                <div></div>
                <div><button name='logo' onClick={this.handleEdit}>Edit</button></div>
              </div>
            </div>
          )}
        </Form>
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

export default connect(mapStateToProps, { fetchImage, updateImage, fetchLogo, updateLogo })(SuppDataImage)
