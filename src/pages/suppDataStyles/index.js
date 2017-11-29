import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAllStyles, fetchStyles, createStyles, updateStyles } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'
import axios from 'axios'
import { ProgressBar, Line } from 'react-progressbar.js'

import './suppDataStyles.css'
const ROOT_URL = 'https://goy-ed-2079.nodechef.com'

class SuppDataStyles extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: null,
      save: false,
      progress: []
    }


    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleKidsEdit = this.handleKidsEdit.bind(this)
    this.handlePercentage = this.handlePercentage.bind(this)
  }
componentWillMount() {
  const { id } = this.props.match.params
  this.props.fetchStyles(id)
}

componentWillReceiveProps(nextProps) {
  if(nextProps.qa !== this.props.qa) {
  _.map(nextProps.qa, check => {
    this.setState({[check.style_qa.tag]: check.score})
  })
}
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
    _.map(this.props.qa, check => {
      if(check.style_qa.question === event.target.name  && !this.state[check.style_qa.tag]) {
        console.log('edit', check.style_qa);
        this.setState({[check.style_qa.tag]: check.score})
      } else if(!this.state[check.style_qa.tag]){
        console.log(check.style_qa);
        this.setState({[check.style_qa.tag]: 0})
      }
    })
    this.setState({isEditing: event.target.name})
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
    _.map(this.state.progress, check => {
      console.log('check', check);
      this.props.createStyles({brand: id, style: check, score: this.state[check]})
    })
    this.setState({isEditing: null, save: true})
  }

  handleChange(event){
    this.setState({currentAnswer: event.target.name})
  }

  handlePercentage(event) {
    event.preventDefault()
    if(!this.state[event.target.name]) {
      this.setState({[event.target.name]: 0})
    }
    if(event.target.value === 'add' && this.state[event.target.name] < 1) {
      this.setState({[event.target.name]: this.state[event.target.name] + 0.25})
      console.log(event.target.className);
    }
    if(event.target.value === 'subtract' && this.state[event.target.name] > 0) {
      this.setState({[event.target.name]: this.state[event.target.name] - 0.25})
    }
    if(this.state.progress.includes(event.target.name)) {
      return
    } else {
        this.setState({progress: [...this.state.progress, event.target.name]})
      }
  }

  // renderStyles(el) {
  //   return(
  //     <button onClick={this.handlePercentage} name='men-surf' value='subtract' className='progress'>-</button>
  //       <li className='progress-container'>
  //         <Line
  //         progress={state['men-surf']}
  //         text={state['men-surf']}
  //         options={options}/>
  //       </li>
  //     <button onClick={this.handlePercentage} name='men-surf' value='add' className='progress'>+</button>
  //   )
  // }

//render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props', this.props.qa);
    console.log('state', this.state);
    const { id }  = this.props.match.params
    const isEditing = this.state.isEditing
    const state = this.state
    const props = this.props.qa
    let options = {
      strokeWidth: 2,
      color: '#17CABE',
      text: {
        style: {
          position: 'center',
          margin:'0.2em',
        }
      }
    }
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
        {isEditing === 'men' ? (
          <div className='editing'>
          <h4>Does the Brand sell clothes for men?</h4>
            <div>
              <h5>Mens Surf</h5>
              <div>
                <button onClick={this.handlePercentage} name='men-surf' value='subtract' className='progress'>-</button>
                <Line
                progress={state['men-surf']}
                text={state['men-surf'] ? `${(state['men-surf'] * 100)}%` : '0%'}
                options={options}
                containerClassName={'progress-container'}/>
                <button onClick={this.handlePercentage} name='men-surf' value='add' className='progress'>+</button>
              </div>
              <h5>Mens Wear</h5>
              <div>
                <button onClick={this.handlePercentage} name='men-menswear' value='subtract' className='progress'>-</button>
                <Line
                progress={state['men-menswear']}
                text={state['men-menswear'] ? `${(state['men-menswear'] * 100)}%` : '0%'}
                options={options}
                containerClassName={'progress-container'}/>
                <button onClick={this.handlePercentage} name='men-menswear' value='add' className='progress'>+</button>
              </div>
              <h5>Mens Casual</h5>
              <div>
                <button onClick={this.handlePercentage} name='men-casual' value='subtract' className='progress'>-</button>
                <Line
                progress={state['men-casual']}
                text={state['men-casual'] ? `${(state['men-casual'] * 100)}%` : '0%'}
                options={options}
                containerClassName={'progress-container'}/>
                <button onClick={this.handlePercentage} name='men-casual' value='add' className='progress'>+</button>
              </div>
              <h5>Mens Work</h5>
              <div>
                <button onClick={this.handlePercentage} name='men-work' value='subtract' className='progress'>-</button>
                <Line
                progress={state['men-work']}
                text={state['men-work'] ? `${(state['men-work'] * 100)}%` : '0%'}
                options={options}
                containerClassName={'progress-container'}/>
                <button onClick={this.handlePercentage} name='men-work' value='add' className='progress'>+</button>
              </div>
            </div>
            <button onClick={this.handleCancel}>Cancel</button>
            <button name='men' onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>Does the Brand sell clothes for men?</h4>
            <h5>Mens Surf: {state['men-surf'] ? `${(state['men-surf'] * 100)}%` : '0%'}</h5>
            <h5>Mens Wear: {state['men-menswear'] ? `${(state['men-menswear'] * 100)}%` : '0%'}</h5>
            <h5>Mens Casual: {state['men-casual'] ? `${(state['men-casual'] * 100)}%` : '0%'}</h5>
            <h5>Mens Work: {state['men-work'] ? `${(state['men-work'] * 100)}%` : '0%'}</h5>
            <button name='men' onClick={this.handleEdit}>Edit</button>
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
