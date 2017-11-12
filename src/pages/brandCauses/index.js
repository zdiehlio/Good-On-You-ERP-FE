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
      currentAnswer: null
    }


    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    // this.handleDelete = this.handleDelete.bind(this)
  }

componentWillMount() {
  const id  = this.props.match.params.id
  this.props.fetchQuestions(id)
}

//toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.props.qa[event.target.name] || this.state[event.target.name]){
      //if state of target button 'name' already exists, will set state of same target name to the current answer value and also toggle editing
      if(this.state[event.target.name]){
        this.setState({[event.target.name]: this.state[event.target.name], isEditing: event.target.value})
        console.log('state answer');
      //if state of target 'name' does not yet exist, will pull value of answer off props and set state to that answer and also toggle editing
      } else {
        this.setState({[event.target.name]: `${this.props.qa[event.target.name].answer}`, currentAnswer: `${this.props.qa[event.target.name].answer}`, isEditing: event.target.value})
        console.log('props answer');
      }
    }
    //if an answer has not yet been created(first time visiting this specific question for this brand), will create a post request and toggle editing
    else {
      this.props.createAnswer({brand: id, question: event.target.name, answer: event.target.value})
      this.setState({isEditing: event.target.value})
      console.log('post');
    }
  }
//sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    this.setState({isEditing: null})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    const { id }  = this.props.match.params
    this.props.updateAnswer(id, event.target.name, {answer: this.state.currentAnswer})
    this.setState({isEditing: null, [event.target.name]: this.state.currentAnswer, [event.target.value]: event.target.name})
    console.log('save', this.state);
  }
  handleChange(event){
    this.setState({[event.target.name]: event.target.value, currentAnswer: event.target.value})
  }

//For development purposes for testing post requests, will delete record according to specific name of question and current brand
//If using, ensure to uncomment bind function in constructor above
//   handleDelete(event) {
//     event.preventDefault()
//     const { id }  = this.props.match.params
//     axios.delete(`http://34.212.110.48:3000/brands-causes?brand=${id}&question=${event.target.name}`)
// }

