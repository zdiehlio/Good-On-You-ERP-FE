import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Radio, Input, Checkbox, Progress } from 'semantic-ui-react'
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
      styles: [],
      'style-scores': 0,
      progressBar: 0,
    }


    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handlePercentage = this.handlePercentage.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchAllStyles()
    this.props.fetchStyles(id)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.qa !== this.props.qa) {
      _.map(nextProps.qa, compare => {
        if(compare.style_qa.question === 'style-scores') {
          this.setState({
            [`original${compare.style_qa.question}`]: compare.style_qa.question,
            [`original${compare.style_qa.tag}`]: compare.score,
            [compare.style_qa.tag]: compare.score,
            [compare.style_qa.question]: 0,
          })
          this.state.progressBar++
        }
        if(compare.style_qa.question === 'men') {
          this.state.progressBar++
        }
        if(compare.style_qa.question === 'fitness') {
          this.state.progressBar++
        }
        if(compare.style_qa.question === 'designer') {
          this.state.progressBar++
        }
        if(compare.style_qa.question === 'bags') {
          this.state.progressBar++
        }
        if(compare.style_qa.question === 'basics') {
          this.state.progressBar++
        }
        if(compare.style_qa.question === 'accessories') {
          this.state.progressBar++
        }
        if(compare.style_qa.question === 'luxury') {
          this.state.progressBar++
        }
        if(compare.style_qa.question === 'outdoor') {
          this.state.progressBar++
        }
        if(compare.style_qa.question === 'shoes') {
          this.state.progressBar++
        }
        if(compare.style_qa.question === 'underwear') {
          this.state.progressBar++
        }
        if(compare.style_qa.question === 'older-women') {
          this.state.progressBar++
        }
        if(compare.style_qa.question === 'young-women') {
          this.state.progressBar++
        }
        this.setState({[`original${compare.style_qa.tag}`]: compare.style_qa.tag, [compare.style_qa.tag]: compare.style_qa.tag})
      })
    }
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
    _.map(this.state.styles, check => {
      this.props.createStyles({brand: id, style: check})
      if(!this.state[`original${check}`]) {
        this.state.progressBar++
      }
    })
    if(event.target.name === 'style-scores') {
      this.props.createStyles({brand: id, style: event.target.name, score: this.state[event.target.name]})
      if(!this.state[event.target.name]) {
        this.state.progressBar++
      }
    }
    this.setState({isEditing: null})
  }

  handlePercentage(event) {
    event.preventDefault()
    if(!this.state[event.target.name]) {
      this.setState({[event.target.name]: 0})
    }
    if(event.target.value === 'add' && this.state[event.target.name] < 1 && this.state[event.target.class] < 1) {
      this.setState({[event.target.name]: this.state[event.target.name] + 0.25, [event.target.class]: this.state[event.target.class] + 0.25})
    }
    if(event.target.value === 'subtract' && this.state[event.target.name] > 0) {
      this.setState({[event.target.name]: this.state[event.target.name] - 0.25, [event.target.class]: this.state[event.target.class] - 0.25})
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
              <p key={check.tag}>{this.state[check.tag] ? this.state[check.answer] : ''}</p>
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

  renderFinalPercentage(el) {
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

  handleCheckbox(event, { name }){
    const { id }  = this.props.match.params
    if(this.state[name] === name) {
      this.setState({[name]: null, styles: this.state.styles.filter(check => {return check.style !== name})})
    } else {
      this.setState({[name]: name, styles: [...this.state.styles, {brand: id, style: name}]})
    }
  }

  renderStyles(el) {
    const state = this.state
    return(
      <div>
        {_.map(this.props.pre_qa, style => {
          if(style.question === el) {
            return(
              <Form.Field key={style.tag} inline>
                <Checkbox
                  label={style.answer}
                  onChange={this.handleCheckbox}
                  checked={state[style.tag] ? true : false}
                  name={style.tag}
                />
              </Form.Field>
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

  renderScores(el) {
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
              <button onClick={this.handlePercentage} name={style.tag} value='subtract' className={style.question}>-</button>
              <Line
                progress={state[style.tag]}
                text={state[style.tag] ? `${(state[style.tag] * 100)}%` : '0%'}
                options={options}
                containerClassName={'progress-container'}/>
              <button onClick={this.handlePercentage} name={style.tag} value='add' className={style.question}>+</button>
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
        <SuppHeading id={id} />
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/suppDataCategory/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Brand Styles</h3></div>
            <div><Link to={`/suppDataTypes/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress total={12} value={state.progressBar} progress />
        <form className='brand-form'>
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

          {isEditing === 'outdoor-' ? (
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
              {this.renderScores('style-scores')}
            </div>) : (
            <div className='not-editing'>
              <h4>Style Scores</h4>
              {this.renderFinalPercentage('style-scores')}
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
