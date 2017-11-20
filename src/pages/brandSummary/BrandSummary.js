import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchSummary, createSummary, updateSummary } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'
import axios from 'axios'

class BrandSummary extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: null,
      renderSummary: null,
    }


    this.handleInput = this.handleInput.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    // this.handleDelete = this.handleDelete.bind(this)
  }
componentWillMount() {
  const { id } = this.props.match.params
  this.props.fetchSummary(id)
  _.map(this.props.qa, summary=> {
    this.setState({renderSummary: summary.text})
  })

}

componentDidMount() {
  _.map(this.props.qa, summary=> {
    this.setState({renderSummary: summary.text})
  })
}

componentWillReceiveProps() {
  _.map(this.props.qa, summary=> {
    this.setState({renderSummary: summary.text})
  })
}

//toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.props.qa) {
      //if a summary already exists, will set state of same target name to the current answer value and also toggle editing
      _.map(this.props.qa, summary=> {
        this.setState({currentAnswer: summary.text, isEditing: event.target.value})
      })
    } else {
      this.props.createSummary({brand: id, text: 'option 1'})
      this.setState({isEditing: event.target.value})
      console.log('post');
    }
  }
//sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    this.setState({isEditing: null, currentAnswer: null})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    const { id }  = this.props.match.params
    this.props.updateSummary(id, {text: this.state.currentAnswer})
    this.setState({isEditing: null, renderSummary: this.state.currentAnswer})
    console.log('save', this.state);
  }
  //handle text input change status, must be written seperate since value properties are inconsistent with radio buttons.
  handleInput(event) {
    this.setState({currentAnswer: event.target.value})
  }

  renderSummary() {
    return _.map(this.props.qa, summary => {
      return(
        <li key={summary.id}>
          {summary.text}
        </li>
      )
    })
  }

//render contains conditional statements based on state of isEditing as described in functions above.
render() {
  console.log('props', this.props.qa);
  console.log('state', this.state);
  const isEditing = this.state.isEditing
  const { id }  = this.props.match.params
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
          <div><Link to={`/brandSentences/${id}`}><button className='previous'>Previous</button></Link></div>
          <div><h3>Brand Summary</h3></div>
          <div><Link to={`/suppDataCategory/${id}`}><button className='next'>Next</button></Link></div>
        </span>
      </div>
      <form className='brand-form'>
      {isEditing === '1' ? (
        <div className='editing'>
        <h5>What is the Summary for the Brand?</h5>
          <Field
            placeholder={this.currentAnswer}
            onFocus={this.handleInput}
            onChange={this.handleInput}
            name='summary'
            component='textarea'/>
          <button onClick={this.handleCancel}>Cancel</button>
          <button onClick={this.handleSave} name='1' value='1'>Save</button>
        </div>) : (
        <div className='not-editing'>
          <h5>What is the Summary for the Brand?</h5>
          <button name='1' onClick={this.handleEdit} value='1'>Edit</button>
        </div>
        )}
        <h4>Current Brand Summary</h4>
        <ul>
        {this.state.currentAnswer ? (
          this.state.currentAnswer) : (
          this.renderSummary()
        )}
        </ul>
      </form>
    </div>
  )
}
}

function mapStateToProps(state) {
  return {qa: state.qa}
}

export default reduxForm({
  form: 'BrandSummaryForm'
})(
  connect(mapStateToProps, { updateSummary, fetchSummary, createSummary })(BrandSummary)
)
