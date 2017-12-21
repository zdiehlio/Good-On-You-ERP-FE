import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAllRating, fetchRating, createRating, updateRating } from '../../actions'
import { FormsHeader } from '../../components'
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
  HeaderWorker
} from '../../components'
import _ from 'lodash'

class Rating extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      ratingValues: [{}],
      errorsWebsite: [],
      errorsComment: [],
      errors: []
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
        [`originalComment${rate.answer}`]: rate.comment
      })
    })
    this.setState({ratingValues: _.map(nextProps.qa, check => {
      return {id: check.answer, url: check.url, comment: check.comment, is_selected: check.is_selected}
      })
    })
    this.setState({originalRatingValues: _.map(nextProps.qa, check => {
      return {id: check.answer, url: check.url, comment: check.comment, is_selected: check.is_selected}
      })
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
      })
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
        ratingValues: this.state.ratingValues.filter(rate => {return rate.id !== val.id})
      })
    })
    this.setState({ratingValues: this.state.originalRatingValues})
  }

  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state.errorsWebsite.length <= 0 && this.state.errorsComment.length <= 0) {
      this.props.createRating({question: event.target.name, brand: id, answers: this.state.ratingValues})
      this.setState({isEditing: null})
    } else {
      _.map(this.state.errorsComment, check => {
        this.setState({[`errorComment${check}`]: true})
      })
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
        console.log('comment', this.state[`comment${val.id}`]);
      }
    })
    this.handleValidComment(event)
  }

  handleUrl(event) {
    _.map(this.state.ratingValues, val => {
      if(val.id === parseInt(event.target.name)) {
        Object.assign(val, {url: event.target.value})
        this.setState({[`url${val.id}`]: event.target.value})
        console.log('url', this.state[`url${val.id}`]);
      }
    })
    this.handleValidUrl(event)
  }

  handleCheckbox(event) {
    event.persist()
    const { id }  = this.props.match.params
        if(this.state[`answer${event.target.name}`] === true) {
          new Promise((resolve, reject) => {
          resolve(this.setState({
            [`answer${event.target.name}`]: false,
            ratingValues: this.state.ratingValues.filter(rate => {return rate.id !== parseInt(event.target.name)}),
            [`show${event.target.name}`]: false
          }))
        }).then(() => this.handleSaveValidation(event))
        } else if(this.state[`answer${event.target.name}`] === false && this.state[`props${event.target.name}`] === parseInt(event.target.name)) {
          this.setState({[`show${event.target.name}`]: true, [`answer${event.target.name}`]: true})
        } else {
          new Promise((resolve, reject) => {
            resolve(this.setState({
            [`show${event.target.name}`]: true,
            [`answer${event.target.name}`]: true,
            ratingValues: [...this.state.ratingValues, {id: parseInt(event.target.name), is_selected: true}]
          }))
          }).then(() => this.handleSaveValidation(event))
        }
    // this.handleSaveValidation(event)
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
    if(this.state[`answer${e.target.name}`] === true) {
      if(!this.state[`url${e.target.name}`]) {
        console.log('url error');
        this.setState({errorsWebsite: [...this.state.errorsWebsite, parseInt(e.target.name)]})
      } else {
        console.log('no url error');
        this.setState({errorsWebsite: this.state.errorsWebsite.filter(rate => {return rate !== parseInt(e.target.name)})})
      }
      if(!this.state[`comment${e.target.name}`]) {
        this.setState({errorsComment: [...this.state.errorsComment, parseInt(e.target.name)]})
      } else {
        this.setState({errorsComment: this.state.errorsComment.filter(rate => {return rate !== parseInt(e.target.name)})})
      }
    } else if(this.state[`answer${e.target.name}`] === false){
        this.setState({
          errorsWebsite: this.state.errorsWebsite.filter(rate => {return rate !== parseInt(e.target.name)}),
          errorsComment: this.state.errorsComment.filter(rate => {return rate !== parseInt(e.target.name)})
        })
  }
}

  handleValidComment(e) {
    if(e.target.value === '') {
      this.setState({
        [`errorComment${e.target.name}`]: true,
        errorsComment: [...this.state.errorsComment, parseInt(e.target.name)]
      })
    } else {
        this.setState({
          [`errorComment${e.target.name}`]: false,
          errorsComment: this.state.errorsComment.filter(rate => {return rate !== parseInt(e.target.name)})
        })
      }
  }

  handleValidUrl(e) {
    if(e.target.value === '') {
      this.setState({
        [`errorWebsite${e.target.name}`]: true,
        errorsWebsite: [...this.state.errorsWebsite, parseInt(e.target.name)]
      })
    } else {
        this.setState({
          [`errorWebsite${e.target.name}`]: false,
          errorsWebsite: this.state.errorsWebsite.filter(rate => {return rate !== parseInt(e.target.name)})
        })
      }
    if(/^(www\.)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/.test(e.target.value) && e.target.value !== ''){
      this.setState({
        [`errorWebsite${e.target.name}`]: false,
        errorsWebsite: this.state.errorsWebsite.filter(rate => {return rate !== parseInt(e.target.name)})
      })
    } else {
      this.setState({
        [`errorWebsite${e.target.name}`]: true,
        errorsWebsite: [...this.state.errorsWebsite, parseInt(e.target.name)]
      })
    }
  }

  renderQA() {
    return _.map(this.props.pre_qa, theme => {
      return _.map(theme.questions, type => {
          if(this.state.isEditing === type.id) {
          return(
              <div className='editing'>
              <ul>
                <li key={type.id}>
                  <h5>{type.text}</h5>
                </li>
                <ul>
                  {_.map(type.answers, ans => {
                    if(this.state)
                    return (
                      <li key={ans.id}>
                        <input
                          className='checkbox'
                          type='checkbox'
                          name={ans.id}
                          onChange={this.handleCheckbox}
                          checked={this.state[`answer${ans.id}`] === true}
                          />
                          {ans.text}
                        {this.state[`show${ans.id}`] === true ? (
                          <div>
                          <h5>Evidence</h5>
                            <p>Source URL</p>
                            <input
                              type='text'
                              onChange={this.handleUrl}
                              name={ans.id}
                              value={this.state[`url${ans.id}`]}
                            />
                            <div className='error-message'>{this.state[`errorWebsite${ans.id}`] === true ? 'Please enter valid website' : ''}</div>
                            <p>Comment</p>
                            <textArea
                              onChange={this.handleComment}
                              name={ans.id}
                              value={this.state[`comment${ans.id}`]}
                            />
                            <div className='error-message'>{this.state[`errorComment${ans.id}`] === true ? 'Please enter a comment as evidence' : ''}</div>
                          </div>) : ('')}
                      </li>
                      )}
                    )}
                </ul>
              </ul>
              <button onClick={this.handleCancel} name={type.id}>Cancel</button>
              <button onClick={this.handleSave} name={type.id}>Save</button>
              {_.map(type.answers, ans => {
                return (<div key={ans.id} className='error-message'>{this.state[`errorComment${ans.id}`] === true || this.state[`errorWebsite${ans.id}`] === true ? 'Please fill out all required fields' : ''}</div>)
              })}
             </div>) } else {
              return(
            <div className='not-editing'>
              <h5>{type.text}</h5>
              <p>Current Selections:</p>
              {_.map(type.answers, ans => {
                return (this.state[`answer${ans.id}`] === true ? (<li key={ans.id}>{ans.text}</li>) : (''))
              })}
              <button name={type.id} onClick={this.handleEdit}>Edit</button>
            </div>
            )}
      })
    })
  }

  render() {
    console.log('pre qa props', this.props.pre_qa);
    console.log('props', this.props.qa);
    console.log('state', this.state);
    const isEditing = this.state.isEditing
    const { id }  = this.props.match.params
    return(
      <div className='form-container'>
        <FormsHeader />
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
      pre_qa: state.preQa
    }
  }

  export default connect(mapStateToProps, { fetchAllRating, fetchRating, createRating, updateRating })(Rating)
