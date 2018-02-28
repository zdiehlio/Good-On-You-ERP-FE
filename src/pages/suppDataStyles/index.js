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
      deleteStyles: [],
      menArr: [],
      ['older-womenArr']: [],
      ['young-womenArr']: [],
      fitnessArr: [],
      designerArr: [],
      bagsArr: [],
      basicsArr: [],
      accessoriesArr: [],
      luxuryArr: [],
      outdoorArr: [],
      shoesArr: [],
      underwearArr: [],
      style_scores: 0,
      progressBar: 0,
      casual: 0,
      classic: 0,
      feminine: 0,
      sporty: 0,
      trendy: 0,
      changeError: false,
      originalStyleScores: false,
    }


    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handlePercentage = this.handlePercentage.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handlePortal = this.handlePortal.bind(this)
    this.handleRadio = this.handleRadio.bind(this)
    this.handleSaveRadio = this.handleSaveRadio.bind(this)
    this.handleNav = this.handleNav.bind(this)
    this.handleSaveScores = this.handleSaveScores.bind(this)
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
          if(this.state.progress.length <= 0) {
            this.state.progressBar++
            console.log('scores')
          }
          this.setState({
            [compare.style_qa.tag]: compare.score,
            [compare.style_qa.question]: 0,
            originalStyleScores: true,
          })
          this.state.progress.push(compare.style_qa.tag)
          this.state.style_scores+=compare.score
        } else if(compare.style_qa.question === 'plus') {
          this.setState({originalplus: compare.style_qa.tag, plus: compare.style_qa.tag})
          this.state.progressBar++
          console.log('plus')
        } else if(compare.style_qa.question === 'maternity') {
          this.setState({originalmaternity: compare.style_qa.tag, maternity: compare.style_qa.tag})
          this.state.progressBar++
          console.log('maternity')
        } else if(compare.style_qa.question !== 'kids' && compare.style_qa.question !== 'gender' && compare.style_qa.question !== 'price') {
          if(this.state[`${compare.style_qa.question}Arr`].length <= 0) {
            this.state.progressBar++
            console.log('styles')
          }
          this.state.styles.push({brand: id, style: compare.style_qa.tag})
          this.setState({
            [compare.style_qa.question]: compare.style_qa.question,
            [`original${compare.style_qa.question}`]: compare.style_qa.question,
            [compare.style_qa.tag]: compare.style_qa.tag,
          })
          this.state[`${compare.style_qa.question}Arr`].push({brand: id, style: compare.style_qa.tag})
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
      this.setState({[val.style]: null})
    })
    this.state.progress.map(score => {
      this.setState({[score]: 0})
    })
    this.setState({[`${event.target.name}Arr`]: [], isEditing: null, changeError: false, renderChangeError: false})
    this.props.fetchStyles(id)
  }

  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.props.createStyles(this.state[`${event.target.name}Arr`])
    if(!this.state[`original${event.target.name}`]) {
      this.setState({[`$original${event.target.name}`]: event.target.name})
      this.state.progressBar++
    } else if(this.state[`original${event.target.name}`] && this.state[`${event.target.name}Arr`].length <=0){
      this.setState({[`original${event.target.name}`]: null})
      this.state.progressBar--
    }
    if(event.target.value === 'next') {
      if(event.target.name === 'men') {
        this.setState({isEditing: 'older-women'})
      } else if(event.target.name === 'older-women') {
        this.setState({isEditing: 'plus'})
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

  handleSaveScores(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    _.map(this.state.progress, style => {
      this.props.createStyles({brand: id, style: style, score: this.state[style]})
      event.target.value === 'next' ? this.props.history.push(`/suppDataTypes/${id}`) : this.setState({isEditing: null})
    })
    if(this.state.originalStyleScores === false) {
      this.setState({originalStyleScores: true})
      this.state.progressBar++
    }
  }

  handleSaveRadio(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.props.createStyles({brand: id, style: this.state[event.target.name]})
    this.setState({[`original${event.target.name}`]: this.state[event.target.name]})
    if(!this.state[`original${event.target.name}`]) { this.state.progressBar++ }
    if(event.target.value === 'next') {
      if(event.target.name === 'plus') {
        this.setState({isEditing: 'maternity'})
      } else if(event.target.name === 'maternity') {
        this.setState({isEditing: 'young-women'})
      }
    } else {
      this.setState({isEditing: null, changeError: false, renderChangeError: false})
    }
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
    this.setState({changeError: true, currentEditing: '#style-scores'})
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

  handleCheckbox(event, { value, name }){
    const { id }  = this.props.match.params
    if(this.state[value] === value) {
      this.setState({
        [value]: null,
        [`${name}Arr`]: this.state[`${name}Arr`].filter(check => {return check.style !== value}),
      })
    } else {
      this.setState({
        [value]: value,
        [`${name}Arr`]: [...this.state[`${name}Arr`], {brand: id, style: value}],
      })
    }
    this.setState({changeError: true, currentEditing: `#${name}`})
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
                  value={style.tag}
                  name={style.question}
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
          <div><button name={el} onClick={this.handleSaveScores}>Save</button></div>
          <div><button name={el} value='next' onClick={this.handleSaveScores}>Save & Next</button></div>
        </div>
      </div>
    )
  }

  handlePortal() {
    this.setState({portal: false})
  }

  handleNav(event) {
    const { id }  = this.props.match.params
    if(this.state.changeError === true) {
      this.setState({renderChangeError: true, portal: true})
    } else {
      if(event.target.name === 'previous') {
        this.props.history.push(`/suppDataSku/${id}`)
      } else if(event.target.name === 'next') {
        this.props.history.push(`/suppDataTypes/${id}`)
      } else if(event.target.name === 'landing') {
        this.props.history.push(`/brandLanding/${id}`)
      }
    }
  }

  handleRadio(event, { value, name }) {
    this.setState({changeError: true, [name]: value, currentEditing: `#${name}`})
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
        <div className='forms-header'><button onClick={this.handleNav} name='landing'>Back to Summary</button></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><button onClick={this.handleNav} name='previous' className='previous'>Previous</button></div>
            <div><h3>Brand Styles</h3></div>
            <div><button onClick={this.handleNav} name='next' className='next'>Next</button></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress percent={Math.floor((this.state.progressBar/15) * 100)} progress />
        {state.renderChangeError === true ? (
          <Portal open={state.portal} className='portal'>
            <Segment style={{ left: '35%', position: 'fixed', top: '50%', zIndex: 1000}}>
              <p>Please Save or Cancel your selected answers before proceeding</p>
              <HashLink to={state.currentEditing}><button onClick={this.handlePortal}>Go</button></HashLink>
            </Segment>
          </Portal>
        ) : ''}
        <form className='brand-form'>
          {isEditing === 'men' ? (
            <div className='editing' id='men'>
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
              {this.renderStyles('older-women', '#plus')}
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell clothes for older-women?</h4>
              {this.renderAnswers('older-women')}
              <p className='small-divider'></p>
            </div>
          )}

          {isEditing === 'plus' ? (
            <div className='editing' id='plus'>
              <h4>Does the Brand sell Plus size clothes?</h4>
              <Form.Field inline>
                <Radio
                  label='Yes'
                  checked={state.plus === 'plus' ? true : false}
                  name='plus'
                  onClick={this.handleRadio}
                  value='plus'
                />
              </Form.Field>
              <Form.Field inline>
                <Radio
                  label='No'
                  checked={state.plus === 'no-plus' ? true : false}
                  name='plus'
                  onClick={this.handleRadio}
                  value='no-plus'
                />
              </Form.Field>
              <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button name='plus' onClick={this.handleSaveRadio}>Save</button></div>
                <div><HashLink to='#maternity'><button name='plus' value='next' onClick={this.handleSaveRadio}>Save & Next</button></HashLink></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell Plus size clothes?</h4>
              {state.plus ? <p>{state.plus === 'plus' ? 'Yes' : 'No'}</p> : ''}
              <div className='button-container'>
                <div></div>
                <div><button name='plus' onClick={this.handleEdit}>Edit</button></div>
              </div>
              <p className='small-divider'></p>
            </div>
          )}

          {isEditing === 'maternity' ? (
            <div className='editing' id='maternity'>
              <h4>Does the Brand sell Maternity clothes?</h4>
              <Form.Field inline>
                <Radio
                  label='Yes'
                  checked={state.maternity === 'maternity' ? true : false}
                  name='maternity'
                  onClick={this.handleRadio}
                  value='maternity'
                />
              </Form.Field>
              <Form.Field inline>
                <Radio
                  label='No'
                  checked={state.maternity === 'no-maternity' ? true : false}
                  name='maternity'
                  onClick={this.handleRadio}
                  value='no-maternity'
                />
              </Form.Field>
              <p className='error-message'>{state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button name='maternity' onClick={this.handleSaveRadio}>Save</button></div>
                <div><HashLink to='#young-women'><button name='maternity' value='next' onClick={this.handleSaveRadio}>Save & Next</button></HashLink></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>Does the Brand sell Maternity clothes?</h4>
              {state.maternity ? <p>{state.maternity === 'maternity' ? 'Yes' : 'No'}</p> : ''}
              <div className='button-container'>
                <div></div>
                <div><button name='maternity' onClick={this.handleEdit}>Edit</button></div>
              </div>
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
