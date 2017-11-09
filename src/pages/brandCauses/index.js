import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { fetchQuestions, createAnswer, updateAnswer } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'

import './brandCauses.css'


class BrandCauses extends Component {
  constructor(props){
    super(props)

    this.state = {
      questions: [],
      isEditing: null,
      currentAnswer: null,
      productOrigin: '1'
    }


    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

componentWillMount() {
  const { id }  = this.props.match.params
  this.props.fetchQuestions(id)
}

//toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    const { id }  = this.props.match.params
    _.map(this.props.qa, quest => {
      this.setState({[`question${quest.question}`]: `${quest.answer}`})
    })
    console.log(this.state);
    this.setState({isEditing: event.target.value})
  }
//toggles if clause assigning state to null and hiding user's ability to edit answer
  handleCancel(event) {
    this.setState({isEditing: null})
  }
  handleSave(event) {
    const { id }  = this.props.match.params
    const isEditing = this.state.isEditing
    this.props.updateAnswer(id, isEditing, {answer: this.state.currentAnswer})
    this.setState({isEditing: null})
    console.log('save', this.state);
  }
  handleChange(event){
    this.setState({[event.target.name]: event.target.value, currentAnswer: event.target.value})
    console.log(this.state);
  }
  handleSubmit(event){
    event.preventDefault()
  }
  // <ul>
  // {this.renderQuestions()}
  // </ul>
  // if(!this.state.question1) {
  //   return(
  //     <div>
  //     ...Loading
  //     </div>
  //   )
// }
//conditional statement run of isEditing state and render if the state matches the elements particular value
  render() {
    console.log('props', this.props.qa);
    console.log('state', this.state);
    const isEditing = this.state.isEditing
    return(
      <div className='form-container'>
        <FormsHeader />
        <form className='brand-form'>
        {isEditing === '1' ? (
          <div className='editing'>
            <h4>Which of the following countries are 100% of the brands final stage of productions suppliers located in?</h4>
              <ul>
                <li><Field type='radio' onChange={this.handleChange} checked={this.state.question1==='1'}
                name='question1' component='input' value='1'/>Australia</li>
                <li><Field type='radio' onChange={this.handleChange} checked={this.state.question1==='2'}
                name='question1' component='input' value='2'/>Canada</li>
                <li><Field type='radio' onChange={this.handleChange} checked={this.state.question1==='3'}
                name='question1' component='input' value='3'/>New Zealand</li>
                <li><Field type='radio' onChange={this.handleChange} checked={this.state.question1==='4'}
                name='question1' component='input' value='4'/>USA</li>
                <li><Field type='radio' onChange={this.handleChange} checked={this.state.question1==='5'}
                name='question1' component='input' value='5'/>None of the Above</li>
                <button onClick={this.handleCancel}>Cancel</button>
                <button onClick={this.handleSave} value='1'>Save</button>
              </ul>
          </div>) : (
          <div className='not-editing'>
            <h4>Which of the following countries are 100% of the brands final stage of productions suppliers located in?</h4>
            <button name='productOrigin' onClick={this.handleEdit} value={this.state.productOrigin}>Edit</button>
          </div>
            )}
        {isEditing === '2' ? (
          <div>
          <h4>Is the Brand Certified B-Corp?</h4>
            <ul>
              <li><Field type='radio' name='question2' onChange={this.handleChange}
              checked={this.state.question2 === 'yes'}
              component='input' value="yes"/>Yes</li>
              <li><Field type='radio' name='question2' onChange={this.handleChange}
              checked={this.state.question2 === 'no'}
              component='input' value="no"/>No</li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave} value='2'>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>Is the Brand Certified B-Corp?</h4>
            <button onClick={this.handleEdit} value='2'>Edit</button>
          </div>
        )}

        {isEditing === '3'? (
          <div>
          <h4>Is the brand a social enterprise that provides employment for people from a disadvantaged background?</h4>
            <ul>
              <li><Field type='radio' name='question3' onChange={this.handleChange}
              checked={this.state.question3 === 'yes'}
              component='input' value="yes"/>Yes</li>
              <li><Field type='radio' name='question3' onChange={this.handleChange}
              checked={this.state.question3 === 'no'}
              component='input' value="no"/>No</li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave} value='3'>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>Is the brand a social enterprise that provides employment for people from a disadvantaged background?</h4>
            <button onClick={this.handleEdit} value='3'>Edit</button>
          </div>
          )}

