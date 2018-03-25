import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { connect } from 'react-redux'
import { fetchCause, fetchAllCause, createCause, updateCause } from '../../actions/cause'
import { QualiHeading } from '../../components'
import { Form, Radio, Progress, Portal, Segment, Loader } from 'semantic-ui-react'
import _ from 'lodash'
import axios from 'axios'

import './brandCauses.css'

class BrandCauses extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: null,
      changeError: false,
      progressBar: 0,
      renderChangeError: false,
    }

    this.brandId = this.props.match.params.id

    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handlePortal = this.handlePortal.bind(this)
    this.handleNav = this.handleNav.bind(this)
  }

  //calls API to receive currently saved causes details for brand and pre-defined questions and answers to display in form
  componentWillMount() {
    this.setState({isLoading: true})
    this.props.fetchCause(this.brandId)
    this.props.fetchAllCause(this.brandId)
  }

  //when component receives props with data from API, will set data to be managed in state
  componentWillReceiveProps(nextProps) {
    if(nextProps.causes !== this.props.causes) {
      _.map(nextProps.causes, quest => {
        this.setState({
          [quest.question]: quest.answer,
          [`${quest.question}Answer`]: quest.cause.text,
        })
        return this.state.progressBar++
      })
      this.setState({isLoading: false})
    }
  }

  //toggles editing mode for specified question
  handleEdit(event) {
    event.preventDefault()
    if(this.state.changeError === false) {
      this.setState({isEditing: event.target.value, currentEditing: `#${event.target.name}`})
      if(this.state[event.target.name]){
        this.setState({currentAnswer: this.state[event.target.name]})
      } else {
        this.setState({currentAnswer: null})
      }
    } else {
      this.setState({renderChangeError: true, portal: true})
    }
  }

  //clears all errors in state and recalls API to ensure all data displayed to user is up to date
  handleCancel(event) {
    this.setState({
      isEditing: null,
      currentAnswer: null,
      changeError: false,
      renderChangeError: false,
      [event.target.name]: null,
      isLoading: true,
    })
    this.props.fetchCause(this.brandId)
  }

  //if contact already exists in props, save will send PATCH request to API to update contact details.  If no previous contact details have been saved, will send POST request to API to create contact details.
  handleSave(event) {
    event.preventDefault()
    if(!this.state.currentAnswer) {
      this.setState({error: true})
    } else {
      this.props.updateCause(this.brandId, event.target.name, {answer: this.state.currentAnswer})
      this.setState({[`${event.target.name}Answer`]: this.state.tempAnswer, changeError: false, renderChangeError: false})
      if(!this.state[`${event.target.name}OriginalAnswer`]) {
        this.props.createCause({brand: this.brandId, question: event.target.name, answer: this.state.currentAnswer})
        this.state.progressBar++
      }
      //will check if the value of the button begins with next, if so will set the state of the next question in line to editing mode
      if(event.target.value.slice(0, 4) === 'next') {
        if(event.target.value === 'nextB-corp') {
          this.setState({isEditing: '6'})
        } else if(event.target.value === 'nextSocial') {
          this.setState({isEditing: '8'})
        } else if(event.target.value === 'nextModel') {
          this.setState({isEditing: '10'})
        } else if(event.target.value === 'nextVegan') {
          this.setState({isEditing: '12'})
        } else if(event.target.value === 'nextTrade') {
          this.setState({isEditing: '14'})
        } else if(event.target.value === 'nextOrganic') {
          this.setState({isEditing: '16'})
        } else if(event.target.value === 'nextRecycle') {
          this.setState({isEditing: '18'})
        } else if(event.target.value === 'nextPage') {
          this.props.history.push(`/brandSentences/${this.brandId}`)
        }
      } else {
        this.setState({isEditing: null})
      }
    }
  }

  //handles changes for radio buttons
  handleChange(event, { value, name }){
    //finds text for designated answer to be displayed in non-editing mode
    _.map(this.props.pre_qa, check => {
      if(check.id === parseInt(value)) {
        this.setState({tempAnswer: check.text})
      }
    })
    //sets value of answer to state using ID and assigns appropriate error's and hashlinks for navigation between questions
    this.setState({
      [name]: parseInt(value),
      currentAnswer: parseInt(value),
      error: false,
      changeError: true,
      errorMessage: name,
      currentEditing: `#${name}`,
    })
  }

  //maps through pre-defined questions from API based on params from function call in render and displays the appropriate answers
  renderQuestion(quest) {
    return _.map(this.props.pre_qa, ans => {
      if(ans.question === quest)
        return(
          <Form.Field inline key={ans.id} className={this.state.error === true ? 'ui error radio' : 'ui radio'}>
            <Radio
              label={ans.text}
              onChange={this.handleChange}
              checked={this.state[quest] === ans.id ? true : false}
              value={ans.id}
              name={ans.question}
            />
          </Form.Field>
        )
    })
  }

  //close portal upon clicking Go button
  handlePortal() {
    this.setState({portal: false})
  }

  //handles navigation between pages to prevent users from leaving current page while they are currently editing a question.
  handleNav(event) {
    if(this.state.changeError === true) {
      this.setState({renderChangeError: true, portal: true})
    } else {
      if(event.target.name === 'previous') {
        this.props.history.push(`/animal-negative-citizenship/${this.brandId}`)
      } else if(event.target.name === 'next') {
        this.props.history.push(`/brandSentences/${this.brandId}`)
      } else if(event.target.name === 'landing') {
        this.props.history.push(`/brandLanding/${this.brandId}`)
      }
    }
  }

  render() {
    const isEditing = this.state.isEditing
    const state = this.state
    const props = this.props.causes
    return(
      <div className='form-container'>
        <QualiHeading id={this.brandId} brand={this.props.brand}/>
        <div className='forms-header'><button onClick={this.handleNav} name='landing'>Back to Summary</button></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><button onClick={this.handleNav} name='previous' className='previous'>Previous</button></div>
            <div><h3>Brand Causes</h3></div>
            <div><button onClick={this.handleNav} name='next' className='next'>Next</button></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress total={8} value={state.progressBar} progress />
        {state.renderChangeError === true ? (
          <Portal open={state.portal} className='portal'>
            <Segment style={{ left: '35%', position: 'fixed', top: '50%', zIndex: 1000}}>
              <p>Please Save or Cancel your selected answers before proceeding</p>
              <HashLink to={state.currentEditing}><button onClick={this.handlePortal}>Go</button></HashLink>
            </Segment>
          </Portal>
        ) : ''}
        {state.isLoading === true ? <Loader active inline='centered' /> :
          <Form>
            {isEditing === '1' ? (
              <div className='editing' id='made-in'>
                <h4>Which of the following countries or union are 100% of the brands final stage of productions suppliers located in? *</h4>
                {this.renderQuestion('made-in')}
                <p className='error-message'>{state.error === true ? 'Please select an answer' : ''}</p>
                <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='button-container'>
                  <div><button type='button' className='cancel' name='made-in' onClick={this.handleCancel} >Cancel</button></div>
                  <div><button type='button' name='made-in' onClick={this.handleSave}  value='1'>Save</button></div>
                  <div><HashLink to='#b-corp'><button type={state.currentEditing === '#made-in' ? 'submit' : 'button'} name='made-in' onClick={this.handleSave}  value='nextB-corp'>Save & Next</button></HashLink></div>
                </div>
              </div>) : (
              <div className='not-editing'>
                <h4>Which of the following countries or union are 100% of the brands final stage of productions suppliers located in? *</h4>
                <p>{state['made-inAnswer']}</p>
                <div className='button-container'>
                  <div></div>
                  <div><button name='made-in' onClick={this.handleEdit} value='1'>Edit</button></div>
                </div>
                <p className='small-divider'></p>
              </div>
            )}
            {isEditing === '6' ? (
              <div className='editing' id='b-corp'>
                <h4>Is the Brand Certified B-Corp? *</h4>
                {this.renderQuestion('b-corp')}
                <p className='error-message'>{state.error === true ? 'Please select an answer' : ''}</p>
                <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='button-container'>
                  <div><button type='button' className='cancel' name='b-corp' onClick={this.handleCancel}>Cancel</button></div>
                  <div><button type='button' name='b-corp' onClick={this.handleSave} value='6'>Save</button></div>
                  <div><HashLink to='#social'><button type={state.currentEditing === '#b-corp' ? 'submit' : 'button'} name='b-corp' onClick={this.handleSave}  value='nextSocial'>Save & Next</button></HashLink></div>
                </div>
              </div>) : (
              <div className='not-editing'>
                <h4>Is the Brand Certified B-Corp? *</h4>
                <div>{state['b-corpAnswer']}</div>
                <div className='button-container'>
                  <div></div>
                  <div><button name='b-corp' onClick={this.handleEdit} value='6'>Edit</button></div>
                </div>
                <p className='small-divider'></p>
              </div>
            )}

            {isEditing === '8'? (
              <div className='editing' id='social'>
                <h4>Is the brand a social enterprise that provides employment for people from a disadvantaged background? *</h4>
                {this.renderQuestion('social-enterprise')}
                <p className='error-message'>{state.error === true ? 'Please select an answer' : ''}</p>
                <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='button-container'>
                  <div><button type='button' className='cancel' name='social-enterprise' onClick={this.handleCancel}>Cancel</button></div>
                  <div><button type='button' name='social-enterprise' onClick={this.handleSave} value='8'>Save</button></div>
                  <div><HashLink to='#model'><button type='submit' name='social-enterprise' onClick={this.handleSave}  value='nextModel'>Save & Next</button></HashLink></div>
                </div>
              </div>) : (
              <div className='not-editing'>
                <h4>Is the brand a social enterprise that provides employment for people from a disadvantaged background? *</h4>
                <div>{state['social-enterpriseAnswer']}</div>
                <div className='button-container'>
                  <div></div>
                  <div><button name='social-enterprise' onClick={this.handleEdit} value='8'>Edit</button></div>
                </div>
                <p className='small-divider'></p>
              </div>
            )}

            {isEditing === '10' ? (
              <div className='editing' id='model'>
                <h4>Does the brand have a 1 for 1 model? *</h4>
                {this.renderQuestion('1-for-1')}
                <p className='error-message'>{state.error === true ? 'Please select an answer' : ''}</p>
                <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='button-container'>
                  <div><button type='button' className='cancel' name='1-for-1' onClick={this.handleCancel}>Cancel</button></div>
                  <div><button type='button' name='1-for-1' onClick={this.handleSave} value='10'>Save</button></div>
                  <div><HashLink to='#vegan'><button type='submit' name='1-for-1' onClick={this.handleSave}  value='nextVegan'>Save & Next</button></HashLink></div>
                </div>
              </div>) : (
              <div className='not-editing'>
                <h4>Does the brand have a 1 for 1 model? *</h4>
                <div>{state['1-for-1Answer']}</div>
                <div className='button-container'>
                  <div></div>
                  <div><button name='1-for-1' onClick={this.handleEdit} value='10'>Edit</button></div>
                </div>
                <p className='small-divider'></p>
              </div>
            )}

            {isEditing === '12' ? (
              <div className='editing' id='vegan'>
                <h4>Is the brand Vegan? *</h4>
                {this.renderQuestion('vegan')}
                <p className='error-message'>{state.error === true ? 'Please select an answer' : ''}</p>
                <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='button-container'>
                  <div><button type='button' className='cancel' name='vegan' onClick={this.handleCancel}>Cancel</button></div>
                  <div><button type='button' name='vegan' onClick={this.handleSave} value='12'>Save</button></div>
                  <div><HashLink to='#trade'><button type='submit' name='vegan' onClick={this.handleSave}  value='nextTrade'>Save & Next</button></HashLink></div>
                </div>
              </div>) : (
              <div className='not-editing'>
                <h4>Is the brand Vegan? *</h4>
                <div>{state.veganAnswer}</div>
                <div className='button-container'>
                  <div></div>
                  <div><button name='vegan' onClick={this.handleEdit} value='12'>Edit</button></div>
                </div>
                <p className='small-divider'></p>
              </div>
            )}

            {isEditing === '14' ? (
              <div className='editing' id='trade'>
                <h4>What Percentage of the brands products are certified Fair Trade? *</h4>
                {this.renderQuestion('fair-trade')}
                <p className='error-message'>{state.error === true ? 'Please select an answer' : ''}</p>
                <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='button-container'>
                  <div><button type='button' className='cancel' name='fair-trade' onClick={this.handleCancel}>Cancel</button></div>
                  <div><button type='button' name='fair-trade' onClick={this.handleSave} value='14'>Save</button></div>
                  <div><HashLink to='#organic'><button type='submit' name='fair-trade' onClick={this.handleSave}  value='nextOrganic'>Save & Next</button></HashLink></div>
                </div>
              </div>) : (
              <div className='not-editing'>
                <h4>What Percentage of the brands products are certified Fair Trade? *</h4>
                <div>{state['fair-tradeAnswer']}</div>
                <div className='button-container'>
                  <div></div>
                  <div><button name='fair-trade' onClick={this.handleEdit} value='14'>Edit</button></div>
                </div>
                <p className='small-divider'></p>
              </div>
            )}

            {isEditing === '16' ? (
              <div className='editing' id='organic'>
                <h4>What percentage of products are made from certified Organic materials? *</h4>
                {this.renderQuestion('organic')}
                <p className='error-message'>{state.error === true ? 'Please select an answer' : ''}</p>
                <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='button-container'>
                  <div><button type='button' className='cancel' name='organic' onClick={this.handleCancel}>Cancel</button></div>
                  <div><button type='button' name='organic' onClick={this.handleSave} value='16'>Save</button></div>
                  <div><HashLink to='#recycle'><button type='submit' name='organic' onClick={this.handleSave}  value='nextRecycle'>Save & Next</button></HashLink></div>
                </div>
              </div>) : (
              <div className='not-editing'>
                <h4>What percentage of products are made from certified Organic materials? *</h4>
                <div>{state.organicAnswer}</div>
                <div className='button-container'>
                  <div></div>
                  <div><button name='organic' onClick={this.handleEdit} value='16'>Edit</button></div>
                </div>
                <p className='small-divider'></p>
              </div>
            )}
            {isEditing === '18' ? (
              <div className='editing' id='recycle'>
                <h4>What percentage of products are made from a substantial proportion(-50%) of recycled/upcycled materials? *</h4>
                {this.renderQuestion('recycled')}
                <p className='error-message'>{state.error === true ? 'Please select an answer' : ''}</p>
                <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='button-container'>
                  <div><button type='button' className='cancel' name='recycled' onClick={this.handleCancel}>Cancel</button></div>
                  <div><button type='button' name='recycled' onClick={this.handleSave} value='18'>Save</button></div>
                  <div><button type='submit' name='recycled' onClick={this.handleSave}  value='nextPage'>Save & Next</button></div>
                </div>
              </div>) : (
              <div className='not-editing'>
                <h4>What percentage of products are made from a substantial proportion(-50%) of recycled/upcycled materials? *</h4>
                <div>{state.recycledAnswer}</div>
                <div className='button-container'>
                  <div></div>
                  <div><button name='recycled' onClick={this.handleEdit} value='18'>Edit</button></div>
                </div>
              </div>
            )}
          </Form>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    causes: state.causes,
    pre_qa: state.preQa,
    brand: state.brandInfo,
  }
}

export default connect(mapStateToProps, { fetchCause, fetchAllCause, updateCause, createCause })(BrandCauses)
