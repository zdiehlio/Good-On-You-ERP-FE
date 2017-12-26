    import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchSentence, createSentence, updateSentence } from '../../actions'
import { Form, TextArea} from 'semantic-ui-react'
import { QualiHeading } from '../../components'
import _ from 'lodash'
import axios from 'axios'

import './brandSentence.css'

class BrandSentences extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentSelect: '',
      currentId: '',
      finalAnswer: '',
      save: false,
      input: ''
    }


    this.handleRadio = this.handleRadio.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }
componentWillMount() {
  const { id } = this.props.match.params
  this.props.fetchSentence(id)
}

componentWillReceiveProps(nextProps) {
  const { id } = this.props.match.params
  if(nextProps.qa !== this.props.qa) {
    if(nextProps.qa) {
    _.map(nextProps.qa, ident => {
      if(ident.is_selected === true) {
        console.log('ident', ident.is_selected);
        this.setState({originalSource: ident.source, originalSelect: ident.slug, originalId: ident.id, originalAnswer: ident.text, currentSelect: ident.slug, currentId: ident.id, finalAnswer: ident.text, finalSource: ident.source})
      }
      this.setState({[ident.slug]: ident.slug})
    })
    }
  }
}

componentWillUpdate(nextProps, nextState) {
  const { id } = this.props.match.params
  if (nextState.save == true && this.state.save == false) {
    console.log('update', nextProps);
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
    this.setState({isEditing: '1'})
  }
//sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    event.preventDefault()
    this.setState({finalSource: this.state.originalSource, finalAnswer: this.state.originalAnswer, currentId: this.state.originalId, currentSelect: this.state.originalSelect, isEditing: null})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    const { id }  = this.props.match.params
    if(this.props.qa[this.state.currentSelect]) {
      this.props.updateSentence(id, this.state.currentId, {text: this.state.finalAnswer, is_selected: true})
    } else {
      this.props.createSentence({brand: id, text: this.state.finalAnswer, is_selected: true})
    }
    this.setState({isEditing: null, save: true})
    console.log('save', this.state);
  }
  //handle radio buttons change status, must be written seperate since value properties are inconsistent with text input.
  handleRadio(event){
      _.map(this.props.qa, check => {
        if(event.target.name === check.slug) {
          this.setState({currentSelect: check.slug, finalAnswer: event.target.value, currentId: check.id, finalSource: check.source})
        }
      })
  }

  renderField() {
    return _.map(this.props.qa, check => {
      if(check.slug === 'default-1' || check.slug === 'default-2') {
      return(
        <li key={check.id}><Field
          type='radio'
          onChange={this.handleRadio}
          checked={this.state.currentSelect===check.slug}
          name={check.slug}
          component='input'
          value={check.text}/> {check.text}
          <div>Source: {check.source}</div>
        </li>
      )}
    })
  }

  renderNone(){
    return(
      <div>No default sentences found, Please create one</div>
    )
  }

//render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props', this.props.qa);
    console.log('state', this.state);
    const isEditing = this.state.isEditing
    const { id }  = this.props.match.params
    const state = this.state
    const props = this.props.qa
    return(
      <div className='form-container'>
        <QualiHeading />
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/brandCauses/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Brand Sentences</h3></div>
            <div><Link to={`/brandSummary/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <Form>
        {isEditing === '1' ? (
          <div className='editing'>
          <h5>What is the one sentence that describes the brand best?</h5>
          <p>Select one of the proposed sentences shown below.  If required, edit it and then choose save</p>
              {state['default-1'] || state['default-2'] ? this.renderField() : this.renderNone()}
              <h5>Edit the one you chose or write a new one</h5>
              <TextArea
                onFocus={this.handleRadio}
                onChange={this.handleRadio}
                value={state.finalAnswer}
                name='custom'/>
          <div className='button-container'>
            <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
            <div><button onClick={this.handleSave} name='1' value='1'>Save</button></div>
          </div>
          </div>) : (
          <div className='not-editing'>
            <h5>What is the one sentence that describes the brand best?</h5>
            <p>{this.state.finalAnswer}</p>
            <p>{this.state.finalSource}</p>
            <div className='button-container'>
              <div></div>
              <div><button name='1' onClick={this.handleEdit} value='1'>Edit</button></div>
            </div>
          </div>
          )}
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {qa: state.qa}
}

export default reduxForm({
  form: 'BrandSentenceForm'
})(
  connect(mapStateToProps, { updateSentence, fetchSentence, createSentence })(BrandSentences)
)
