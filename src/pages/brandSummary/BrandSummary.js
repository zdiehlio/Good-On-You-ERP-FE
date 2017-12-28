import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, TextArea} from 'semantic-ui-react'
import { fetchSummary, createSummary, updateSummary } from '../../actions'
import { QualiHeading } from '../../components'
import _ from 'lodash'
import axios from 'axios'

class BrandSummary extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: null,
      renderSummary: null,
      save: false,
      textlength: 0,
    }


    this.handleInput = this.handleInput.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchSummary(id)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.qa !== this.props.qa) {
      _.map(nextProps.qa, summary=> {
        this.setState({renderSummary: summary.text, currentAnswer: summary.text})
      })
    }
  }

  //toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.setState({isEditing: event.target.value})
  }
  //sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    this.setState({isEditing: null, currentAnswer: null})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state.renderSummary) {
      this.props.updateSummary(id, {text: this.state.currentAnswer})
      this.setState({isEditing: null, renderSummary: this.state.currentAnswer})
    } else {
      this.props.createSummary({brand: id, text: this.state.currentAnswer})
      this.setState({renderSummary: this.state.currentAnswer, isEditing: null})
    }
  }
  //handle text input change status, must be written seperate since value properties are inconsistent with radio buttons.
  handleInput(event) {
    this.setState({textlength: event.target.value.length, currentAnswer: event.target.value})
  }

  // renderSummary() {
  //   return _.map(this.props.qa, summary => {
  //     if(summary.id)
  //     return(
  //       <li key={summary.id}>{summary.text}</li>
  //     )
  //   })
  // }

  //render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props', this.props.qa)
    console.log('state', this.state)
    const isEditing = this.state.isEditing
    const props = this.props.qa
    const state = this.state
    const { id }  = this.props.match.params
    return(
      <div className='form-container'>
        <QualiHeading />
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/brandSentences/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Brand Summary</h3></div>
            <div><Link to={`/suppDataSocialMedia/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <Form>
          {isEditing === '1' ? (
            <div className='editing'>
              <h5>What is the Summary for the Brand?</h5>
              <TextArea
                autoHeight
                maxLength='3000'
                placeholder={this.currentAnswer}
                onFocus={this.handleInput}
                onChange={this.handleInput}
                name='summary'/>
              <p>{this.state.textlength}/3000</p>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button onClick={this.handleSave} name='1' value='1'>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h5>What is the Summary for the Brand?</h5>
              <div className='button-container'>
                <div></div>
                <div><button name='1' onClick={this.handleEdit} value='1'>Edit</button></div>
              </div>
            </div>
          )}
          <h4>{state.renderSummary ? 'Current Brand Summary' : ''}</h4>
          {state.renderSummary}
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {qa: state.qa}
}

export default connect(mapStateToProps, { updateSummary, fetchSummary, createSummary })(BrandSummary)
