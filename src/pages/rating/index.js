import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { connect } from 'react-redux'
import { Form, Input, Checkbox, TextArea, Progress, Portal, Segment, Loader} from 'semantic-ui-react'
import { fetchAllRating, fetchRating, createRating, updateRating, fetchRatingScore } from '../../actions/rating'
import { RatingHeading } from '../../components'
import _ from 'lodash'

import './rating.css'

class Rating extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      ratingValues: [],
      originalRatingValues: [],
      errorsWebsite: [],
      errors: [],
      changeError: false,
      renderChangeError: false,
      nextPage: '',
    }

    this.brandId = this.props.match.params.id

    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleUrl = this.handleUrl.bind(this)
    this.handleComment = this.handleComment.bind(this)
    this.handlePortal = this.handlePortal.bind(this)
    this.handleNav = this.handleNav.bind(this)
  }
  componentWillMount() {
    let theme = this.props.match.path.slice(1, -4)
    // for(let i = 0; i <= 100; i++) {
    //   this.setState({[`ratingValues${i}`]: []})
    // }
    this.setState({isLoading: true, brandId: this.brandId})
    this.props.fetchAllRating(theme, this.brandId)
    this.props.fetchRating(this.brandId, theme)
    this.props.fetchRatingScore(this.brandId)
    if(theme === 'env-standards-compliance') {
      this.setState({title: 'Environment/Standards Compliance', prevPage: `/suppDataAlias/${this.brandId}`, nextPage: `/env-resource/${this.brandId}`})
    }
    if(theme === 'env-resource') {
      this.setState({title: 'Environment/Resource', prevPage: `/env-standards-compliance/${this.brandId}`, nextPage: `/env-climate-change/${this.brandId}`})
    }
    if(theme === 'env-climate-change') {
      this.setState({title: 'Environment/Climate Change', prevPage: `/env-resource/${this.brandId}`, nextPage: `/env-chemicals/${this.brandId}`})
    }
    if(theme === 'env-chemicals') {
      this.setState({title: 'Environment/Chemicals', prevPage: `/env-climate-change/${this.brandId}`, nextPage: `/env-water/${this.brandId}`})
    }
    if(theme === 'env-water') {
      this.setState({title: 'Environment/Water', prevPage: `/env-chemicals/${this.brandId}`, nextPage: `/env-positive-citizenship/${this.brandId}`})
    }
    if(theme === 'env-positive-citizenship') {
      this.setState({title: 'Environment/Positive Citizenship', prevPage: `/env-water/${this.brandId}`, nextPage: `/env-negative-citizenship/${this.brandId}`})
    }
    if(theme === 'env-negative-citizenship') {
      this.setState({title: 'Environment/Negative Citizenship', prevPage: `/env-positive-citizenship/${this.brandId}`, nextPage: `/labour-ethical-fashion-report/${this.brandId}`})
    }
    if(theme === 'labour-ethical-fashion-report') {
      this.setState({title: 'Labour/Ethical Fashion Report', prevPage: `/env-negative-citizenship/${this.brandId}`, nextPage: `/labour-certification/${this.brandId}`})
    }
    if(theme === 'labour-certification') {
      this.setState({title: 'Labour/Certification', prevPage: `/labour-ethical-fashion-report/${this.brandId}`, nextPage: `/labour-policies-worker-empowerment/${this.brandId}`})
    }
    if(theme === 'labour-policies-worker-empowerment') {
      this.setState({title: 'Labour/Policies and Worker Empowerment', prevPage: `/labour-certification/${this.brandId}`, nextPage: `/labour-supply-chain/${this.brandId}`})
    }
    if(theme === 'labour-supply-chain') {
      this.setState({title: 'Labour/Supply Chain', prevPage: `/labour-policies-worker-empowerment/${this.brandId}`, nextPage: `/labour-low-risk-production/${this.brandId}`})
    }
    if(theme === 'labour-low-risk-production') {
      this.setState({title: 'Labour/Low Risk Production', prevPage: `/labour-supply-chain/${this.brandId}`, nextPage: `/labour-living-wage/${this.brandId}`})
    }
    if(theme === 'labour-living-wage') {
      this.setState({title: 'Labour/Living Wage', prevPage: `/labour-low-risk-production/${this.brandId}`, nextPage: `/labour-knowing-suppliers/${this.brandId}`})
    }
    if(theme === 'labour-knowing-suppliers') {
      this.setState({title: 'Labour/Knowing Suppliers', prevPage: `/labour-living-wage/${this.brandId}`, nextPage: `/labour-supplier-relationships-auditing/${this.brandId}`})
    }
    if(theme === 'labour-supplier-relationships-auditing') {
      this.setState({title: 'Labour/Supplier Relationships & Auditing', prevPage: `/labour-knowing-suppliers/${this.brandId}`, nextPage: `/labour-positive-citizenship/${this.brandId}`})
    }
    if(theme === 'labour-positive-citizenship') {
      this.setState({title: 'Labour/Positive Citizenship', prevPage: `/labour-supplier-relationships-auditing/${this.brandId}`, nextPage: `/labour-negative-citizenship/${this.brandId}`})
    }
    if(theme === 'labour-negative-citizenship') {
      this.setState({title: 'Labour/Negative Citizenship', prevPage: `/labour-positivie-citizenship/${this.brandId}`, nextPage: `/animal-animal-products/${this.brandId}`})
    }
    if(theme === 'animal-animal-products') {
      this.setState({title: 'Animal/Products', prevPage: `/labour-negative-citizenship/${this.brandId}`, nextPage: `/animal-positive-citizenship/${this.brandId}`})
    }
    if(theme === 'animal-positive-citizenship') {
      this.setState({title: 'Animal/Positive Citizenship', prevPage: `/animal-animal-products/${this.brandId}`, nextPage: `/animal-negative-citizenship/${this.brandId}`})
    }
    if(theme === 'animal-negative-citizenship') {
      this.setState({title: 'Animal/Negative Citizenship', prevPage: `/animal-positive-citizenship/${this.brandId}`, nextPage: `/brandCauses/${this.brandId}`})
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.pre_qa !== this.props.pre_qa) {
      _.map(nextProps.pre_qa, check => {
        check.questions.map(rate => {
          // this.setState({[`ratingValues${rate.id}`]: []})
        })
      })
    }
    if(nextProps.qa !== this.props.qa) {
      _.map(nextProps.qa, rate => {
        new Promise((resolve, reject) => {
          resolve(
            this.setState({
              [`answer${rate.answer}`]: rate.is_selected,
              [`props${rate.answer}`]: rate.answer,
              [`show${rate.answer}`]: rate.is_selected,
              [`url${rate.answer}`]: rate.url,
              [`comment${rate.answer}`]: rate.comment,
              [`ratingValues${rate.ratings_answer.question}`]: [],
            })
          )})
          .then(() => {
            this.state[`ratingValues${rate.ratings_answer.question}`].push({id: rate.answer, url: rate.url, comment: rate.comment, is_selected: rate.is_selected})
          })
      })
      this.setState({isLoading: false})
    }
  }

  //toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    let num = parseInt(event.target.name)
    this.setState({currentEditing: `#${event.target.value}`, ratingValues: this.state.ratingValues.filter(rate => {
      if(rate.is_selected === true) {
        return rate.id !== this.state.ratingValues.id
      }
    }),
    })
    if(this.state.changeError === false) {
      this.setState({
        isEditing: parseInt(event.target.name),
        nextQuestion: num += 1,
      })
    } else {
      this.setState({renderChangeError: true, portal: true})
    }
  }

  //sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    event.preventDefault()
    _.map(this.state.ratingValues, rate => {
      this.setState({
        [`answer${rate.id}`]: null,
        [`props${rate.id}`]: null,
        [`show${rate.id}`]: null,
        [`url${rate.id}`]: null,
        [`comment${rate.id}`]: null,
        [`errorWebsite${rate.id}`]: null,
      })
    })
    let theme = this.props.match.path.slice(1, -4)
    this.setState({renderChangeError: false, isLoading: true, changeError: false, isEditing: null, ratingValues: []})
    this.props.fetchRating(this.brandId, theme)
  }

  handleComment(event) {
    _.map(this.state.ratingValues, val => {
      if(val.id === parseInt(event.target.name)) {
        Object.assign(val, {comment: event.target.value})
        this.setState({[`comment${val.id}`]: event.target.value})
      }
    })
    this.setState({changeError: true})
  }

  handleUrl(event, { value, name }) {
    _.map(this.state[`ratingValues${event.target.id}`], val => {
      if(val.id === parseInt(name)) {
        Object.assign(val, {url: value})
        this.setState({[`url${val.id}`]: value})
      }
    })
    console.log('url', event.target.id)
    this.setState({changeError: true})
    this.handleValidUrl(value, name)
  }

  handleCheckbox(event, { value, name }) {
    if(this.state[`answer${value}`] === true) {
      new Promise((resolve, reject) => {
        resolve(
          this.setState({
            [`answer${value}`]: false,
            [`show${value}`]: false,
            [`ratingValues${name}`]: this.state[`ratingValues${name}`].filter(rate => {return rate.id !== parseInt(value)}),
          })
        )})
        // .then(() => this.state.ratingValues.filter(rate => {return rate.id !== parseInt(value)}))
        .then(() => this.handleSaveValidation(value))
    // } else if(this.state[`answer${value}`] === false && this.state[`props${value}`] === parseInt(value)) {
    //   console.log('something')
    //   this.setState({[`show${value}`]: true, [`answer${value}`]: true})
    } else {
      new Promise((resolve, reject) => {
        console.log('add')
        resolve(
          this.setState({
            [`show${value}`]: true,
            [`answer${value}`]: true,
          })
        )})
        .then(() => {
          if(!this.state[`ratingValues${name}`]) {
            this.setState({[`ratingValues${name}`]: []})
          }
        })
        .then(() => this.state[`ratingValues${name}`].push({id: parseInt(value), is_selected: true, url: this.state[`url${value}`] ? this.state[`url${value}`] : ''}))
        .then(() => this.handleSaveValidation(value))
    }
    this.setState({changeError: true})
  }

  handleSaveValidation(value) {
    if(this.state[`answer${value}`] === true) {
      if(!this.state[`url${value}`]) {
        this.setState({errorsWebsite: [...this.state.errorsWebsite, parseInt(value)]})
      } else {
        this.setState({errorsWebsite: this.state.errorsWebsite.filter(rate => {return rate !== parseInt(value)}), [`errorWebsite${value}`]: false})
      }
    } else if(this.state[`answer${value}`] === false){
      this.setState({
        errorsWebsite: this.state.errorsWebsite.filter(rate => {return rate !== parseInt(value)}),
        [`errorWebsite${value}`]: false,
      })
    }
  }

  handleValidUrl(value, name) {
    let url = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/
    if(value === '') {
      this.setState({
        [`errorWebsite${name}`]: true,
        errorsWebsite: [...this.state.errorsWebsite, parseInt(name)],
      })
    } else {
      this.setState({
        [`errorWebsite${name}`]: false,
        errorsWebsite: this.state.errorsWebsite.filter(rate => {return rate !== parseInt(name)}),
      })
    }
    if(url.test(value)){
      this.setState({
        [`errorWebsite${name}`]: false,
        errorsWebsite: this.state.errorsWebsite.filter(rate => {return rate !== parseInt(name)}),
      })
    } else {
      this.setState({
        [`errorWebsite${name}`]: true,
        errorsWebsite: [...this.state.errorsWebsite, parseInt(name)],
      })
    }
  }

  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    if(this.state.errorsWebsite.length <= 0) {
      if(event.target.value === 'next') {
        this.state.isEditing++
        this.state.nextQuestion++
      } else if(event.target.value === 'nextPage') {
        this.setState({loading: true})
        this.props.history.push(this.state.nextPage)
      } else {
        this.setState({isEditing: null})
      }
      this.props.createRating({question: event.target.name, brand: this.brandId, answers: this.state[`ratingValues${event.target.name}`]})
      this.setState({
        changeError: false,
        renderChangeError: false,
      })
    } else {
      _.map(this.state.errorsWebsite, check => {
        this.setState({[`errorWebsite${check}`]: true})
      })
    }
  }

  handleLoading() {
    this.setState({loading: true})
  }

  renderQA() {
    let theme = this.props.match.path.slice(1, -4)
    if(this.state.isLoading === true) {
      return(<Loader active inline='centered' />)
    } else {
      return _.map(this.props.pre_qa, theme => {
        let lastQuestion = theme.questions[theme.questions.length -1]
        return _.map(theme.questions, type => {
          if(this.state.isEditing === type.order) {
            return(
              <div key={type.id} className='editing'>
                <div key={type.id} id={`${type.order}`}>
                  <h5>{type.text} {type.is_mandatory === true ? '*' : ''}</h5>
                </div>
                {_.map(type.answers, ans => {
                  if(this.state)
                    return (
                      <div key={ans.id}>
                        <Form.Field>
                          <Checkbox
                            label={ans.text}
                            value={ans.id}
                            name={type.id}
                            onChange={this.handleCheckbox}
                            checked={this.state[`answer${ans.id}`] === true ? true : false}
                          />
                        </Form.Field>
                        {this.state[`show${ans.id}`] === true ? (
                          <div className='evidence'>
                            <h5>Evidence</h5>
                            <div className='error-message'>{this.state[`errorWebsite${ans.id}`] === true ? 'Please enter valid website' : ''}</div>
                            <Form.Field className={this.state[`errorWebsite${ans.id}`] === true ? 'ui error input evidence-url' : 'ui input evidence-url'} inline>
                              <Input
                                id={type.id}
                                label='Source URL'
                                onChange={this.handleUrl}
                                autoFocus={true}
                                name={ans.id}
                                value={this.state[`url${ans.id}`] ? this.state[`url${ans.id}`] : ''}
                              />
                            </Form.Field>
                            <Form.Field className='evidence-comments' inline>
                              <TextArea
                                autoHeight
                                rows={4}
                                label='Comments'
                                placeholder='Comments'
                                onChange={this.handleComment}
                                name={ans.id}
                                value={this.state[`comment${ans.id}`] ? this.state[`comment${ans.id}`] : ''}
                              />
                            </Form.Field>
                          </div>) : ('')}
                      </div>
                    )}
                )}
                <p id={theme.name} className='error-message'>{this.state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
                <div className='button-container'>
                  <div><button className='cancel' onClick={this.handleCancel} name={type.id}>Cancel</button></div>
                  <div><button onClick={this.handleSave} name={type.id}>Save</button></div>
                  {lastQuestion.id === type.id ? (
                    <div><button onClick={this.handleSave} name={type.id} value='nextPage'>Save & Next Page</button></div>
                  ) : (
                    <div><HashLink to={`#${this.state.nextQuestion}`}><button onClick={this.handleSave} name={type.id} value='next'>Save & Next</button></HashLink></div>
                  )}
                </div>
                {_.map(type.answers, ans => {
                  return (<div key={ans.id} className='error-message'>{this.state[`errorWebsite${ans.id}`] === true ? 'Please fill out all required fields' : ''}</div>)
                })}
              </div>) } else {
            return(
              <div className='not-editing'>
                <h5>{type.text} {type.is_mandatory === true ? '*' : ''}</h5>
                {_.map(type.answers, ans => {
                  return (this.state[`answer${ans.id}`] === true ? (<p key={ans.id}>{ans.text}</p>) : (''))
                })}
                <div className='button-container'>
                  <div></div>
                  <div><button name={type.order} value={theme.name} onClick={this.handleEdit}>Edit</button></div>
                </div>
                <p className='small-divider'></p>
              </div>
            )}
        })
      })
    }
  }

  handlePortal() {
    this.setState({portal: false})
  }

  handleNav(event) {
    if(this.state.changeError === true) {
      this.setState({renderChangeError: true, portal: true})
    } else {
      if(event.target.name === 'previous') {
        this.props.history.push(this.state.prevPage)
      } else if(event.target.name === 'next') {
        this.props.history.push(this.state.nextPage)
      } else if(event.target.name === 'landing') {
        this.props.history.push(`/brandLanding/${this.brandId}`)
      }
    }
  }

  render() {
    let theme = this.props.match.path.slice(1, -4)
    console.log(theme)
    console.log('props', this.props.qa)
    console.log('pre props', this.props.pre_qa)
    console.log('state', this.state)
    const isEditing = this.state.isEditing
    const state = this.state
    return(
      <div className='form-container'>
        <RatingHeading id={this.brandId} brand={this.props.brand}/>
        <div className='forms-header'><button onClick={this.handleNav} name='landing'>Back to Summary</button></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><button onClick={this.handleNav} name='previous' className='previous'>Previous</button></div>
            <div><h3>{state.title}</h3></div>
            <div><button onClick={this.handleNav} name='next' className='next'>Next</button></div>
          </span>
        </div>
        {state.renderChangeError === true ? (
          <Portal open={state.portal} className='portal'>
            <Segment style={{ left: '35%', position: 'fixed', top: '50%', zIndex: 1000}}>
              <p>Please Save or Cancel your selected answers before proceeding</p>
              <HashLink to={state.currentEditing}><button onClick={this.handlePortal}>Ok</button></HashLink>
            </Segment>
          </Portal>
        ) : ''}
        <form className='brand-form'>
          {this.renderQA()}
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    qa: state.qa,
    pre_qa: state.preQa,
    brand: state.brandInfo,
    rating: state.ratingScore,
  }
}

export default connect(mapStateToProps, { fetchAllRating, fetchRating, createRating, updateRating, fetchRatingScore })(Rating)
