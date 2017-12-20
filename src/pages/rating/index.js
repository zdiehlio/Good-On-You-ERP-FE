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
      ratingValues: [{}]
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
      this.setState({[`answer${rate.answer}`]: rate.is_selected, [`show${rate.answer}`]: rate.is_selected, [`url${rate.answer}`]: rate.url, [`comment${rate.answer}`]: rate.comment})
    })
    this.setState({ratingValues: _.map(nextProps.qa, check => {
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
    event.default()
    this.setState({isEditing: null})
  }

  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.props.createRating({question: event.target.name, brand: id, answers: this.state.ratingValues})
    this.setState({isEditing: null})
  }

  handleComment(event) {
    _.map(this.state.ratingValues, val => {
      if(val.id === parseInt(event.target.name)) {
        Object.assign(val, {comment: event.target.value})
        this.setState({[`comment${val.id}`]: event.target.value})
        console.log('comment', this.state[`comment${val.id}`]);
      }
    })
  }

  handleUrl(event) {
    _.map(this.state.ratingValues, val => {
      if(val.id === parseInt(event.target.name)) {
        Object.assign(val, {url: event.target.value})
        this.setState({[`url${val.id}`]: event.target.value})
        console.log('url', this.state[`url${val.id}`]);
      }
    })
  }

  handleCheckbox(event) {
    const { id }  = this.props.match.params
    if(this.state[`answer${event.target.name}`] === true) {
      this.setState({
        [`answer${event.target.name}`]: false,
        ratingValues: this.state.ratingValues.filter(rate => {return rate.id !== parseInt(event.target.name)}),
        [`show${event.target.name}`]: false
      })
    } else if(this.state[`answer${event.target.name}`] === false) {
      this.setState({[`show${event.target.name}`]: true, [`answer${event.target.name}`]: true})
    } else {
      this.setState({[`show${event.target.name}`]: true, [`answer${event.target.name}`]: true})
      // _.map(this.state.ratingValues, check => {
          this.setState({ratingValues: [...this.state.ratingValues, {id: parseInt(event.target.name), is_selected: true}]})
      // })
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
                            <p>Comment</p>
                            <textArea
                              onChange={this.handleComment}
                              name={ans.id}
                              value={this.state[`comment${ans.id}`]}
                            />
                          </div>) : ('')}
                      </li>
                      )}
                    )}
                </ul>
              </ul>
              <button onClick={this.handleCancel}>Cancel</button>
              <button onClick={this.handleSave} name={type.id}>Save</button>
            </div>) } else {
              return(
            <div className='not-editing'>
              <h5>{type.text}</h5>
              <p>Current Selections:</p>
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
