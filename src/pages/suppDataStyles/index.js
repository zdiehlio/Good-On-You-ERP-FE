import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAllStyles, fetchStyles, createStyles, updateStyles } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'
import axios from 'axios'

class SuppDataStyles extends Component {
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
    this.handleKidsEdit = this.handleKidsEdit.bind(this)
  }
componentWillMount() {
  const { id } = this.props.match.params
  this.props.fetchStyles(id)
}

componentWillUpdate(nextProps, nextState) {
  const { id } = this.props.match.params
  if (nextState.save === true && this.state.save === false) {
    this.props.fetchStyles(id)
  }
}

componentDidUpdate() {
  if(this.state.save === true) {
    this.setState({save: false})
  }
}

handleKidsEdit(event) {
  event.preventDefault()
  const { id }  = this.props.match.params
  _.map(this.props.qa, check => {
    if(check.style_qa.question === event.target.name) {
      console.log('kids', check.style_qa.tag);
      this.setState({currentAnswer: check.style_qa.tag, [check.style_qa.question]: check.style_qa.question})
    }
  })
  this.setState({isEditing: event.target.name})
}

//toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    // if(this.props.qa[event.target.name] || this.state[event.target.name]){
    //   //if state of target button 'name' already exists, will set state of same target name to the current answer value and also toggle editing
    //   if(this.state[event.target.name]){
    //     this.setState({[event.target.name]: this.state[event.target.name], isEditing: event.target.value})
    //     console.log('state answer');
    //   //if state of target 'name' does not yet exist, will pull value of answer off props and set state to that answer and also toggle editing
    //   } else {
    //     this.setState({[event.target.name]: `${this.props.qa[event.target.name].answer}`, currentAnswer: `${this.props.qa[event.target.name].answer}`, isEditing: event.target.value})
    //     console.log('props answer');
    //   }
    // }
    // //if an answer has not yet been created(first time visiting this specific question for this brand), will create a post request and toggle editing
    // else {
    //   this.props.createStyles({brand: id, question: event.target.name, answer: event.target.value})
      this.setState({isEditing: event.target.value, save: false})
      console.log('post');
    // }
  }
//sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    event.preventDefault()
    this.setState({isEditing: null})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    // if(this.state[event.target.name]) {
    //   this.props.updateStyles
    // }
    this.props.createStyles(id, this.state.currentAnswer, {brand: id, style: this.state.currentAnswer})
    this.setState({isEditing: null, save: true})
    console.log('save', this.state);
  }
  handleChange(event){
    this.setState({currentAnswer: event.target.name})
  }

