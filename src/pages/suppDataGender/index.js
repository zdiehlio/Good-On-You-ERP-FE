import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchStyles, createStyles } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'


class SuppDataGender extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      genders: []
    }


    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchStyles(id)
  }


  componentWillReceiveProps(nextProps) {
    const { id } = this.props.match.params
    if(nextProps.qa !== this.props.qa) {
      _.map(nextProps.qa, compare => {
        if(compare.style_qa.question === 'gender') {
          this.setState({[compare.style_qa.tag]: compare.style_qa.tag})
        }
      })
    }
  }
//toggles if clause that sets state to target elements value and enables user to edit the answer
handleEdit(event) {
  event.preventDefault()
  const { id }  = this.props.match.params
  if(this.state['gender-children']) {
    this.setState({genders: [...this.state.genders, {brand: id, style: this.state['gender-children']}]})
  }
  if(this.state['gender-women']) {
    this.setState({genders: [...this.state.genders, {brand: id, style: this.state['gender-women']}]})
  }
  if(this.state['gender-men']) {
    this.setState({genders: [...this.state.genders, {brand: id, style: this.state['gender-men']}]})
  }
  this.setState({isEditing: event.target.name})
}

//sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    event.preventDefault()
    this.setState({isEditing: null})
  }

  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.props.createStyles(this.state.genders)
    this.setState({isEditing: null})
  }

  handleChange(event){
    const { id }  = this.props.match.params
    if(this.state[event.target.name] === event.target.name) {
      this.setState({[event.target.name]: null, genders: this.state.genders.filter(gender => {return gender.style != event.target.name})})
    } else {
      this.setState({[event.target.name]: event.target.name, genders: [...this.state.genders, {brand: id, style: event.target.name}]})
    }
  }

  render() {
    console.log('props', this.props.qa);
    console.log('state', this.state);
    const { id }  = this.props.match.params
    const state = this.state
    const props = this.props.qa
    const isEditing = this.state.isEditing
    return(
      <div className='form-container'>
        <FormsHeader />
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/suppDataRetailers/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Brand Styles</h3></div>
            <div><Link to={`/suppDataGender/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <form className='brand-form'>
        {isEditing === 'gender' ? (
          <div className='editing'>
            <h4>What are the Genders offered by the brand?</h4>
              <ul>
              <li><Field
                  type='checkbox'
                  onChange={this.handleChange}
                  checked={state['gender-children']}
                  name='gender-children'
                  component='input'/> Children
                </li>
                <li><Field
                  type='checkbox'
                  onChange={this.handleChange}
                  checked={state['gender-women']}
                  name='gender-women'
                  component='input'/> Women
                </li>
                <li><Field
                  type='checkbox'
                  onChange={this.handleChange}
                  checked={state['gender-men']}
                  name='gender-men'
                  component='input'/> Men
                </li>
              </ul>
              <button onClick={this.handleCancel}>Cancel</button>
              <button onClick={this.handleSave} name='gender'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h4>What are the Genders offered by the brand?</h4>
            <h5></h5>
            <button name='gender' onClick={this.handleEdit}>Edit</button>
          </div>
          )}
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    qa: state.qa
  }
}

export default reduxForm({
  form: 'SuppDataGenderForm'
})(
  connect(mapStateToProps, { fetchStyles, createStyles })(SuppDataGender)
)