        {isEditing === '4' ? (
          <div>
          <h4>Does the brand have a 1 for 1 model?</h4>
            <ul>
              <li><Field type='radio' name='question4' onChange={this.handleChange}
              checked={this.state.question4 === 'yes'}
              component='input' value="yes"/>Yes</li>
              <li><Field type='radio' name='question4' onChange={this.handleChange}
              checked={this.state.question4 === 'no'}
              component='input' value="no"/>No</li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave} value='4'>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>Does the brand have a 1 for 1 model?</h4>
            <button onClick={this.handleEdit} value='4'>Edit</button>
          </div>
          )}

        {isEditing === '5' ? (
          <div>
          <h4>Is the brand Vegan?</h4>
            <ul>
              <li><Field type='radio' name='question5' onChange={this.handleChange}
              checked={this.state.question5 === 'yes'}
              component='input' value="yes"/>Yes</li>
              <li><Field type='radio' name='question5' onChange={this.handleChange}
              checked={this.state.question5 === 'no'}
              component='input' value="no"/>No</li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave} value='5'>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>Is the brand Vegan?</h4>
            <button onClick={this.handleEdit} value='5'>Edit</button>
          </div>
          )}

        {isEditing === '6' ? (
          <div>
          <h4>What Percentage of the brands products are certified Fair Trade?</h4>
            <ul>
              <li><Field type='radio' name='question6' onChange={this.handleChange}
              checked={this.state.question6 === '100'}
              component='input' value="100"/>100%</li>
              <li><Field type='radio' name='question6' onChange={this.handleChange}
              checked={this.state.question6 === '50'}
              component='input' value="50"/>&#60;&#61; 50%</li>
              <li><Field type='radio' name='question6' onChange={this.handleChange}
              checked={this.state.question6 === '0'}
              component='input' value="0"/>There is no evidence of any/many products being certified Fair Trade</li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave} value='6'>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>What Percentage of the brands products are certified Fair Trade?</h4>
            <button onClick={this.handleEdit} value='6'>Edit</button>
          </div>
          )}

        {isEditing === '7' ? (
          <div>
          <h4>What percentage of products are made from certified Organic materials?</h4>
            <ul>
              <li><Field type='radio' name='question7' onChange={this.handleChange}
              checked={this.state.question7 === '100'}
              component='input' value="100"/>100%</li>
              <li><Field type='radio' name='question7' onChange={this.handleChange}
              checked={this.state.question7 === '50'}
              component='input' value="50"/>&#60;&#61; 50%</li>
              <li><Field type='radio' name='question7' onChange={this.handleChange}
              checked={this.state.question7 === '0'}
              component='input' value="0"/>There is no evidence of any/many products being made from certified Organic Materials</li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave} value='7'>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>What percentage of products are made from certified Organic materials?</h4>
            <button onClick={this.handleEdit} value='7'>Edit</button>
          </div>
          )}
        {isEditing === '8' ? (
          <div>
          <h4>What percentage of products are made from a substantial proportion(-50%) of recycled/upcycled materials?</h4>
            <ul>
              <li><Field type='radio' name='question8'
              component='input' value="100"/>100%</li>onChange={this.handleChange}
              checked={this.state.question8 === '100'}
              <li><Field type='radio' name='question8' onChange={this.handleChange}
              checked={this.state.question8 === '50'}
              component='input' value="50"/>&#60;&#61; 50%</li>
              <li><Field type='radio' name='question8' onChange={this.handleChange}
              checked={this.state.question8 === '0'}
              component='input' value="0"/>There is no evidence of any/many products being made from a substantial proportion of recycled/upcycled materials</li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave} value='8'>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>What percentage of products are made from a substantial proportion(-50%) of recycled/upcycled materials?</h4>
            <button onClick={this.handleEdit} value='8'>Edit</button>
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
  form: 'BrandCausesForm'
})(
  connect(mapStateToProps, { fetchQuestions, updateAnswer, createAnswer })(BrandCauses)
)
