import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCause, fetchAllCause, createCause, updateCause } from '../../actions'
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
      save: false
    }


    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }
componentWillMount() {
  const { id }  = this.props.match.params
  this.props.fetchCause(id)
  this.props.fetchAllCause(id)
}

componentWillReceiveProps(nextProps) {
  if(nextProps.qa !== this.props.qa) {
    _.map(nextProps.qa, quest => {
      this.setState({
        [quest.question]: `${quest.answer}`,
        [`${quest.question}Answer`]: quest.cause.text,
      })
  })
}
}


//toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state[event.target.name]){
      //if state of target button 'name' already exists, will set state of same target name to the current answer value and also toggle editing
      this.setState({isEditing: event.target.value, currentAnswer: this.state[event.target.value]})
      console.log('state answer');
    }
    //if an answer has not yet been created(first time visiting this specific question for this brand), will create a post request and toggle editing
    else {
      this.props.createCause({brand: id, question: event.target.name, answer: event.target.value})
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
    event.preventDefault()
    const { id }  = this.props.match.params
    this.props.updateCause(id, event.target.name, {answer: this.state.currentAnswer})
    this.setState({isEditing: null})
    console.log('save', this.state);
  }
  handleChange(event){
    this.setState({[`${event.target.name}Answer`]: _.map(this.props.pre_qa, check => {
      if(event.target.value === check.id) {
        return check.text
      }
    }),
      [event.target.value]: event.target.value,
      currentAnswer: event.target.value})
  }

  renderQuestion(quest) {
    return _.map(this.props.pre_qa, ans => {
      if(ans.question === quest)
      return(
        <li key={ans.id}><input
          type='radio'
          onChange={this.handleChange}
          checked={this.state.currentAnswer === ans.id}
          value={ans.id}
          name={ans.question}
          /> {ans.text}
        </li>
      )
    })
  }

//render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props', this.props.qa);
    console.log('pre_qa', this.props.pre_qa);
    console.log('state', this.state);
    const { id }  = this.props.match.params
    const isEditing = this.state.isEditing
    const state = this.state
    const props = this.props.qa
    return(
      <div className='form-container'>
        <FormsHeader />
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/brandContact/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Brand Causes</h3></div>
            <div><Link to={`/brandSentences/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <form className='brand-form'>
        {isEditing === '1' ? (
          <div className='editing'>
            <h4>Which of the following countries are 100% of the brands final stage of productions suppliers located in?</h4>
              <ul>
                {this.renderQuestion('made-in')}
              </ul>
              <button onClick={this.handleCancel}>Cancel</button>
              <button onClick={this.handleSave} name='made-in' value='1'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Which of the following countries are 100% of the brands final stage of productions suppliers located in?</h4>
            <h5>Current Answer: </h5>
            <div>{state['made-inAnswer']}</div>
            <button name='made-in' onClick={this.handleEdit} value='1'>Edit</button>

          </div>
            )}
        {isEditing === '6' ? (
          <div className='editing'>
          <h4>Is the Brand Certified B-Corp?</h4>
            <ul>
              {this.renderQuestion('b-corp')}
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='b-corp' onClick={this.handleSave} value='6'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Is the Brand Certified B-Corp?</h4>
            <h5>Current Answer: </h5>
            <div>{state['b-corpAnswer']}</div>
            <button name='b-corp' onClick={this.handleEdit} value='6'>Edit</button>
          </div>
        )}

        {isEditing === '8'? (
          <div className='editing'>
          <h4>Is the brand a social enterprise that provides employment for people from a disadvantaged background?</h4>
            <ul>
              {this.renderQuestion('social-enterprise')}
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='social-enterprise' onClick={this.handleSave} value='8'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Is the brand a social enterprise that provides employment for people from a disadvantaged background?</h4>
            <h5>Current Answer: </h5>
            <div>{state['social-enterpriseAnswer']}</div>
            <button name='social-enterprise' onClick={this.handleEdit} value='8'>Edit</button>
          </div>
          )}

        {isEditing === '10' ? (
          <div className='editing'>
          <h4>Does the brand have a 1 for 1 model?</h4>
            <ul>
              {this.renderQuestion('1-for-1')}
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='1-for-1' onClick={this.handleSave} value='10'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the brand have a 1 for 1 model?</h4>
            <h5>Current Answer: </h5>
            <div>{state['1-for-1Answer']}</div>
            <button name='1-for-1' onClick={this.handleEdit} value='10'>Edit</button>
          </div>
          )}

        {isEditing === '12' ? (
          <div className='editing'>
          <h4>Is the brand Vegan?</h4>
            <ul>
              {this.renderQuestion('vegan')}
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='vegan' onClick={this.handleSave} value='12'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Is the brand Vegan?</h4>
            <h5>Current Answer: </h5>
            <div>{state.veganAnswer}</div>
            <button name='vegan' onClick={this.handleEdit} value='12'>Edit</button>
          </div>
          )}

        {isEditing === '14' ? (
          <div className='editing'>
          <h4>What Percentage of the brands products are certified Fair Trade?</h4>
            <ul>
              {this.renderQuestion('fair-trade')}
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='fair-trade' onClick={this.handleSave} value='14'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>What Percentage of the brands products are certified Fair Trade?</h4>
            <h5>Current Answer: </h5>
            <div>{state['fair-tradeAnswer']}</div>
            <button name='fair-trade' onClick={this.handleEdit} value='14'>Edit</button>
          </div>
          )}

        {isEditing === '16' ? (
          <div className='editing'>
          <h4>What percentage of products are made from certified Organic materials?</h4>
            <ul>
              {this.renderQuestion('organic')}
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='organic' onClick={this.handleSave} value='16'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>What percentage of products are made from certified Organic materials?</h4>
            <h5>Current Answer: </h5>
            <div>{state.organicAnswer}</div>
            <button name='organic' onClick={this.handleEdit} value='16'>Edit</button>
          </div>
          )}
        {isEditing === '18' ? (
          <div className='editing'>
          <h4>What percentage of products are made from a substantial proportion(-50%) of recycled/upcycled materials?</h4>
            <ul>
              {this.renderQuestion('recycled')}
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='recycled' onClick={this.handleSave} value='18'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>What percentage of products are made from a substantial proportion(-50%) of recycled/upcycled materials?</h4>
            <h5>Current Answer: </h5>
            <div>{state.recycledAnswer}</div>
            <button name='recycled' onClick={this.handleEdit} value='18'>Edit</button>
          </div>
          )}
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    qa: state.qa,
    pre_qa: state.preQa
  }
}

export default connect(mapStateToProps, { fetchCause, fetchAllCause, updateCause, createCause })(BrandCauses)
