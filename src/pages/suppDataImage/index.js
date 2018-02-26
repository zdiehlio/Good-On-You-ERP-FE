import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { connect } from 'react-redux'
import { Form, Progress, Input, Portal, Segment } from 'semantic-ui-react'
import { fetchImage, updateImage, uploadLogo, fetchLogo, updateLogo, uploadImage } from '../../actions/image'
import { SuppHeading } from '../../components'
import _ from 'lodash'

import './suppDataImage.css'

class SuppDataImage extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      progressBar: 0,
      images: [],
      logos: [],
      renderChangeError: false,
      changeError: false,
    }


    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleLogo = this.handleLogo.bind(this)
    this.handleImage = this.handleImage.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.handleLogoChange = this.handleLogoChange.bind(this)
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.handleLogoUpload = this.handleLogoUpload.bind(this)
    this.handlePortal = this.handlePortal.bind(this)
    this.handleNav = this.handleNav.bind(this)
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchImage(id)
    this.props.fetchLogo(id)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.logo !== this.props.logo) {
      _.map(nextProps.logo, logo => {
        if(logo.is_selected && logo.is_selected === true) {
          this.setState({logo_selected: logo.id, logo_url: logo.url, originalLogo_selected: logo.id, originalLogo_url: logo.url})
          this.state.progressBar++
        }
        this.setState({logo: null})
        this.state.logos.push(logo)
      })
    }
    if(nextProps.image !== this.props.image) {
      _.map(nextProps.image, image => {
        if(image.is_selected && image.is_selected === true) {
          this.setState({image_selected: image.id, image_url: image.url, originalImage_selected: image.id, originalImage_url: image.url})
          this.state.progressBar++
        }
        this.setState({image: null})
        this.state.images.push(image)
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
      this.setState({renderChangeError: true, portal: true})
    }
  }
  //sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    event.preventDefault()
    if(event.target.name === 'image') {
      this.setState({renderChangeError: false, changeError: false, image_selected: this.state.originalImage_selected, image_url: this.state.originalImage_url})
    } else if(event.target.name === 'logo') {
      this.setState({renderChangeError: false, changeError: false, logo_selected: this.state.originalLogo_selected, logo_url: this.state.originalLogo_url})
    }
    this.setState({isEditing: null, currentAnswer: null})
  }

  handleImageUpload(event) {
    const { id }  = this.props.match.params
    event.preventDefault()
    if(this.state.image) {
      this.setState({images: [], currentEditing: '#image', changeError: true})
      this.props.uploadImage(this.state.image, {brand: id, is_selected: true})
    }
  }

  handleLogoUpload(event) {
    const { id }  = this.props.match.params
    event.preventDefault()
    if(this.state.logo) {
      this.setState({logos: [], currentEditing: '#logo', changeError: true})
      this.props.uploadLogo(this.state.logo, {brand: id, is_selected: true})
    }
  }

  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(event.target.name === 'logo') {
      this.props.updateLogo(this.state.logo_selected, {is_selected: true})
      this.state.progressBar++
      event.target.value === 'next' ? this.props.history.push(`/suppDataGender/${id}`) : this.setState({isEditing: null})
    } else if(event.target.name === 'image') {
      this.props.updateImage(this.state.image_selected, {is_selected: true})
      this.state.progressBar++
      event.target.value === 'next' ? this.setState({isEditing: 'logo'}) : this.setState({isEditing: null})
    }
    this.setState({renderChangeError: false, changeError: false})
  }

  handleLogo(event) {
    this.setState({currentEditing: '#logo', changeError: true, logo_selected: parseInt(event.target.name), logo_url: event.target.src})
  }

  handleImage(event) {
    this.setState({currentEditing: '#image', changeError: true, image_selected: parseInt(event.target.name), image_url: event.target.src})
  }

  renderLogo() {
    if(this.state.logos.length > 0) {
      return _.map(this.state.logos, logo => {
        return(
          <div className='image-container' key={logo.id}>
            <img className={this.state.logo_selected === logo.id ? 'logo-selected' : 'logo'} onClick={this.handleLogo} name={logo.id} src={logo.url} />
          </div>
        )
      })
    } else {
      if(Object.keys(this.props.logo).length > 0) {
        return(<p>...Loading New Images</p>)
      } else {
        return(<p>No Logos Found</p>)
      }
    }
  }

  handleImageChange(e) {
    this.setState({image: e.target.files[0]})
  }

  handleLogoChange(e) {
    this.setState({logo: e.target.files[0]})
  }

  renderImage() {
    if(this.state.images.length > 0) {
      return _.map(this.state.images, image => {
        return(
          <div className='image-container' key={image.id}>
            <img className={this.state.image_selected === image.id ? 'image-selected' : 'cover-image'}  onClick={this.handleImage} name={image.id} src={image.url} />
          </div>
        )
      })
    } else {
      if(this.props.image.length > 0) {
        return(<p>...Loading New Images</p>)
      } else {
        return(<p>No Images Found</p>)
      }
    }
  }

  handlePortal() {
    this.setState({portal: false})
  }

  handleNav(event) {
    const { id }  = this.props.match.params
    if(this.state.changeError === true) {
      this.setState({renderChangeError: true, portal: true})
    } else {
      if(event.target.name === 'previous') {
        this.props.history.push(`/suppDataSocialMedia/${id}`)
      } else if(event.target.name === 'next') {
        this.props.history.push(`/suppDataGender/${id}`)
      } else if(event.target.name === 'landing') {
        this.props.history.push(`/brandLanding/${id}`)
      }
    }
  }

  //render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props', this.props.image)
    console.log('preQA', this.props.logo)
    const isEditing = this.state.isEditing
    const { id }  = this.props.match.params
    const state = this.state
    const props = this.props.image
    return(
      <div className='form-container'>
        <SuppHeading id={id} brand={this.props.brand}/>
        <div className='forms-header'><button onClick={this.handleNav} name='landing'>Back to Summary</button></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><button onClick={this.handleNav} name='previous' className='previous'>Previous</button></div>
            <div><h3>Image</h3></div>
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
        <Form>
          {isEditing === 'image' ? (
            <div className='editing' id='image'>
              <h5>What is the Brand Cover Image? *</h5>
              {this.renderImage()}
              <Form.Field className='upload'>
                <div><Input type='file' onChange={this.handleImageChange}  label='Upload New Image'/></div>
              </Form.Field>
              <div className='button-container'>
                <div></div>
                <div><button onClick={this.handleImageUpload}>Upload</button></div>
              </div>
              <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel} name='image'>Cancel</button></div>
                <div><button onClick={this.handleSave} name='image'>Save</button></div>
                <div><HashLink to='#logo'><button onClick={this.handleSave} name='image' value='next'>Save & Next</button></HashLink></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h5>Brand Cover Image *</h5>
              <div className='image-container'>{state.image_selected ? <img src={state.image_url} className='cover-image' /> : ''}</div>
              <div className='button-container'>
                <div></div>
                <div><button name='image' onClick={this.handleEdit}>Edit</button></div>
              </div>
              <p className='small-divider'></p>
            </div>
          )}

          {isEditing === 'logo' ? (
            <div className='editing' id='logo'>
              <h5>Select the Brand Logo? *</h5>
              {this.renderLogo()}
              <Form.Field className='upload'>
                <div><Input type='file' onChange={this.handleLogoChange}  label='Upload New Logo'/></div>
              </Form.Field>
              <div className='button-container'>
                <div></div>
                <div><button onClick={this.handleLogoUpload}>Upload</button></div>
              </div>
              <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel} name='logo'>Cancel</button></div>
                <div><button onClick={this.handleSave} name='logo'>Save</button></div>
                <div><button onClick={this.handleSave} name='logo' value='next'>Save & Next</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h5>Brand Logo *</h5>
              <div className='image-container'>{this.state.logo_selected ? <img src={state.logo_url} className='logo' /> : ''}</div>
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
    image: state.image,
    logo: state.logo,
    brand: state.brandInfo,
  }
}

export default connect(mapStateToProps, { fetchImage, updateImage, fetchLogo, updateLogo, uploadImage, uploadLogo })(SuppDataImage)
