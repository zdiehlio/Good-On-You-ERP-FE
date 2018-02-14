import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { connect } from 'react-redux'
import { Form, Radio, Input, Checkbox, Progress, Portal, Segment } from 'semantic-ui-react'
import { fetchAllStyles, fetchStyles, createStyles, updateStyles } from '../../actions/style'
import { SuppHeading } from '../../components'
import _ from 'lodash'

import './suppDataStyles.css'

class SuppDataStyles extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: null,
      progress: [],
      styles: [],
      validateStyles: [],
      deleteStyles: [],
      style_scores: 0,
      progressBar: 0,
      casual: 0,
      classic: 0,
      feminine: 0,
      sporty: 0,
      trendy: 0,
      tempAnswers: [],
      changeError: false,
    }


    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handlePercentage = this.handlePercentage.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handlePortal = this.handlePortal.bind(this)
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchAllStyles()
    this.props.fetchStyles(id)
  }

  componentWillReceiveProps(nextProps) {
    const { id }  = this.props.match.params
    if(nextProps.styles !== this.props.styles) {
      _.map(nextProps.styles, compare => {
        if(compare.style_qa.question === 'style-scores') {
          this.setState({
            [compare.style_qa.tag]: compare.score,
            [compare.style_qa.question]: 0,
          })
          this.state.progress.push(compare.style_qa.tag)
          this.state.style_scores+=compare.score
          if(!this.state[compare.style_qa.question]) {
            this.state.progressBar++
            this.setState({[compare.style_qa.question]: compare.style_qa.question})
          }
        } else if(compare.style_qa.question !== 'kids') {
          if(!this.state[compare.style_qa.question]) {
            this.state.progressBar++
          }
          this.state.styles.push({brand: id, style: compare.style_qa.tag})
          this.setState({
            [compare.style_qa.question]: compare.style_qa.question,
            [compare.style_qa.tag]: compare.style_qa.tag,
          })
        }
      })
    }
  }


  //toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state.changeError === false) {
      this.setState({
        isEditing: event.target.name,
      })
    } else {
      this.setState({renderChangeError: true, portal: true})
    }
  }

  //sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    _.map(this.state.styles, val => {
      console.log('styles', val)
      this.setState({[val.style]: null})
    })
    this.state.progress.map(score => {
      this.setState({[score]: 0})
    })
    this.setState({tempAnswers: [], styles: [], isEditing: null, changeError: false, renderChangeError: false})
    this.props.fetchStyles(id)
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.props.createStyles(this.state.styles)
    _.map(this.state.styles, check => {
      if(!this.state[`original${check}`]) {
        this.state.progressBar++
      }
    })
    // _.map(this.state.tempAnswers, temp => {
    //   this.setState({[temp]: temp})
    // })
    if(event.target.name === 'style-scores') {
      _.map(this.state.progress, style => {
        this.props.createStyles({brand: id, style: style, score: this.state[style]})
        event.target.value === 'next' ? this.props.history.push(`/suppDataTypes/${id}`) :this.setState({isEditing: null})
        if(!this.state[`originalstyle-scores`]) {
          this.state.progressBar++
        }
      })
    }
    if(event.target.value === 'next') {
      if(event.target.name === 'men') {
        this.setState({isEditing: 'older-women'})
      } else if(event.target.name === 'older-women') {
        this.setState({isEditing: 'young-women'})
      } else if(event.target.name === 'young-women') {
        this.setState({isEditing: 'designer'})
      } else if(event.target.name === 'designer') {
        this.setState({isEditing: 'basics'})
      } else if(event.target.name === 'basics') {
        this.setState({isEditing: 'luxury'})
      } else if(event.target.name === 'luxury') {
        this.setState({isEditing: 'accessories'})
      } else if(event.target.name === 'accessories') {
        this.setState({isEditing: 'bags'})
      } else if(event.target.name === 'bags') {
        this.setState({isEditing: 'fitness'})
      } else if(event.target.name === 'fitness') {
        this.setState({isEditing: 'outdoor'})
      } else if(event.target.name === 'outdoor') {
        this.setState({isEditing: 'shoes'})
      } else if(event.target.name === 'shoes') {
        this.setState({isEditing: 'underwear'})
      } else if(event.target.name === 'underwear') {
        this.setState({isEditing: 'style-scores'})
      }
    } else {
      this.setState({isEditing: null})
    }
    this.setState({changeError: false, renderChangeError: false})
  }

  handlePercentage(event) {
    event.preventDefault()
    if(!this.state[event.target.name]) {
      this.setState({[event.target.name]: 0})
    }
    if(event.target.value === 'add' && this.state[event.target.name] < 1) {
      this.setState({[event.target.name]: this.state[event.target.name] + 0.25, style_scores: this.state.style_scores + 0.25})
    }
    if(event.target.value === 'subtract' && this.state[event.target.name] > 0) {
      this.setState({[event.target.name]: this.state[event.target.name] - 0.25, style_scores: this.state.style_scores - 0.25})
    }
    if(this.state.progress.includes(event.target.name)) {
      return
    } else {
      this.setState({progress: [...this.state.progress, event.target.name]})
    }
    this.setState({changeError: true})
  }

  renderAnswers(el) {
    return(
      <div>
        {_.map(this.props.pre_qa, check => {
          if(check.question === el) {
            return(
              <p key={check.tag}>{this.state[check.tag] ? check.answer : ''}</p>
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
          if(check.question === el && this.state[check.tag] > 0) {
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
      this.setState({
        // [`temp${name}`]: name,
        [name]: null,
        // tempAnswers: this.state.tempAnswers.filter(check => {return check !== name}),
        deleteValues: [...this.state.styles, {brand: id, style: name}],
        validateStyles: this.state.styles.filter(check => {return check.style !== name}),
        styles: this.state.styles.filter(check => {return check.style !== name}),
      })
    } else {
      this.setState({
        // tempAnswers: [...this.state.tempAnswers, name],
        [name]: name,
        deleteValues: this.state.styles.filter(check => {return check.style !== name}),
        validateStyles: [...this.state.styles, {brand: id, style: name}],
        styles: [...this.state.styles, {brand: id, style: name}],
      })
    }
    this.setState({changeError: true})
  }

  renderStyles(el, nextEl) {
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
        <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
        <div className='button-container'>
          <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
          <div><button name={el} onClick={this.handleSave}>Save</button></div>
          <div><HashLink to={nextEl}><button name={el} value='next' onClick={this.handleSave}>Save & Next</button></HashLink></div>
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
              <div className='progress-container'><button onClick={this.handlePercentage} name={style.tag} value='subtract'>-</button></div>
              <div className='progress-container'><Progress className='progress-bar' total={1} value={this.state[style.tag]} progress /></div>
              <div className='progress-container'><button onClick={this.handlePercentage} name={style.tag} value='add'>+</button></div>
              <div className='progress-container'><p>{style.answer}</p></div>
            </div>
            )
          }
        })}
        <div className='button-container'>
          <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
          <div><button name={el} onClick={this.handleSave}>Save</button></div>
          <div><button name={el} value='next' onClick={this.handleSave}>Save & Next</button></div>
        </div>
      </div>
    )
  }

  handlePortal() {
    this.setState({portal: false})
  }

  //render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props styles', this.props.styles)
    console.log('props pre_qa', this.props.pre_qa)
    console.log('state', this.state)
    const { id }  = this.props.match.params
    const isEditing = this.state.isEditing
    const state = this.state
    const props = this.props.styles
    return(
      <div className='form-container'>
        <SuppHeading id={id} brand={this.props.brand}/>
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
        <Progress percent={Math.floor((this.state.progressBar/13) * 100)} progress />
        {state.renderChangeError === true ? (
          <Portal open={state.portal} className='portal'>
            <Segment style={{ left: '35%', position: 'fixed', top: '50%', zIndex: 1000}}>
              <p>Please Save or Cancel your selected answers before proceeding</p>
              <button onClick={this.handlePortal}>Ok</button>
            </Segment>
          </Portal>
        ) : ''}
        <form className='brand-form'>
          {isEditing === 'men' ? (
            <div className='editing'>
              <h4>Does the Brand sell clothes for men?</h4>
              {this.renderStyles('men', '#older-women')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell clothes for men?</h4>
              {this.renderAnswers('men')}
              <p className='small-divider'></p>
            </div>
          )}

          {isEditing === 'older-women' ? (
            <div className='editing' id='older-women'>
              <h4>Does the Brand sell clothes for older-women?</h4>
              {this.renderStyles('older-women', '#young-women')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell clothes for older-women?</h4>
              {this.renderAnswers('older-women')}
              <p className='small-divider'></p>
            </div>
          )}

          {isEditing === 'young-women' ? (
            <div className='editing' id='young-women'>
              <h4>Does the Brand sell clothes for young women?</h4>
              {this.renderStyles('young-women', '#designer')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell clothes for young-women?</h4>
              {this.renderAnswers('young-women')}
              <p className='small-divider'></p>
            </div>
          )}

          {isEditing === 'designer' ? (
            <div className='editing' id='designer'>
              <h4>Where is the brand designed?</h4>
              {this.renderStyles('designer', '#basics')}
            </div>) : (
            <div className='not-editing'>
              <h4>Where is the brand designed?</h4>
              {this.renderAnswers('designer')}
              <p className='small-divider'></p>
            </div>
          )}

          {isEditing === 'basics' ? (
            <div className='editing' id='basics'>
              <h4>Does the brand sell Basics?</h4>
              {this.renderStyles('basics', '#luxury')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the brand sell basics?</h4>
              {this.renderAnswers('basics')}
              <p className='small-divider'></p>
            </div>
          )}

          {isEditing === 'luxury' ? (
            <div className='editing' id='luxury'>
              <h4>Does the brand sell Luxury clothes?</h4>
              {this.renderStyles('luxury', '#accessories')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the brand sell Luxury clothes?</h4>
              {this.renderAnswers('luxury')}
              <p className='small-divider'></p>
            </div>
          )}

          {isEditing === 'accessories' ? (
            <div className='editing' id='accessories'>
              <h4>Does the brand sell accessories?</h4>
              {this.renderStyles('accessories', '#bags')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the brand sell accessories?</h4>
              {this.renderAnswers('accessories')}
              <p className='small-divider'></p>
            </div>
          )}

          {isEditing === 'bags' ? (
            <div className='editing' id='bags'>
              <h4>Does the brand sell bags?</h4>
              {this.renderStyles('bags', '#fitness')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the brand sell bags?</h4>
              {this.renderAnswers('bags')}
              <p className='small-divider'></p>
            </div>
          )}

          {isEditing === 'fitness' ? (
            <div className='editing' id='fitness'>
              <h4>Does the brand sell Fitness clothing?</h4>
              {this.renderStyles('fitness', '#outdoor')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the brand sell Fitness clothing?</h4>
              {this.renderAnswers('fitness')}
              <p className='small-divider'></p>
            </div>
          )}

          {isEditing === 'outdoor' ? (
            <div className='editing' id='outdoor'>
              <h4>Does the brand sell Outdoor Gear?</h4>
              {this.renderStyles('outdoor', '#shoes')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the brand sell Outdoor Gear?</h4>
              {this.renderAnswers('outdoor')}
              <p className='small-divider'></p>
            </div>
          )}

          {isEditing === 'shoes' ? (
            <div className='editing' id='shoes'>
              <h4>Does the Brand sell shoes?</h4>
              {this.renderStyles('shoes', '#underwear')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell shoes?</h4>
              {this.renderAnswers('shoes')}
              <p className='small-divider'></p>
            </div>
          )}

          {isEditing === 'underwear' ? (
            <div className='editing' id='underwear'>
              <h4>Does the Brand sell underwear?</h4>
              {this.renderStyles('underwear', '#style-scores')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell underwear?</h4>
              {this.renderAnswers('underwear')}
              <p className='small-divider'></p>
            </div>
          )}

          {isEditing === 'style-scores' ? (
            <div className='editing' id='style-scores'>
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
    styles: state.styles,
    pre_qa: state.preQa,
    brand: state.brandInfo,
  }
}

export default connect(mapStateToProps, { fetchAllStyles, fetchStyles, updateStyles, createStyles })(SuppDataStyles)