//render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props', this.props.qa);
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
            <div><Link to={`/suppDataCategory/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Brand Styles</h3></div>
            <div><Link to={`/suppDataTypes/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <form className='brand-form'>
        {isEditing === 'kids' ? (
          <div className='editing'>
            <h4>Does the Brand sell Clothes for kids?</h4>
              <ul>
                <li><Field
                  type='radio'
                  onChange={this.handleChange}
                  checked={state.currentAnswer === 'kids'}
                  name='kids'
                  component='input'/> Yes
                </li>
                <li><Field
                  type='radio'
                  onChange={this.handleChange}
                  checked={state.currentAnswer === 'no-kids'}
                  name='no-kids'
                  component='input'/> No
                </li>
              </ul>
              <button onClick={this.handleCancel}>Cancel</button>
              <button onClick={this.handleSave} name='kids'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the Brand sell Clothes for kids?</h4>
            <h5>{state['1']}</h5>
            <button name='kids' onClick={this.handleKidsEdit}>Edit</button>

          </div>
            )}
        {isEditing === '6' ? (
          <div className='editing'>
          <h4>Does the Brand sell clothes for men?</h4>
            <ul>
              <li><Field
                type='radio'
                onChange={this.handleChange}
                checked={state['men']==='6'}
                name='men'
                component='input'
                value='6'/>Yes
              </li>
              <li><Field
                type='radio'
                onChange={this.handleChange}
                checked={state['men']==='7'}
                name='men'
                component='input'
                value='7'/>No
              </li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='men' onClick={this.handleSave} value='6'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the Brand sell clothes for men?</h4>
            <h5>{state['6']}</h5>
            <button name='men' onClick={this.handleEdit} value='6'>Edit</button>
          </div>
        )}

        {isEditing === '8'? (
          <div className='editing'>
          <h4>Does the brand sell clothes for older women?</h4>
            <ul>
              <li><Field
                type='radio'
                name='older-women'
                onChange={this.handleChange}
                checked={state['older-women'] === '8'}
                component='input'
                value="8"/>Yes
              </li>
              <li><Field
                type='radio'
                name='older-women'
                onChange={this.handleChange}
                checked={state['older-women'] === '9'}
                component='input'
                value="9"/>No
              </li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='older-women' onClick={this.handleSave} value='8'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the brand sell clothes for older women?</h4>
            <h5>{state['8']}</h5>
            <button name='older-women' onClick={this.handleEdit} value='8'>Edit</button>
          </div>
          )}

        {isEditing === '10' ? (
          <div className='editing'>
          <h4>Does the brand sell clothes for young women?</h4>
            <ul>
              <li><Field
                type='radio'
                name='young-women'
                onChange={this.handleChange}
                checked={state['young-women'] === '10'}
                component='input'
                value="10"/>Yes
              </li>
              <li><Field
                type='radio'
                name='young-women'
                onChange={this.handleChange}
                checked={state['young-women'] === '11'}
                component='input'
                value="11"/>No
              </li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='young-women' onClick={this.handleSave} value='10'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the brand sell clothes for young women?</h4>
            <h5>{state['10']}</h5>
            <button name='young-women' onClick={this.handleEdit} value='10'>Edit</button>
          </div>
          )}

        {isEditing === '12' ? (
          <div className='editing'>
          <h4>Where are the brands designed?</h4>
            <ul>
              <li><Field
                type='radio'
                name='location'
                onChange={this.handleChange}
                checked={state['location'] === '12'}
                component='input'
                value="12"/>Yes
              </li>
              <li><Field
                type='radio'
                name='location'
                onChange={this.handleChange}
                checked={state['location'] === '13'}
                component='input'
                value="13"/>No
              </li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='location' onClick={this.handleSave} value='12'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Where are the brands designed?</h4>
            <h5>{state['12']}</h5>
            <button name='location' onClick={this.handleEdit} value='12'>Edit</button>
          </div>
          )}

        {isEditing === '14' ? (
          <div className='editing'>
          <h4>Does the brand sell basics?</h4>
            <ul>
              <li><Field
                type='radio'
                name='basics'
                onChange={this.handleChange}
                checked={state['basics'] === '14'}
                component='input'
                value="14"/>Yes
              </li>
              <li><Field
                type='radio'
                name='basics'
                onChange={this.handleChange}
                checked={state['basics'] === '15'}
                component='input'
                value="15"/>No
                </li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='basics' onClick={this.handleSave} value='14'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the brand sell basics?</h4>
            <h5>{state['14']}</h5>
            <button name='fair-trade' onClick={this.handleEdit} value='14'>Edit</button>
          </div>
          )}

        {isEditing === '16' ? (
          <div className='editing'>
          <h4>Does the brand sell luxury clothes?</h4>
            <ul>
              <li><Field
                type='radio'
                name='luxury'
                onChange={this.handleChange}
                checked={state['luxury'] === '17'}
                component='input'
                value="17"/>Yes
              </li>
              <li><Field type='radio'
                name='luxury'
                onChange={this.handleChange}
                checked={state['luxury'] === '18'}
                component='input'
                value="18"/>No
              </li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='luxury' onClick={this.handleSave} value='16'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the brand sell luxury clothes?</h4>
            <h5>{state['16']}</h5>
            <button name='luxury' onClick={this.handleEdit} value='16'>Edit</button>
          </div>
          )}
        {isEditing === '18' ? (
          <div className='editing'>
          <h4>Does the brand sell underwear?</h4>
            <ul>
              <li><Field
                type='radio'
                name='underwear'
                component='input'
                checked={state['underwear'] === '20'}
                onChange={this.handleChange}
                value="20"/>
              </li>
              <li><Field
                type='radio'
                name='underwear'
                onChange={this.handleChange}
                checked={state['underwear'] === '21'}
                component='input'
                value="21"/>
              </li>
              <li><Field
                type='radio'
                name='underwear'
                onChange={this.handleChange}
                checked={state['underwear'] === '22'}
                component='input'
                value="22"/>
              </li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='underwear' onClick={this.handleSave} value='18'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the brand sell underwear?</h4>
            <h5>{state['18']}</h5>
            <button name='underwear' onClick={this.handleEdit} value='18'>Edit</button>
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
  form: 'SuppDataStylesForm'
})(
  connect(mapStateToProps, { fetchAllStyles, fetchStyles, updateStyles, createStyles })(SuppDataStyles)
)
