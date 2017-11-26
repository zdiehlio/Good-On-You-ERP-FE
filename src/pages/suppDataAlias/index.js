import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAlias, createAlias, deleteAlias  } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'
import axios from 'axios'

class SuppDataAlias extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: null,
      renderAlias: null,
      save: false,
      delete: false
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
      _.map(this.props.qa, name=> {
        this.setState({[name.alias]: name.alias})
      })
      this.setState({isEditing: event.target.name, save: false})
      console.log('set state', this.state);
  }
//sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    this.setState({isEditing: null, renderCurrent: null})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    this.setState({isEditing: null, renderCurrent: this.state.currentAnswer, save: true})
    console.log('save', this.state);
  }
  //handle text input change status, must be written seperate since value properties are inconsistent with radio buttons.
  handleInput(event) {
    this.setState({currentAnswer: event.target.value})
  }

  handleDelete(event) {
    event.preventDefault()
    this.props.deleteAlias(event.target.name)
    this.setState({save: true})
  }

  handleAdd(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.props.createAlias({brand: id, alias: this.state.currentAnswer})
    this.setState({save: true})
  }

  renderAlias() {
    // <button onClick={this.handleDelete} name={name.id} className='remove-list-item'>Delete</button>
    return _.map(this.props.qa, name => {
      if(name) {
        return(
          <li key={name.alias} >
            {name.alias}
          </li>
        )
      }
    })
  }

//render contains conditional statements based on state of isEditing as described in functions above.
render() {
  console.log('props', this.props.qa);
  console.log('state', this.state);
  const isEditing = this.state.isEditing
  const { id }  = this.props.match.params
  return(
    <div className='form-container'>
      <FormsHeader />
      <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
      <div className='forms-header'>
        <span className='form-navigation'>
          <div><Link to={`/suppDataTypes/${id}`}><button className='previous'>Previous</button></Link></div>
          <div><h3>Brand Alias</h3></div>
          <div><button className='next'>Next</button></div>
        </span>
      </div>
      <form className='brand-form'>
      {isEditing === '1' ? (
        <div className='editing'>
        <h5>List any Aliases for the Brand below: </h5>
          <Field
            placeholder={this.currentAnswer}
            onChange={this.handleInput}
            name='summary'
            component='textarea'/>
          <button onClick={this.handleAdd} value={this.state.currentAnswer}>Add</button>
          <button onClick={this.handleCancel}>Cancel</button>
          <button onClick={this.handleSave} name='1' value='1'>Save</button>
        </div>) : (
        <div className='not-editing'>
          <h5>List and Aliases for the Brand below: </h5>
          <button name='1' onClick={this.handleEdit} value='1'>Edit</button>
        </div>
        )}
        <h4>List of current Brand Aliases: </h4>
        <ul>
          {this.renderAlias()}
        </ul>
      </form>
    </div>
  )
}
}

function mapStateToProps(state) {
  return {qa: state.qa}
}

export default reduxForm({
  form: 'SuppDataAliasForm'
})(
  connect(mapStateToProps, { fetchAlias, createAlias, deleteAlias })(SuppDataAlias)
)
