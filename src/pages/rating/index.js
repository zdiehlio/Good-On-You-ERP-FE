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
      ratingValues: [],
      deleteValues: [],
      path: this.props.match,
      save: false
    }

    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    // this.handleUrl = this.handleUrl.bind(this)
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
      this.setState({[`answer${rate.answer}`]: rate.answer, [`url${rate.answer}`]: rate.url, [`comment${rate.answer}`]: rate.comment})
    })
    this.setState({ratingValues: _.map(nextProps.qa, check => {
      return {brand: id, answer: check.answer, url: check.url, comment: check.comment}
      })
    })
  }
}

//toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.setState({isEditing: event.target.name})
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
    this.props.createRating(this.state.ratingValues)
    this.setState({isEditing: null})
  }

  handleCheckbox(event) {
    const { id }  = this.props.match.params
    if(this.state[`answer${event.target.name}`] === parseInt(event.target.name)) {
      this.setState({
        [`answer${event.target.name}`]: null,
        ratingValues: this.state.ratingValues.filter(rate => {return rate.answer !== parseInt(event.target.name)}),
        // deleteValues: [...this.state.deleteValues, event.target.name],
      })
    } else {
      this.setState({
        [`answer${event.target.name}`]: parseInt(event.target.name),
        ratingValues: [...this.state.ratingValues, {brand: id, answer: parseInt(event.target.name), comment: 'test', url: 'www.testing.com'}],
        // deleteValues: this.state.deleteValues.filter(type => {return type !== event.target.name})
      })
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
          return(
            <ul>
              <li key={type.id}>
                {type.text}
              </li>
              <ul>
                {_.map(type.answers, ans => {
                  return (
                    <li key={ans.id}>
                      <input
                        type='checkbox'
                        name={ans.id}
                        onChange={this.handleCheckbox}
                        checked={this.state[`answer${ans.id}`]}
                        />
                        {ans.text}
                      <input
                        type='text'
                        onChange={this.handleUrl}
                        name={ans.id}
                      />
                      <textArea
                      />
                    </li>
                    )}
                  )}
              </ul>
            </ul>
          )
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
          {isEditing === '1' ? (
            <div className='editing'>
                <div>
                <h5>What are the product types?  Select one or more?</h5>
                {this.renderQA()}
                </div>
              <button onClick={this.handleCancel}>Cancel</button>
              <button onClick={this.handleSave} name='1'>Save</button>
            </div>) : (
            <div className='not-editing'>
              <h5>What is the size of the Brand?</h5>
              <p>Current sizes:</p>
              <button name='1' onClick={this.handleEdit}>Edit</button>
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
      pre_qa: state.preQa
    }
  }

  export default connect(mapStateToProps, { fetchAllRating, fetchRating, createRating, updateRating })(Rating)
