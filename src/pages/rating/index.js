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
    const { id } = this.props.match.params
    let theme = this.props.match.path.slice(1, -4)
    this.setState({loading: true, brandId: id})
    this.props.fetchAllRating(theme, id)
    this.props.fetchRating(id, theme)
    this.props.fetchRatingScore(id)
    if(theme === 'env-standards-compliance') {
      this.setState({title: 'Environment/Standards Compliance', prevPage: `/suppDataAlias/${id}`, nextPage: `/env-resource/${id}`})
    }
    if(theme === 'env-resource') {
      this.setState({title: 'Environment/Resource', prevPage: `/env-standards-compliance/${id}`, nextPage: `/env-climate-change/${id}`})
    }
    if(theme === 'env-climate-change') {
      this.setState({title: 'Environment/Climate Change', prevPage: `/env-resource/${id}`, nextPage: `/env-chemicals/${id}`})
    }
    if(theme === 'env-chemicals') {
      this.setState({title: 'Environment/Chemicals', prevPage: `/env-climate-change/${id}`, nextPage: `/env-water/${id}`})
    }
    if(theme === 'env-water') {
      this.setState({title: 'Environment/Water', prevPage: `/env-chemicals/${id}`, nextPage: `/env-positive-citizenship/${id}`})
    }
    if(theme === 'env-positive-citizenship') {
      this.setState({title: 'Environment/Positive Citizenship', revPage: `/env-water/${id}`, nextPage: `/env-negative-citizenship/${id}`})
    }
    if(theme === 'env-negative-citizenship') {
      this.setState({title: 'Environment/Negative Citizenship', prevPage: `/env-positive-citizenship/${id}`, nextPage: `/labour-ethical-fashion-report/${id}`})
    }
    if(theme === 'labour-ethical-fashion-report') {
      this.setState({title: 'Labour/Ethical Fashion Report', prevPage: `/env-negative-citizenship/${id}`, nextPage: `/labour-certification/${id}`})
    }
    if(theme === 'labour-certification') {
      this.setState({title: 'Labour/Certification', prevPage: `/labour-ethical-fashion-report/${id}`, nextPage: `/labour-policies-worker-empowerment/${id}`})
    }
    if(theme === 'labour-policies-worker-empowerment') {
      this.setState({title: 'Labour/Policies and Worker Empowerment', prevPage: `/labour-certification/${id}`, nextPage: `/labour-supply-chain/${id}`})
    }
    if(theme === 'labour-supply-chain') {
      this.setState({title: 'Labour/Supply Chain', prevPage: `/labour-policies-worker-empowerment/${id}`, nextPage: `/labour-low-risk-production/${id}`})
    }
    if(theme === 'labour-low-risk-production') {
      this.setState({title: 'Labour/Low Risk Production', prevPage: `/labour-supply-chain/${id}`, nextPage: `/labour-living-wage/${id}`})
    }
    if(theme === 'labour-living-wage') {
      this.setState({title: 'Labour/Living Wage', prevPage: `/labour-low-risk-production/${id}`, nextPage: `/labour-knowing-suppliers/${id}`})
    }
    if(theme === 'labour-knowing-suppliers') {
      this.setState({title: 'Labour/Knowing Suppliers', prevPage: `/labour-living-wage/${id}`, nextPage: `/labour-supplier-relationships-auditing/${id}`})
    }
    if(theme === 'labour-supplier-relationships-auditing') {
      this.setState({title: 'Labour/Supplier Relationships & Auditing', prevPage: `/labour-knowing-suppliers/${id}`, nextPage: `/labour-positive-citizenship/${id}`})
    }
    if(theme === 'labour-positive-citizenship') {
      this.setState({title: 'Labour/Positive Citizenship', prevPage: `/labour-supplier-relationships-auditing/${id}`, nextPage: `/labour-negative-citizenship/${id}`})
    }
    if(theme === 'labour-negative-citizenship') {
      this.setState({title: 'Labour/Negative Citizenship', prevPage: `/labour-positivie-citizenship/${id}`, nextPage: `/animal-animal-products/${id}`})
    }
    if(theme === 'animal-animal-products') {
      this.setState({title: 'Animal/Products', prevPage: `/labour-negative-citizenship/${id}`, nextPage: `/animal-positive-citizenship/${id}`})
    }
    if(theme === 'animal-positive-citizenship') {
      this.setState({title: 'Animal/Positive Citizenship', prevPage: `/animal-animal-products/${id}`, nextPage: `/animal-negative-citizenship/${id}`})
    }
    if(theme === 'animal-negative-citizenship') {
      this.setState({title: 'Animal/Negative Citizenship', prevPage: `/animal-positive-citizenship/${id}`, nextPage: `/brandCauses/${id}`})
    }
  }

  componentWillReceiveProps(nextProps) {
    const { id } = this.props.match.params
    if(nextProps.qa !== this.props.qa) {
      _.map(nextProps.qa, rate => {
        this.setState({
          [`answer${rate.answer}`]: rate.is_selected,
          [`originalAnswer${rate.answer}`]: rate.is_selected,
          [`props${rate.answer}`]: rate.answer,
          [`show${rate.answer}`]: rate.is_selected,
          [`originalShow${rate.answer}`]: rate.is_selected,
          [`url${rate.answer}`]: rate.url,
          [`originalUrl${rate.answer}`]: rate.url,
          [`comment${rate.answer}`]: rate.comment,
          [`originalComment${rate.answer}`]: rate.comment,
        })
      })
      nextProps.qa.map(check => {
        this.state.ratingValues.push({id: check.answer, url: check.url, comment: check.comment, is_selected: check.is_selected})
        this.state.originalRatingValues.push({id: check.answer, url: check.url, comment: check.comment, is_selected: check.is_selected})
      })
      this.setState({
        // ratingValues: _.map(nextProps.qa, check => {
        //   return {id: check.answer, url: check.url, comment: check.comment, is_selected: check.is_selected}
        // }),
        // originalRatingValues: _.map(nextProps.qa, check => {
        //   return {id: check.answer, url: check.url, comment: check.comment, is_selected: check.is_selected}
        // }),
        loading: false,
      })
    }
  }

  //toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    let num = parseInt(event.target.name)
    // this.saveNext()
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
    _.map(this.state.ratingValues, val => {
      this.setState({
        [`answer${val.id}`]: this.state[`originalAnswer${val.id}`],
        [`url${val.id}`]: this.state[`originalUrl${val.id}`],
        [`comment${val.id}`]: this.state[`originalComment${val.id}`],
        [`show${val.id}`]: this.state[`originalShow${val.id}`],
      })
    })
    this.setState({renderChangeError: false, changeError: false, isEditing: null, ratingValues: this.state.originalRatingValues})
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
    _.map(this.state.ratingValues, val => {
      if(val.id === parseInt(name)) {
        console.log('url', val.id, name)
        Object.assign(val, {url: value})
        this.setState({[`url${val.id}`]: value})
      }
    })
    this.setState({changeError: true})
    this.handleValidUrl(value, name)
  }

  handleCheckbox(event, { value }) {
    const { id }  = this.props.match.params
    if(this.state[`answer${value}`] === true) {
      console.log('remove')
      new Promise((resolve, reject) => {
        resolve(this.setState({
          [`answer${value}`]: false,
          [`show${value}`]: false,
          ratingValues: this.state.ratingValues.filter(rate => {return rate.id !== parseInt(value)}),
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
        resolve(this.setState({
          [`show${value}`]: true,
          [`answer${value}`]: true,
        })
        )})
        .then(() => this.state.ratingValues.push({id: parseInt(value), is_selected: true, url: this.state[`url${value}`] ? this.state[`url${value}`] : ''}))
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
    const { id }  = this.props.match.params
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
      this.props.createRating({question: event.target.name, brand: id, answers: this.state.ratingValues})
      _.map(this.state.ratingValues, val => {
        this.setState({
          [`originalAnswer${val.id}`]: this.state[`answer${val.id}`],
          [`originalUrl${val.id}`]: this.state[`url${val.id}`],
          [`originalComment${val.id}`]: this.state[`comment${val.id}`],
          [`originalShow${val.id}`]: this.state[`show${val.id}`],
        })
      })
      this.setState({
        changeError: false,
        renderChangeError: false,
        originalRatingValues: this.state.ratingValues,
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
    const id  = this.props.match.params.id
    let theme = this.props.match.path.slice(1, -4)
    if(this.state.loading === true) {
      return(<Loader active inline='centered' />)
    } else {
      return _.map(this.props.pre_qa, theme => {
        let lastQuestion = theme.questions[theme.questions.length -1]
        return _.map(theme.questions, type => {
          if(this.state.isEditing === type.order) {
            return(
              <div className='editing'>
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
    const { id }  = this.props.match.params
    if(this.state.changeError === true) {
      this.setState({renderChangeError: true, portal: true})
    } else {
      if(event.target.name === 'previous') {
        this.props.history.push(this.state.prevPage)
      } else if(event.target.name === 'next') {
        this.props.history.push(this.state.nextPage)
      } else if(event.target.name === 'landing') {
        this.props.history.push(`/brandLanding/${id}`)
      }
    }
  }

  render() {
    console.log('pre qa props', this.props.pre_qa)
    console.log('rating', this.props.qa)
    console.log('state', this.state.ratingValues)
    console.log('answer', this.state)
    const isEditing = this.state.isEditing
    const { id }  = this.props.match.params
    const state = this.state
    return(
      <div className='form-container'>
        <RatingHeading id={id} brand={this.props.brand}/>
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
