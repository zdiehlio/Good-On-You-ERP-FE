import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { fetchQuestions, createAnswer, updateAnswer } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'
import axios from 'axios'

import './brandCauses.css'


class BrandCauses extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: null,
      questions: ['made-in', 'b-corp', 'social-enterprise', '1-for-1', 'organic', 'recycled', 'vegan', 'fair-trade']
    }


    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

componentWillMount() {
  const id  = this.props.match.params.id
  this.props.fetchQuestions(id)
}

// componentWillReceiveProps() {
//   const id  = this.props.match.params.id
//   _.map(this.state.questions, quest => {
//     if(!this.props.qa[quest]) {
//       this.props.createAnswer({brand: id, question: quest, answer: '6'})
//     }
//   })
// }

//toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    const { id }  = this.props.match.params
    // if(!this.props.qa[event.target.name]){
    //   this.props.createAnswer({brand: id, question: event.target.name})
    //   console.log('post');
    // } else
    if(!this.state[event.target.name]) {
        this.setState({[event.target.name]: `${this.props.qa[event.target.name].answer}`, isEditing: event.target.value})
        console.log('set state');
    } else if {
      this.setState({[event.target.name]: this.state[event.target.name], isEditing: event.target.value})
    } else {

    }

        console.log('check', this.props.qa.question)
  }
//toggles if clause assigning state to null and hiding user's ability to edit answer
  handleCancel(event) {
    this.setState({isEditing: null})
  }
  handleSave(event) {
    const { id }  = this.props.match.params
    if(this.props.qa[event.target.name]) {
      this.props.updateAnswer(id, event.target.name, {answer: this.state.currentAnswer})
    } else {
      this.props.createAnswer({brand: id, question: event.target.name, answer: event.target.value})
    }
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
  handleCreate(event) {
      this.props.createAnswer({answer: 8})
  }

  handleDelete(event) {
    const { id }  = this.props.match.params
    const request = axios.delete(`http://34.212.110.48:3000/brands-causes?brand=${id}&question=b-corp`)

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
        <button onClick={this.handleDelete}>delete</button>
        {isEditing === '1' ? (
          <div className='editing'>
            <h4>Which of the following countries are 100% of the brands final stage of productions suppliers located in?</h4>
              <ul>
                <li><Field type='radio' onChange={this.handleChange} checked={this.state['made-in']==='1'}
                name='made-in' component='input' value='1'/>Australia</li>
                <li><Field type='radio' onChange={this.handleChange} checked={this.state['made-in']==='2'}
                name='made-in' component='input' value='2'/>Canada</li>
                <li><Field type='radio' onChange={this.handleChange} checked={this.state['made-in']==='3'}
                name='made-in' component='input' value='3'/>New Zealand</li>
                <li><Field type='radio' onChange={this.handleChange} checked={this.state['made-in']==='4'}
                name='made-in' component='input' value='4'/>USA</li>
                <li><Field type='radio' onChange={this.handleChange} checked={this.state['made-in']==='5'}
                name='made-in' component='input' value='5'/>None of the Above</li>
                <button onClick={this.handleCancel}>Cancel</button>
                <button onClick={this.handleSave} name='made-in' value='1'>Save</button>
              </ul>
          </div>) : (
          <div className='not-editing'>
            <h4>Which of the following countries are 100% of the brands final stage of productions suppliers located in?</h4>
            <button name='made-in' onClick={this.handleEdit} value='1'>Edit</button>
          </div>
            )}
        {isEditing === '6' ? (
          <div className='editing'>
          <h4>Is the Brand Certified B-Corp?</h4>
            <ul>
              <li><Field type='radio' onChange={this.handleChange} checked={this.state['b-corp']==='6'}
              name='b-corp'  component='input' value='6'/>Yes</li>
              <li><Field type='radio' onChange={this.handleChange} checked={this.state['b-corp']==='7'}
              name='b-corp' component='input' value='7'/>No</li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='b-corp' onClick={this.handleSave} value='6'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Is the Brand Certified B-Corp?</h4>
            <button name='b-corp' onClick={this.handleEdit} value='6'>Edit</button>
          </div>
        )}

        {isEditing === '8'? (
          <div className='editing'>
          <h4>Is the brand a social enterprise that provides employment for people from a disadvantaged background?</h4>
            <ul>
              <li><Field type='radio' name='social-enterprise' onChange={this.handleChange}
              checked={this.state['social-enterprise'] === '8'}
              component='input' value="8"/>Yes</li>
              <li><Field type='radio' name='social-enterprise' onChange={this.handleChange}
              checked={this.state['social-enterprise'] === '9'}
              component='input' value="9"/>No</li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave} value='8'>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>Is the brand a social enterprise that provides employment for people from a disadvantaged background?</h4>
            <button name='social-enterprise' onClick={this.handleEdit} value='8'>Edit</button>
          </div>
          )}

        {isEditing === '10' ? (
          <div className='editing'>
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
            <button onClick={this.handleSave} value='10'>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>Does the brand have a 1 for 1 model?</h4>
            <button onClick={this.handleEdit} value='10'>Edit</button>
          </div>
          )}

        {isEditing === '12' ? (
          <div className='editing'>
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
            <button onClick={this.handleSave} value='12'>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>Is the brand Vegan?</h4>
            <button onClick={this.handleEdit} value='12'>Edit</button>
          </div>
          )}

        {isEditing === '14' ? (
          <div className='editing'>
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
            <button onClick={this.handleSave} value='14'>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>What Percentage of the brands products are certified Fair Trade?</h4>
            <button onClick={this.handleEdit} value='14'>Edit</button>
          </div>
          )}

        {isEditing === '16' ? (
          <div className='editing'>
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
            <button onClick={this.handleSave} value='16'>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>What percentage of products are made from certified Organic materials?</h4>
            <button onClick={this.handleEdit} value='16'>Edit</button>
          </div>
          )}
        {isEditing === '18' ? (
          <div className='editing'>
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
            <button onClick={this.handleSave} value='18'>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>What percentage of products are made from a substantial proportion(-50%) of recycled/upcycled materials?</h4>
            <button onClick={this.handleEdit} value='18'>Edit</button>
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