//render contains conditional statements based on state of isEditing as described in functions above.
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
                <li><Field
                  type='radio'
                  onChange={this.handleChange}
                  checked={this.state['made-in']==='1'}
                  name='made-in'
                  component='input'
                  value='1'/> Australia
                </li>
                <li><Field
                  type='radio'
                  onChange={this.handleChange}
                  checked={this.state['made-in']==='2'}
                  name='made-in'
                  component='input'
                  value='2'/> Canada
                </li>
                <li><Field
                  type='radio'
                  onChange={this.handleChange}
                  checked={this.state['made-in']==='3'}
                  name='made-in'
                  component='input'
                  value='3'/> New Zealand
                </li>
                <li><Field
                  type='radio'
                  onChange={this.handleChange}
                  checked={this.state['made-in']==='4'}
                  name='made-in'
                  component='input'
                  value='4'/> USA
                </li>
                <li><Field
                  type='radio'
                  onChange={this.handleChange}
                  checked={this.state['made-in']==='5'}
                  name='made-in'
                  component='input'
                  value='5'/>None of the Above
                </li>
              </ul>
              <button onClick={this.handleCancel}>Cancel</button>
              <button onClick={this.handleSave} name='made-in' value='1'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Which of the following countries are 100% of the brands final stage of productions suppliers located in?</h4>
            <h5>{this.state['1']}</h5>
            <button name='made-in' onClick={this.handleEdit} value='1'>Edit</button>

          </div>
            )}
        {isEditing === '6' ? (
          <div className='editing'>
          <h4>Is the Brand Certified B-Corp?</h4>
            <ul>
              <li><Field
                type='radio'
                onChange={this.handleChange}
                checked={this.state['b-corp']==='6'}
                name='b-corp'
                component='input'
                value='6'/>Yes
              </li>
              <li><Field
                type='radio'
                onChange={this.handleChange}
                checked={this.state['b-corp']==='7'}
                name='b-corp'
                component='input'
                value='7'/>No
              </li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='b-corp' onClick={this.handleSave} value='6'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Is the Brand Certified B-Corp?</h4>
            <h5>{this.state['6']}</h5>
            <button name='b-corp' onClick={this.handleEdit} value='6'>Edit</button>
          </div>
        )}

        {isEditing === '8'? (
          <div className='editing'>
          <h4>Is the brand a social enterprise that provides employment for people from a disadvantaged background?</h4>
            <ul>
              <li><Field
                type='radio'
                name='social-enterprise'
                onChange={this.handleChange}
                checked={this.state['social-enterprise'] === '8'}
                component='input'
                value="8"/>Yes
              </li>
              <li><Field
                type='radio'
                name='social-enterprise'
                onChange={this.handleChange}
                checked={this.state['social-enterprise'] === '9'}
                component='input'
                value="9"/>No
              </li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='social-enterprise' onClick={this.handleSave} value='8'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Is the brand a social enterprise that provides employment for people from a disadvantaged background?</h4>
            <h5>{this.state['8']}</h5>
            <button name='social-enterprise' onClick={this.handleEdit} value='8'>Edit</button>
          </div>
          )}

        {isEditing === '10' ? (
          <div className='editing'>
          <h4>Does the brand have a 1 for 1 model?</h4>
            <ul>
              <li><Field
                type='radio'
                name='1-for-1'
                onChange={this.handleChange}
                checked={this.state['1-for-1'] === '10'}
                component='input'
                value="10"/>Yes
              </li>
              <li><Field
                type='radio'
                name='1-for-1'
                onChange={this.handleChange}
                checked={this.state['1-for-1'] === '11'}
                component='input'
                value="11"/>No
              </li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='1-for-1' onClick={this.handleSave} value='10'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the brand have a 1 for 1 model?</h4>
            <h5>{this.state['10']}</h5>
            <button name='1-for-1' onClick={this.handleEdit} value='10'>Edit</button>
          </div>
          )}

        {isEditing === '12' ? (
          <div className='editing'>
          <h4>Is the brand Vegan?</h4>
            <ul>
              <li><Field
                type='radio'
                name='vegan'
                onChange={this.handleChange}
                checked={this.state['vegan'] === '12'}
                component='input'
                value="12"/>Yes
              </li>
              <li><Field
                type='radio'
                name='vegan'
                onChange={this.handleChange}
                checked={this.state['vegan'] === '13'}
                component='input'
                value="13"/>No
              </li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='vegan' onClick={this.handleSave} value='12'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Is the brand Vegan?</h4>
            <h5>{this.state['12']}</h5>
            <button name='vegan' onClick={this.handleEdit} value='12'>Edit</button>
          </div>
          )}

        {isEditing === '14' ? (
          <div className='editing'>
          <h4>What Percentage of the brands products are certified Fair Trade?</h4>
            <ul>
              <li><Field
                type='radio'
                name='fair-trade'
                onChange={this.handleChange}
                checked={this.state['fair-trade'] === '14'}
                component='input'
                value="14"/>100%
              </li>
              <li><Field
                type='radio'
                name='fair-trade'
                onChange={this.handleChange}
                checked={this.state['fair-trade'] === '15'}
                component='input'
                value="15"/>&#60;&#61; 50%
                </li>
              <li><Field
                type='radio'
                name='fair-trade'
                onChange={this.handleChange}
                checked={this.state['fair-trade'] === '16'}
                component='input'
                value="16"/>There is no evidence of any/many products being certified Fair Trade
              </li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='fair-trade' onClick={this.handleSave} value='14'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>What Percentage of the brands products are certified Fair Trade?</h4>
            <h5>{this.state['14']}</h5>
            <button name='fair-trade' onClick={this.handleEdit} value='14'>Edit</button>
          </div>
          )}

        {isEditing === '16' ? (
          <div className='editing'>
          <h4>What percentage of products are made from certified Organic materials?</h4>
            <ul>
              <li><Field
                type='radio'
                name='organic'
                onChange={this.handleChange}
                checked={this.state['organic'] === '17'}
                component='input'
                value="17"/>100%
              </li>
              <li><Field type='radio'
                name='organic'
                onChange={this.handleChange}
                checked={this.state['organic'] === '18'}
                component='input'
                value="18"/>&#60;&#61; 50%
              </li>
              <li><Field
                type='radio'
                name='organic'
                onChange={this.handleChange}
                checked={this.state['organic'] === '19'}
                component='input'
                value="19"/>There is no evidence of any/many products being made from certified Organic Materials
              </li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='organic' onClick={this.handleSave} value='16'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>What percentage of products are made from certified Organic materials?</h4>
            <h5>{this.state['16']}</h5>
            <button name='organic' onClick={this.handleEdit} value='16'>Edit</button>
          </div>
          )}
        {isEditing === '18' ? (
          <div className='editing'>
          <h4>What percentage of products are made from a substantial proportion(-50%) of recycled/upcycled materials?</h4>
            <ul>
              <li><Field
                type='radio'
                name='recycled'
                component='input'
                checked={this.state['recycled'] === '20'}
                onChange={this.handleChange}
                value="20"/>100%
              </li>
              <li><Field
                type='radio'
                name='recycled'
                onChange={this.handleChange}
                checked={this.state['recycled'] === '21'}
                component='input'
                value="21"/>&#60;&#61; 50%
              </li>
              <li><Field
                type='radio'
                name='recycled'
                onChange={this.handleChange}
                checked={this.state['recycled'] === '22'}
                component='input'
                value="22"/>There is no evidence of any/many products being made from a substantial proportion of recycled/upcycled materials
              </li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='recycled' onClick={this.handleSave} value='18'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>What percentage of products are made from a substantial proportion(-50%) of recycled/upcycled materials?</h4>
            <h5>{this.state['18']}</h5>
            <button name='recycled' onClick={this.handleEdit} value='18'>Edit</button>
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
