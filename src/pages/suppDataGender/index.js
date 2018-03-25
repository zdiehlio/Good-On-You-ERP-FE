import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { connect } from 'react-redux'
import { Form, Checkbox, Progress, Portal, Segment, Loader } from 'semantic-ui-react'
import { fetchStyles, createStyles } from '../../actions/style'
import { SuppHeading } from '../../components'
import _ from 'lodash'


class SuppDataGender extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      renderChangeError: false,
      genders: [],
      originalGenders: [],
      progressBar: 0,
      'gender-men': '',
      'gender-women': '',
      'gender-children': '',
    }

    this.brandId = this.props.match.params.id

    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleNav = this.handleNav.bind(this)
    this.handlePortal = this.handlePortal.bind(this)
  }
  componentWillMount() {
    this.setState({isLoading: true})
    this.props.fetchStyles(this.brandId)
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.styles !== this.props.styles) {
      _.map(nextProps.styles, compare => {
        if(compare.style_qa.question === 'gender') {
          this.state.genders.push({brand: this.brandId, style: compare.style_qa.tag})
          this.setState({[compare.style_qa.tag]: compare.style_qa.tag})
          this.state.progressBar++
        }
      })
      this.setState({isLoading: false})
    }
  }

  //toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    this.setState({isEditing: event.target.name})
  }

  //sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    event.preventDefault()
    _.map(this.state.genders, check => {
      this.setState({[check.style]: null})
    })
    this.setState({
      isEditing: null,
      isLoading: true,
      genders: [],
      error: false,
      renderChangeError: false,
      changeError: false,
    })
    this.props.fetchStyles(this.brandId)
  }

  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    if(this.state.genders.length > 0) {
      this.props.createStyles(this.state.genders, this.brandId)
      this.setState({renderChangeError: false, changeError: false, isEditing: null})
      this.state.progressBar++
      event.target.value === 'next' ? this.props.history.push(`/suppDataCategory/${this.brandId}`) : this.setState({isEditing: null})
    } else {
      this.setState({error: true})
    }
  }

  handleChange(event, { name }){
    if(this.state[name] === name) {
      this.setState({[name]: null, genders: this.state.genders.filter(gender => {return gender.style !== name})})
    } else {
      this.setState({[name]: name, genders: [...this.state.genders, {brand: this.brandId, style: name}], error: false})
    }
    this.setState({currentEditing: '#gender', changeError: true})
  }

  handlePortal() {
    this.setState({portal: false})
  }

  handleNav(event) {
    if(this.state.changeError === true) {
      this.setState({renderChangeError: true, portal: true})
    } else {
      if(event.target.name === 'previous') {
        this.props.history.push(`/suppDataImage/${this.brandId}`)
      } else if(event.target.name === 'next') {
        this.props.history.push(`/suppDataCategory/${this.brandId}`)
      } else if(event.target.name === 'landing') {
        this.props.history.push(`/brandLanding/${this.brandId}`)
      }
    }
  }

  render() {
    const state = this.state
    const props = this.props.styles
    const isEditing = this.state.isEditing
    return(
      <div className='form-container'>
        <SuppHeading id={this.brandId} brand={this.props.brand}/>
        <div className='forms-header'><button onClick={this.handleNav} name='landing'>Back to Summary</button></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><button onClick={this.handleNav} name='previous' className='previous'>Previous</button></div>
            <div><h3>Genders/Ages</h3></div>
            <div><button onClick={this.handleNav} name='next' className='next'>Next</button></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress total={1} value={state.progressBar} progress />
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
            {isEditing === 'gender' ? (
              <div className='editing' id='gender'>
                <h4>What are the Genders/Ages offered by the brand? *</h4>
                <Form.Field inline className={state.error === true ? 'ui error checkbox' : 'ui checkbox'}>
                  <Checkbox
                    label='Children'
                    onChange={this.handleChange}
                    checked={state['gender-children'] ? true : false}
                    name='gender-children'
                  />
                </Form.Field>
                <Form.Field inline>
                  <Checkbox
                    label='Women'
                    onChange={this.handleChange}
                    checked={state['gender-women'] ? true : false}
                    name='gender-women'
                  />
                </Form.Field>
                <Form.Field inline>
                  <Checkbox
                    label='Men'
                    onChange={this.handleChange}
                    checked={state['gender-men'] ? true : false}
                    name='gender-men'
                  />
                </Form.Field>
                <p className='error-message'>{state.error === true ? 'Please select at least one option' : ''}</p>
                <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='button-container'>
                  <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                  <div><button onClick={this.handleSave} name='gender'>Save</button></div>
                  <div><button onClick={this.handleSave} name='gender' value='next'>Save & Next</button></div>
                </div>
              </div>) : (
              <div className='not-editing'>
                <h4>What are the Genders/Ages offered by the brand? *</h4>
                {_.map(this.state.genders, check => {
                  let gender = check.style.slice(7)
                  return(<div key={check.style}>{gender}</div>)
                }
                )}
                <div className='button-container'>
                  <div><button name='gender' onClick={this.handleEdit}>Edit</button></div>
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
    styles: state.styles,
    brand: state.brandInfo,
  }
}

export default connect(mapStateToProps, { fetchStyles, createStyles })(SuppDataGender)
