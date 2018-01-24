import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Input, Progress } from 'semantic-ui-react'
import { fetchAlias, createAlias, deleteAlias  } from '../../actions'
import { SuppHeading } from '../../components'
import _ from 'lodash'
import axios from 'axios'

import './suppDataAlias.css'

class SuppDataAlias extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: '',
      renderAlias: null,
      save: false,
      aliasArr: [],
      progressBar: 0,
    }


    this.handleInput = this.handleInput.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchAlias(id)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.alias !== this.props.alias) {
      this.setState({aliasArr: _.map(nextProps.alias, ali => {return {id: ali.id, alias: ali.alias}})})
      if(Object.keys(nextProps.alias).length > 0) {
        this.state.progressBar++
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { id } = this.props.match.params
    if (nextState.save == true && this.state.save == false) {
      this.props.fetchAlias(id)
    }
  }

  componentDidUpdate() {
    if(this.state.save === true) {
      this.setState({save: false})
    }
  }

  //toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    //if a summary already exists, will set state of same target name to the current answer value and also toggle editing
    _.map(this.props.alias, name=> {
      this.setState({[name.alias]: name.alias})
    })
    this.setState({isEditing: event.target.name, save: false})
  }
  //sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    event.preventDefault()
    this.setState({isEditing: null, renderCurrent: null, currentAnswer: ''})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    this.setState({isEditing: null, renderCurrent: this.state.currentAnswer})
    if(this.state.currentAnswer) {
      this.state.progressBar++
    }
  }
  //handle text input change status, must be written seperate since value properties are inconsistent with radio buttons.
  handleInput(event, { value }) {
    this.setState({currentAnswer: value})
  }

  handleDelete(event) {
    event.preventDefault()
    this.props.deleteAlias(event.target.name)
    this.setState({aliasArr: this.state.aliasArr.filter(ali => {return ali.id !== event.target.name}), [event.target.name]: null})
  }

  handleAdd(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.props.createAlias({brand: id, alias: this.state.currentAnswer})
    this.setState({aliasArr: [...this.state.aliasArr, event.target.name], save: true})
  }

  renderAlias() {
    return _.map(this.state.aliasArr, name => {
      if(name) {
        return(
          <div className='alias-item' key={name.id}>
            <div>{name.alias}</div>
            <div><button className='delete-alias' onClick={this.handleDelete} name={name.id}>Delete</button></div>
          </div>
        )
      }
    })
  }

  //render contains conditional statements based on state of isEditing as described in functions above.
  render() {
    console.log('props', this.props.alias)
    console.log('state', this.state)
    const isEditing = this.state.isEditing
    const prop = this.props.alias
    const state = this.state
    const { id }  = this.props.match.params
    return(
      <div className='form-container'>
        <SuppHeading id={id} brand={this.props.brand}/>
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/suppDataGender/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Alternative Names</h3></div>
            <div><button className='next disabled'>Next</button></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress total={1} value={state.progressBar} progress />
        <form className='brand-form'>
          {isEditing === '1' ? (
            <div className='editing'>
              <h5>Add any alternative names the brand might have: </h5>
              <Form.Field inline>
                <Input
                  label='Brand Alias'
                  placeholder={this.currentAnswer}
                  value={state.currentAnswer}
                  onChange={this.handleInput}
                  name='summary'
                />
                <button className='add' onClick={this.handleAdd} value={this.state.currentAnswer}>Add</button>
              </Form.Field>
              <h5>{state.aliasArr.length > 0 ? 'List of current Brand Aliases:' : ''} </h5>
              <div className='alias-list'>{state.save === true ? this.renderAlias() : this.renderAlias()}</div>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button onClick={this.handleSave} name='1' value='1'>Done</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h5>Add any alternative names the brand might have: </h5>
              <h5>{state.aliasArr.length > 0 ? 'List of current Brand Aliases:' : ''} </h5>
              <ul>{_.map(state.aliasArr, ali => {
                return(
                  <li key={ali.id}>{ali.alias}</li>
                )}
              )}
              </ul>
              <div className='button-container'>
                <div></div>
                <div><button name='1' onClick={this.handleEdit} value='1'>Edit</button></div>
              </div>
            </div>
          )}
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    alias: state.alias,
    brand: state.brandInfo,
  }
}

export default connect(mapStateToProps, { fetchAlias, createAlias, deleteAlias })(SuppDataAlias)
