import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Input, Checkbox, TextArea, Progress} from 'semantic-ui-react'
import { fetchAllRating, fetchRating, createRating, updateRating } from '../../actions'
import { RatingHeading } from '../../components'
import {
  HeaderAngora,
  HeaderChemical,
  HeaderEnergy,
  HeaderFeathers,
  HeaderFur,
  HeaderHairs,
  HeaderLeather,
  HeaderPractices,
  HeaderResource,
  HeaderRights,
  HeaderSkins,
  HeaderSuppliers,
  HeaderWages,
  HeaderWater,
  HeaderWool,
  HeaderWorker,
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
    this.props.fetchAllRating(theme)
    this.props.fetchRating(id, theme)
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
    this.setState({ratingValues: this.state.ratingValues.filter(rate => {
      if(rate.is_selected === true) {
        return rate.id !== this.state.ratingValues.id
      }
    }),
    })
    this.setState({isEditing: parseInt(event.target.name)})
  }

  //sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    event.preventDefault()
    _.map(this.state.ratingValues, val => {
      this.setState({
        isEditing: null,
        [`answer${val.id}`]: this.state[`originalAnswer${val.id}`],
        [`url${val.id}`]: this.state[`originalUrl${val.id}`],
        [`comment${val.id}`]: this.state[`originalComment${val.id}`],
        [`show${val.id}`]: this.state[`originalShow${val.id}`],
      })
    })
    this.setState({ratingValues: this.state.originalRatingValues})
  }

  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state.errorsWebsite.length <= 0) {
      this.props.createRating({question: event.target.name, brand: id, answers: this.state.ratingValues})
      _.map(this.state.ratingValues, val => {
        this.setState({
          isEditing: null,
          [`originalAnswer${val.id}`]: this.state[`answer${val.id}`],
          [`originalUrl${val.id}`]: this.state[`url${val.id}`],
          [`originalComment${val.id}`]: this.state[`comment${val.id}`],
          [`originalShow${val.id}`]: this.state[`show${val.id}`],
        })
      })
      this.setState({
        isEditing: null,
        originalRatingValues: this.state.ratingValues,
      })
    } else {
      _.map(this.state.errorsWebsite, check => {
        this.setState({[`errorWebsite${check}`]: true})
      })
    }
  }

  handleComment(event) {
    _.map(this.state.ratingValues, val => {
      if(val.id === parseInt(event.target.name)) {
        Object.assign(val, {comment: event.target.value})
        this.setState({[`comment${val.id}`]: event.target.value})
      }
    })
  }

  handleUrl(event) {
    _.map(this.state.ratingValues, val => {
      if(val.id === parseInt(event.target.name)) {
        Object.assign(val, {url: event.target.value})
        this.setState({[`url${val.id}`]: event.target.value})
      }
    })
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
      }).then(() => this.handleSaveValidation(event))
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
  }

  renderHeader() {
    const id  = this.props.match.params.id
    let theme = this.props.match.path.slice(1, -4)
    if(theme === 'angora') {
      return(<HeaderAngora id={id} />)
    }
    if(theme === 'chemical') {
      return(<HeaderChemical id={id} />)
    }
    if(theme === 'energy') {
      return(<HeaderEnergy id={id} />)
    }
    if(theme === 'feathers') {
      return(<HeaderFeathers id={id} />)
    }
    if(theme === 'fur') {
      return(<HeaderFur id={id} />)
    }
    if(theme === 'hairs') {
      return(<HeaderHairs id={id} />)
    }
    if(theme === 'leather') {
      return(<HeaderLeather id={id} />)
    }
    if(theme === 'practices') {
      return(<HeaderPractices id={id} />)
    }
    if(theme === 'resource') {
      return(<HeaderResource id={id} />)
    }
    if(theme === 'rights') {
      return(<HeaderRights id={id} />)
    }
    if(theme === 'skins') {
      return(<HeaderSkins id={id} />)
    }
    if(theme === 'suppliers') {
      return(<HeaderSuppliers id={id} />)
    }
    if(theme === 'wages') {
      return(<HeaderWages id={id} />)
    }
    if(theme === 'water') {
      return(<HeaderWater id={id} />)
    }
    if(theme === 'wool') {
      return(<HeaderWool id={id} />)
    }
    if(theme === 'worker_policies') {
      return(<HeaderWorker id={id} />)
    }
  }

  handleSaveValidation(e) {
    if(this.state[`answer${e}`] === true) {
      if(!this.state[`url${e}`]) {
        this.setState({errorsWebsite: [...this.state.errorsWebsite, parseInt(e)]})
      } else {
        this.setState({errorsWebsite: this.state.errorsWebsite.filter(rate => {return rate !== parseInt(e)})})
      }
    } else if(this.state[`answer${e}`] === false){
      this.setState({
        errorsWebsite: this.state.errorsWebsite.filter(rate => {return rate !== parseInt(e)}),
      })
    }
  }

  // handleValidComment(e) {
  //   if(e.target.value === '') {
  //     this.setState({
  //       [`errorComment${e.target.name}`]: true,
  //       errorsComment: [...this.state.errorsComment, parseInt(e.target.name)],
  //     })
  //   } else {
  //     this.setState({
  //       [`errorComment${e.target.name}`]: false,
  //       errorsComment: this.state.errorsComment.filter(rate => {return rate !== parseInt(e.target.name)}),
  //     })
  //   }
  // }

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
    // if(/^(www\.)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/.test(e.target.value) && e.target.value !== ''){
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

  renderQA() {
    const id  = this.props.match.params.id
    let theme = this.props.match.path.slice(1, -4)
    return _.map(this.props.pre_qa, theme => {
      return _.map(theme.questions, type => {
        if(type.id && this.state.isEditing === type.id) {
          return(
            <div className='editing'>
              <div key={type.id}>
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
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel} name={type.id}>Cancel</button></div>
                <div><button onClick={this.handleSave} name={type.id}>Save</button></div>
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
                <div><button name={type.id} onClick={this.handleEdit}>Edit</button></div>
              </div>
              <p className='small-divider'></p>
            </div>
          )}
      })
    })
  }

  render() {
    console.log('pre qa props', this.props.pre_qa)
    console.log('props', this.props.qa)
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
  }
}

export default connect(mapStateToProps, { fetchAllRating, fetchRating, createRating, updateRating })(Rating)
