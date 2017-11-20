import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchSentence, createSentence, updateSentence } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'
import axios from 'axios'

class BrandSentences extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: null,
      finalAnswer: null,
      input: null
    }


    this.handleRadio = this.handleRadio.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    // this.handleDelete = this.handleDelete.bind(this)
  }
componentWillMount() {
  const { id } = this.props.match.params
  this.props.fetchSentence(id)
}

componentDidMount() {
  _.map(this.props.qa, ident => {
    if(ident.is_selected)
      console.log('ident', ident.is_selected);
      this.setState({currentAnswer: ident.id})
})
}

//toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state.currentAnswer) {
      console.log('current answer');
    } else if(this.props.qa.id) {
      //if state of target button 'name' already exists, will set state of same target name to the current answer value and also toggle editing
      _.map(this.props.qa, ident => {
        if(ident.is_selected === true)
          this.setState({currentAnswer: `${ident.id}`, input: ident.text})
          console.log('ident', ident);
    })
      //if state of target 'name' does not yet exist, will pull value of answer off props and set state to that answer and also toggle editing
    }
    // else {
    //     this.setState({[event.target.name]: `${this.props.qa[event.target.name].id}`, currentAnswer: `${this.props.qa[event.target.name].id}`, isEditing: event.target.value})
    //     console.log('props answer');
    //   }
    //if an answer has not yet been created(first time visiting this specific question for this brand), will create a post request and toggle editing
    else {
      this.props.createSentence({brand: id, text: 'option 1'})
      this.props.createSentence({brand: id, text: 'option 2'})
      console.log('post');
    }
    this.setState({isEditing: '1'})
  }
//sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    this.setState({isEditing: null})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    const { id }  = this.props.match.params
    this.props.updateSentence(id, this.state.currentAnswer, {text: this.state.finalAnswer})
    this.setState({isEditing: null})
    console.log('save', this.state);
  }
  //handle radio buttons change status, must be written seperate since value properties are inconsistent with text input.
  handleRadio(event){
    this.setState({finalAnswer: event.target.name, currentAnswer: event.target.value})
  }
  //handle text input change status, must be written seperate since value properties are inconsistent with radio buttons.
  handleInput(event) {
    this.setState({finalAnswer: event.target.value, currentAnswer: event.target.name, input: event.target.value})
  }


//For development purposes for testing post requests, will delete record according to specific name of question and current brand
//If using, ensure to uncomment bind function in constructor above
//   handleDelete(event) {
//     event.preventDefault()
//     const { id }  = this.props.match.params
//     axios.delete(`http://34.212.110.48:3000/brand=${id}&question=${event.target.name}`)
// }

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
        <div className='forms-header'>
          <div>Brand Overview</div>
          <div>>></div>
          <div>Rating</div>
          <div>>></div>
          <div>Qualitative Ratings</div>
          <div>>></div>
          <div>Supplementary Data</div>
          <span className='form-navigation'>
            <div><Link to={`/brandCauses/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Brand Sentences</h3></div>
            <div><Link to={`/brandSummary/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <form className='brand-form'>
        {isEditing === '1' ? (
          <div className='editing'>
          <h5>What is the one sentence that describes the brand best?</h5>
          <p>Select one of the proposed sentences shown below.  If required, edit it and then choose save</p>
            <ul>
              <li><Field
                type='radio'
                onChange={this.handleRadio}
                checked={this.state.currentAnswer==='6'}
                name='New Zealands premium casual lifestyle brand for women and men'
                component='input'
                value='6'/> New Zealands premium casual lifestyle brand for women and men
              </li>
              <li><Field
                type='radio'
                onChange={this.handleRadio}
                checked={this.state.currentAnswer==='7'}
                name='New Zealands premium casual lifestyle brand for women and men'
                component='input'
                value='7'/> New Zealands luxury lifestyle brand for sustainable and organic fashion for women and men
              </li>
              <li><Field
                placeholder='Create or Edit Description'
                onFocus={this.handleInput}
                onChange={this.handleInput}
                name='8'
                component='textarea' /> {this.state.input}
              </li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave} name='1' value='1'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h5>What is the one sentence that describes the brand best?</h5>
            <button name='1' onClick={this.handleEdit} value='1'>Edit</button>
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
  form: 'BrandSentenceForm'
})(
  connect(mapStateToProps, { updateSentence, fetchSentence, createSentence })(BrandSentences)
)
