import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { connect } from 'react-redux'
import { Form, Input, Checkbox, TextArea, Progress, Portal, Segment} from 'semantic-ui-react'
import { fetchAllRating, fetchRating, createRating, updateRating, fetchRatingScore } from '../../actions/rating'
import { RatingHeading } from '../../components'
import {
  EnvStandards,
  EnvResource,
  EnvClimate,
  EnvChemicals,
  EnvWater,
  EnvPositiveCitizen,
  EnvNegativeCitizen,
  LabourEthicalFashion,
  LabourCertification,
  LabourPolicies,
  LabourSupplyChain,
  LabourProduction,
  LabourWage,
  LabourSuppliers,
  LabourSupplierAudit,
  LabourPositiveCitizen,
  LabourNegativeCitizen,
  AnimalProducts,
  AnimalPositiveCitizen,
  AnimalNegativeCitizen,
} from '../../components'
import _ from 'lodash'

import './rating.css'

class Rating extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      ratingValues: [{}],
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
  }
  componentWillMount() {
    const { id } = this.props.match.params
    let theme = this.props.match.path.slice(1, -4)
    this.props.fetchAllRating(theme, id)
    this.props.fetchRating(id, theme)
    this.props.fetchRatingScore(id)
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
      this.setState({ratingValues: _.map(nextProps.qa, check => {
        return {id: check.answer, url: check.url, comment: check.comment, is_selected: check.is_selected}
      }),
      })
      this.setState({originalRatingValues: _.map(nextProps.qa, check => {
        return {id: check.answer, url: check.url, comment: check.comment, is_selected: check.is_selected}
      }),
      })
    }
  }

  //toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    let num = parseInt(event.target.name)
    this.saveNext()
    this.setState({ratingValues: this.state.ratingValues.filter(rate => {
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
      this.setState({renderChangeError: true})
      alert(`Please click Save on previously edited question to save your selected answers or cancel to disregard your selections`)
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

  handleUrl(event) {
    _.map(this.state.ratingValues, val => {
      if(val.id === parseInt(event.target.name)) {
        Object.assign(val, {url: event.target.value})
        this.setState({[`url${val.id}`]: event.target.value})
      }
    })
    this.setState({changeError: true})
    this.handleValidUrl(event)
  }

  handleCheckbox(event, { value }) {
    event.persist()
    const { id }  = this.props.match.params
    if(this.state[`answer${value}`] === true) {
      new Promise((resolve, reject) => {
        resolve(this.setState({
          [`answer${value}`]: false,
          ratingValues: this.state.ratingValues.filter(rate => {return rate.id !== parseInt(value)}),
          [`show${value}`]: false,
        }))
      }).then(() => this.handleSaveValidation(value))
    } else if(this.state[`answer${value}`] === false && this.state[`props${value}`] === parseInt(value)) {
      this.setState({[`show${value}`]: true, [`answer${value}`]: true})
    } else {
      new Promise((resolve, reject) => {
        resolve(this.setState({
          [`show${value}`]: true,
          [`answer${value}`]: true,
          ratingValues: [...this.state.ratingValues, {id: parseInt(value), is_selected: true}],
        }))
      }).then(() => this.handleSaveValidation(value))
    }
    this.setState({changeError: true})
  }

  saveNext() {
    const id  = this.props.match.params.id
    let theme = this.props.match.path.slice(1, -4)
    if(theme === 'env-standards-compliance') {
      this.setState({nextPage: `/env-resource/${id}`})
    }
    if(theme === 'env-resource') {
      this.setState({nextPage: `/env-climate-change/${id}`})
    }
    if(theme === 'env-climate-change') {
      this.setState({nextPage: `/env-chemicals/${id}`})
    }
    if(theme === 'env-chemicals') {
      this.setState({nextPage: `/env-water/${id}`})
    }
    if(theme === 'env-water') {
      this.setState({nextPage: `/env-positive-citizenship/${id}`})
    }
    if(theme === 'env-positive-citizenship') {
      this.setState({nextPage: `/env-negative-citizenship/${id}`})
    }
    if(theme === 'env-negative-citizenship') {
      this.setState({nextPage: `/labour-ethical-fashion-report/${id}`})
    }
    if(theme === 'labour-ethical-fashion-report') {
      this.setState({nextPage: `/labour-certification/${id}`})
    }
    if(theme === 'labour-certification') {
      this.setState({nextPage: `/labour-policies-worker-empowerment/${id}`})
    }
    if(theme === 'labour-policies-worker-empowerment') {
      this.setState({nextPage: `/labour-supply-chain/${id}`})
    }
    if(theme === 'labour-supply-chain') {
      this.setState({nextPage: `/labour-low-risk-production/${id}`})
    }
    if(theme === 'labour-low-risk-production') {
      this.setState({nextPage: `/labour-living-wage/${id}`})
    }
    if(theme === 'labour-living-wage') {
      this.setState({nextPage: `/labour-knowing-suppliers/${id}`})
    }
    if(theme === 'labour-knowing-suppliers') {
      this.setState({nextPage: `/labour-supplier-relationships-auditing/${id}`})
    }
    if(theme === 'labour-supplier-relationships-auditing') {
      this.setState({nextPage: `/labour-positive-citizenship/${id}`})
    }
    if(theme === 'labour-positive-citizenship') {
      this.setState({nextPage: `/labour-negative-citizenship/${id}`})
    }
    if(theme === 'labour-negative-citizenship') {
      this.setState({nextPage: `/animal-animal-products/${id}`})
    }
    if(theme === 'animal-animal-products') {
      this.setState({nextPage: `/animal-positive-citizenship/${id}`})
    }
    if(theme === 'animal-positive-citizenship') {
      this.setState({nextPage: `/animal-negative-citizenship/${id}`})
    }
    if(theme === 'animal-negative-citizenship') {
      this.setState({nextPage: `/brandCauses/${id}`})
    }
  }

  renderHeader() {
    const id  = this.props.match.params.id
    let theme = this.props.match.path.slice(1, -4)
    if(theme === 'env-standards-compliance') {
      return(<EnvStandards id={id} />)
    }
    if(theme === 'env-resource') {
      return(<EnvResource id={id} />)
    }
    if(theme === 'env-climate-change') {
      return(<EnvClimate id={id} />)
    }
    if(theme === 'env-chemicals') {
      return(<EnvChemicals id={id} />)
    }
    if(theme === 'env-water') {
      return(<EnvWater id={id} />)
    }
    if(theme === 'env-positive-citizenship') {
      return(<EnvPositiveCitizen id={id} />)
    }
    if(theme === 'env-negative-citizenship') {
      return(<EnvNegativeCitizen id={id} />)
    }
    if(theme === 'labour-ethical-fashion-report') {
      return(<LabourEthicalFashion id={id} />)
    }
    if(theme === 'labour-certification') {
      return(<LabourCertification id={id} />)
    }
    if(theme === 'labour-policies-worker-empowerment') {
      return(<LabourPolicies id={id} />)
    }
    if(theme === 'labour-supply-chain') {
      return(<LabourSupplyChain id={id} />)
    }
    if(theme === 'labour-low-risk-production') {
      return(<LabourProduction id={id} />)
    }
    if(theme === 'labour-living-wage') {
      return(<LabourWage id={id} />)
    }
    if(theme === 'labour-knowing-suppliers') {
      return(<LabourSuppliers id={id} />)
    }
    if(theme === 'labour-supplier-relationships-auditing') {
      return(<LabourSupplierAudit id={id} />)
    }
    if(theme === 'labour-positive-citizenship') {
      return(<LabourPositiveCitizen id={id} />)
    }
    if(theme === 'labour-negative-citizenship') {
      return(<LabourNegativeCitizen id={id} />)
    }
    if(theme === 'animal-animal-products') {
      return(<AnimalProducts id={id} />)
    }
    if(theme === 'animal-positive-citizenship') {
      return(<AnimalPositiveCitizen id={id} />)
    }
    if(theme === 'animal-negative-citizenship') {
      return(<AnimalNegativeCitizen id={id} />)
    }
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

  handleValidUrl(e) {
    if(e.target.value === '') {
      this.setState({
        [`errorWebsite${e.target.name}`]: true,
        errorsWebsite: [...this.state.errorsWebsite, parseInt(e.target.name)],
      })
    } else {
      this.setState({
        [`errorWebsite${e.target.name}`]: false,
        errorsWebsite: this.state.errorsWebsite.filter(rate => {return rate !== parseInt(e.target.name)}),
      })
    }
    if((/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e.target.value) && e.target.value !== '') || (/^(www\.)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/.test(e.target.value) && e.target.value !== '')){
      this.setState({
        [`errorWebsite${e.target.name}`]: false,
        errorsWebsite: this.state.errorsWebsite.filter(rate => {return rate !== parseInt(e.target.name)}),
      })
    } else {
      this.setState({
        [`errorWebsite${e.target.name}`]: true,
        errorsWebsite: [...this.state.errorsWebsite, parseInt(e.target.name)],
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

  renderQA() {
    const id  = this.props.match.params.id
    let theme = this.props.match.path.slice(1, -4)
    if(!this.props.rating.size && theme === 'env-climate-change') {
      return(
        <Portal open={true} className='portal'>
          <Segment style={{ left: '35%', position: 'fixed', top: '50%', zIndex: 1000}}>
            <p>This question requires a brand size</p>
            <p>Please answer the brand size question in General to continue this rating section</p>
            <Link to={`/brandGeneral/${id}`}><button>Brand General</button></Link>
          </Segment>
        </Portal>
      )
    } else {
      return _.map(this.props.pre_qa, theme => {
        let lastQuestion = theme.questions[theme.questions.length -1]
        return _.map(theme.questions, type => {
          if(this.state.isEditing === type.order) {
            return(
              <div className='editing'>
                <div key={type.id} id={`${type.order}`}>
                  <h5>{type.text}</h5>
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
                                name={ans.id}
                                value={this.state[`url${ans.id}`]}
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
                                value={this.state[`comment${ans.id}`]}
                              />
                            </Form.Field>
                          </div>) : ('')}
                      </div>
                    )}
                )}
                <p className='error-message'>{this.state.renderChangeError === true ? 'Please Save or Cancel your selections' : ''}</p>
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
                <h5>{type.text}</h5>
                {_.map(type.answers, ans => {
                  return (this.state[`answer${ans.id}`] === true ? (<p key={ans.id}>{ans.text}</p>) : (''))
                })}
                <div className='button-container'>
                  <div></div>
                  <div><button name={type.order} onClick={this.handleEdit}>Edit</button></div>
                </div>
                <p className='small-divider'></p>
              </div>
            )}
        })
      })
    }
  }

  render() {
    console.log('pre qa props', this.props.pre_qa)
    console.log('rating', this.props.rating)
    console.log('state', this.state)
    const isEditing = this.state.isEditing
    const { id }  = this.props.match.params
    return(
      <div className='form-container'>
        <RatingHeading id={id} brand={this.props.brand}/>
        {this.renderHeader()}
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
