import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Input, Progress } from 'semantic-ui-react'
import { updateSocial } from '../../actions/socialMedia'
import { fetchGeneral } from '../../actions/general'
import { SuppHeading } from '../../components'
import _ from 'lodash'

class SuppDataSocialMedia extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      instagram_url: '',
      facebook_url: '',
      progressBar: 0,
    }


    this.handleInput = this.handleInput.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchGeneral(id, 'social-media')

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.general != this.props.general) {
      this.setState({
        facebook_url: nextProps.general.facebook_url,
        instagram_url: nextProps.general.instagram_url,
        originalFacebook_url: nextProps.general.facebook_url,
        originalInstagram_url: nextProps.general.instagram_url,
      })
      if(nextProps.general.facebook_url) {
        this.state.progressBar++
      }
      if(nextProps.general.instagram_url) {
        this.state.progressBar++
      }
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
    this.setState({isEditing: null, currentAnswer: null, facebook_url: this.state.originalFacebook_url, instagram_url: this.state.originalInstagram_url})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state.facebook_url === '' || this.state.instagram_url === '') {
      if(this.state.facebook_url === '') {
        this.setState({facebook_urlError: true})
      }
      if(this.state.instagram_url === '') {
        this.setState({instagram_urlError: true})
      }
    } else {
      this.props.updateSocial(id, {facebook_url: this.state.facebook_url, instagram_url: this.state.instagram_url})
      this.setState({isEditing: null, facebook_urlError: false, instagram_urlError: false})
      this.state.progressBar++
    }
  }
  //handle text input change status, must be written seperate since value properties are inconsistent with radio buttons.
  handleInput(event, {name, value}) {
    this.setState({[name]: value})
    if((/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value) && value !== '') || (/^(www\.)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/.test(value) && value !== '') && value !== '') {
      this.setState({[`${name}Error`]: false})
    } else {
      this.setState({[`${name}Error`]: true})
    }
  }

  //render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props', this.props.general)
    console.log('state', this.state)
    const isEditing = this.state.isEditing
    const { id }  = this.props.match.params
    const state = this.state
    const props = this.props.general
    return(
      <div className='form-container'>
        <SuppHeading id={id} brand={this.props.brand}/>
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/brandSummary/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Social Media</h3></div>
            <div><Link to={`/suppDataImage/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress total={1} value={state.progressBar} progress />
        <Form>
          {isEditing === 'social' ? (
            <div className='editing'>
              <h5>Brand Social Media</h5>
              <p>What is the Facebook URL? *</p>
              <Form.Field className={state.facebook_urlError === true ? 'ui error input' : 'ui input'}>
                <Input
                  label='Facebook'
                  placeholder='facebook page name'
                  onChange={this.handleInput}
                  name='facebook_url'
                  value={state.facebook_url}/>
              </Form.Field>
              {state.facebook_urlError === true ? <p className='error-message'>Please enter a valid facbook url</p> : ''}
              <p>What is the Instagram URL? *</p>
              <Form.Field className={state.instagram_urlError === true ? 'ui error input' : 'ui input'}>
                <Input
                  label='Instagram'
                  placeholder='instagram account name'
                  onChange={this.handleInput}
                  name='instagram_url'
                  value={state.instagram_url}/>
              </Form.Field>
              {state.instagram_urlError === true ? <p className='error-message'>Please enter a valid instagram url</p> : ''}
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button onClick={this.handleSave} name='social'>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h5>Brand Social Media</h5>
              {state.facebook_url ? <p>Facebook URL: {state.facebook_url}</p> : ''}
              {state.instagram_url ? <p>Instagram URL: {state.instagram_url}</p> : ''}
              <div className='button-container'>
                <div></div>
                <div><button name='social' onClick={this.handleEdit}>Edit</button></div>
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
    general: state.general,
    brand: state.brandInfo,
  }
}

export default connect(mapStateToProps, { fetchGeneral, updateSocial })(SuppDataSocialMedia)
