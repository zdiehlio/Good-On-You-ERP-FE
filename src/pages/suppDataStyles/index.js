import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Radio, Input} from 'semantic-ui-react'
import { fetchAllStyles, fetchStyles, createStyles, updateStyles } from '../../actions'
import { SuppHeading } from '../../components'
import _ from 'lodash'
import { ProgressBar, Line } from 'react-progressbar.js'

import './suppDataStyles.css'

class SuppDataStyles extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: null,
      progress: [],
    }


    this.handleKids = this.handleKids.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleKidsEdit = this.handleKidsEdit.bind(this)
    this.handlePercentage = this.handlePercentage.bind(this)
    this.handleTotalPercentage = this.handleTotalPercentage.bind(this)
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchAllStyles()
    this.props.fetchStyles(id)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.qa !== this.props.qa) {
      _.map(nextProps.qa, compare => {
        if(compare.style_qa.question === 'kids') {
          this.setState({kids: compare.style_qa.tag})
        }
        this.setState({[compare.style_qa.tag]: compare.score, [compare.style_qa.question]: 0})
      })
    }
  }

  handleKidsEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(!this.state.kids) {
      _.map(this.props.qa, check => {
        if(check.style_qa.question === event.target.name) {
          this.setState({kids: check.style_qa.tag})
        }
      })
    }
    this.setState({isEditing: event.target.name})
  }

  //toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    _.map(this.props.pre_qa, check => {
      if(!this.state[check.tag])
        this.setState({[check.tag]: 0})
    })
    this.setState({
      isEditing: event.target.name,
      [event.target.name]: _.reduce(this.props.qa, (sum, check) => {
        if(check.style_qa.question === event.target.name) {
          return sum.score + check.score
        }
      }),
    })
  }

  //sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    event.default()
    this.setState({isEditing: null})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    _.map(this.state.progress, check => {
      this.props.createStyles({brand: id, style: check, score: this.state[check]})
    })
    if(this.state.kids && event.target.name === 'kids') {
      this.props.createStyles({brand: id, style: this.state.kids})
    }
    this.setState({isEditing: null})
  }

  handleKids(event, {name}){
    this.setState({kids: name})
  }

  handleTotalPercentage(event) {
    event.preventDefault()
    console.log('total working', event.target)
  }

  handlePercentage(event) {
    event.preventDefault()
    if(!this.state[event.target.name]) {
      this.setState({[event.target.name]: 0})
    }
    if(event.target.value === 'add' && this.state[event.target.name] < 1 && this.state[event.target.id] < 1) {
      this.setState({[event.target.name]: this.state[event.target.name] + 0.25, [event.target.id]: this.state[event.target.id] + 0.25})
    }
    if(event.target.value === 'subtract' && this.state[event.target.name] > 0) {
      this.setState({[event.target.name]: this.state[event.target.name] - 0.25, [event.target.id]: this.state[event.target.id] - 0.25})
    }
    if(this.state.progress.includes(event.target.name)) {
      return
    } else {
      this.setState({progress: [...this.state.progress, event.target.name]})
    }
  }

  renderAnswers(el) {
    return(
      <div>
        {_.map(this.props.pre_qa, check => {
          if(check.question === el) {
            return(
              <p key={check.tag}>{check.answer}: {this.state[check.tag] ? `${(this.state[check.tag] * 100)}%` : '0%'}</p>
            )
          }
        })}
        <div className='button-container'>
          <div></div>
          <div><button name={el} onClick={this.handleEdit}>Edit</button></div>
        </div>
      </div>
    )
  }

  renderStyles(el) {
    const state = this.state
    let options = {
      strokeWidth: 2,
      color: '#17CABE',
      text: {
        style: {
          position: 'center',
          margin:'0.2em',
        },
      },
    }
    return(
      <div>
        {_.map(this.props.pre_qa, style => {
          if(style.question === el) {
            return(<div key={style.tag} className='percentage-container'>
              <p>{style.answer}</p>
              <button onClick={this.handlePercentage} name={style.tag} value='subtract' id={style.question} className='progress'>-</button>
              <Line
                progress={state[style.tag]}
                text={state[style.tag] ? `${(state[style.tag] * 100)}%` : '0%'}
                options={options}
                containerClassName={'progress-container'}/>
              <button onClick={this.handlePercentage} name={style.tag} value='add' id={style.question} className='progress'>+</button>
            </div>
            )
          }
        })}
        <div className='button-container'>
          <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
          <div><button name={el} onClick={this.handleSave}>Save</button></div>
        </div>
      </div>
    )
  }

  //render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props qa', this.props.qa)
    console.log('props pre_qa', this.props.pre_qa)
    console.log('state', this.state)
    const { id }  = this.props.match.params
    const isEditing = this.state.isEditing
    const state = this.state
    const props = this.props.qa
    return(
      <div className='form-container'>
        <SuppHeading id={this.props.match.params.id} />
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
              <Form.Field inline>
                <Radio
                  label='Yes'
                  onChange={this.handleKids}
                  checked={state.kids === 'kids' ? true : false}
                  name='kids'
                />
              </Form.Field>
              <Form.Field inline>
                <Radio
                  label='No'
                  onChange={this.handleKids}
                  checked={state.kids === 'no-kids' ? true : false}
                  name='no-kids'
                />
              </Form.Field>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button onClick={this.handleSave} name='kids'>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell Clothes for kids?</h4>
              <p>{state.kids === 'no-kids' ? 'No' : 'Yes'}</p>
              <div className='button-container'>
                <div></div>
                <div><button name='kids' onClick={this.handleKidsEdit}>Edit</button></div>
              </div>
            </div>
          )}


          {isEditing === 'men' ? (
            <div className='editing'>
              <h4>Does the Brand sell clothes for men?</h4>
              {this.renderStyles('men')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell clothes for men?</h4>
              {this.renderAnswers('men')}
            </div>
          )}

          {isEditing === 'older-women' ? (
            <div className='editing'>
              <h4>Does the Brand sell clothes for older-women?</h4>
              {this.renderStyles('older-women')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell clothes for older-women?</h4>
              {this.renderAnswers('older-women')}
            </div>
          )}

          {isEditing === 'young-women' ? (
            <div className='editing'>
              <h4>Does the Brand sell clothes for young women?</h4>
              {this.renderStyles('young-women')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell clothes for young-women?</h4>
              {this.renderAnswers('young-women')}
            </div>
          )}

          {isEditing === 'designer' ? (
            <div className='editing'>
              <h4>Where is the brand designed?</h4>
              {this.renderStyles('designer')}
            </div>) : (
            <div className='not-editing'>
              <h4>Where is the brand designed?</h4>
              {this.renderAnswers('designer')}
            </div>
          )}

          {isEditing === 'basics' ? (
            <div className='editing'>
              <h4>Does the brand sell Basics?</h4>
              {this.renderStyles('basics')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the brand sell basics?</h4>
              {this.renderAnswers('basics')}
            </div>
          )}

          {isEditing === 'luxury' ? (
            <div className='editing'>
              <h4>Does the brand sell Luxury clothes?</h4>
              {this.renderStyles('luxury')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the brand sell Luxury clothes?</h4>
              {this.renderAnswers('luxury')}
            </div>
          )}

          {isEditing === 'accessories' ? (
            <div className='editing'>
              <h4>Does the brand sell accessories?</h4>
              {this.renderStyles('accessories')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the brand sell accessories?</h4>
              {this.renderAnswers('accessories')}
            </div>
          )}

          {isEditing === 'bags' ? (
            <div className='editing'>
              <h4>Does the brand sell bags?</h4>
              {this.renderStyles('bags')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the brand sell bags?</h4>
              {this.renderAnswers('bags')}
            </div>
          )}

          {isEditing === 'fitness' ? (
            <div className='editing'>
              <h4>Does the brand sell Fitness clothing?</h4>
              {this.renderStyles('fitness')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the brand sell Fitness clothing?</h4>
              {this.renderAnswers('fitness')}
            </div>
          )}

          {isEditing === 'outdoor' ? (
            <div className='editing'>
              <h4>Does the brand sell Outdoor Gear?</h4>
              {this.renderStyles('outdoor-')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the brand sell Outdoor Gear?</h4>
              {this.renderAnswers('outdoor-')}
            </div>
          )}

          {isEditing === 'shoes' ? (
            <div className='editing'>
              <h4>Does the Brand sell shoes?</h4>
              {this.renderStyles('shoes')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell shoes?</h4>
              {this.renderAnswers('shoes')}
            </div>
          )}

          {isEditing === 'underwear' ? (
            <div className='editing'>
              <h4>Does the Brand sell underwear?</h4>
              {this.renderStyles('underwear')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell underwear?</h4>
              {this.renderAnswers('underwear')}
            </div>
          )}

          {isEditing === 'style-scores' ? (
            <div className='editing'>
              <h4>Style Scores</h4>
              {this.renderStyles('style-scores')}
            </div>) : (
            <div className='not-editing'>
              <h4>Style Scores</h4>
              {this.renderAnswers('style-scores')}
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
    pre_qa: state.preQa,
  }
}

export default connect(mapStateToProps, { fetchAllStyles, fetchStyles, updateStyles, createStyles })(SuppDataStyles)
