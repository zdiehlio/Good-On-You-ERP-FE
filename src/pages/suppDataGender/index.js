import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Checkbox, Progress } from 'semantic-ui-react'
import { fetchStyles, createStyles } from '../../actions'
import { SuppHeading } from '../../components'
import _ from 'lodash'


class SuppDataGender extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      genders: [],
      originalGenders: [],
      progressBar: 0,
      'gender-men': '',
      'gender-women': '',
      'gender-children': '',
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
    if(nextProps.styles !== this.props.styles) {
      _.map(nextProps.styles, compare => {
        if(compare.style_qa.question === 'gender') {
          this.state.genders.push({brand: id, style: compare.style_qa.tag})
          // this.state.originalGenders.push({brand: id, style: compare.style_qa.tag})
          this.setState({[compare.style_qa.tag]: compare.style_qa.tag})
          // this.setState({[`original${compare.style_qa.tag}`]: compare.style_qa.tag})
          this.state.progressBar++
        }
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
    event.preventDefault()
    const { id } = this.props.match.params
    this.props.fetchStyles(id)
    _.map(this.state.genders, check => {
      this.setState({[check.style]: null})
    })
    this.setState({
      isEditing: null,
      genders: [],
    })
  }

  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    if(this.state.genders.length > 0) {
      this.props.createStyles(this.state.genders, id)
      this.setState({isEditing: null})
      this.state.progressBar++
    } else {
      this.setState({error: true})
    }
  }

  handleChange(event, { name }){
    const { id }  = this.props.match.params
    if(this.state[name] === name) {
      this.setState({[name]: null, genders: this.state.genders.filter(gender => {return gender.style !== name})})
    } else {
      this.setState({[name]: name, genders: [...this.state.genders, {brand: id, style: name}], error: false})
    }
  }

  render() {
    console.log('props', this.props.styles)
    console.log('state', this.state)
    const { id }  = this.props.match.params
    const state = this.state
    const props = this.props.styles
    const isEditing = this.state.isEditing
    return(
      <div className='form-container'>
        <SuppHeading id={id} brand={this.props.brand}/>
        <div className='forms-header'><Link to={`/brandLanding/${id}`}><button>Back to Summary</button></Link></div>
        <div className='forms-header'>
          <span className='form-navigation'>
            <div><Link to={`/suppDataPrice/${id}`}><button className='previous'>Previous</button></Link></div>
            <div><h3>Gender</h3></div>
            <div><Link to={`/suppDataAlias/${id}`}><button className='next'>Next</button></Link></div>
          </span>
        </div>
        <p className='small-divider'></p>
        <h5> Current:</h5>
        <Progress total={1} value={state.progressBar} progress />
        <form className='brand-form'>
          {isEditing === 'gender' ? (
            <div className='editing'>
              <h4>What are the Genders/Ages offered by the brand? *</h4>
              <Form.Field inline className={state.error === true ? 'ui error checkbox' : 'ui checkbox'}>
                <Checkbox
                  label='Children'
                  onChange={this.handleChange}
                  checked={state['gender-children'] ? true : false}
                  name='gender-children'
                />
              </Form.Field>
              <Form.Field inline>
                <Checkbox
                  label='Women'
                  onChange={this.handleChange}
                  checked={state['gender-women'] ? true : false}
                  name='gender-women'
                />
              </Form.Field>
              <Form.Field inline>
                <Checkbox
                  label='Men'
                  onChange={this.handleChange}
                  checked={state['gender-men'] ? true : false}
                  name='gender-men'
                />
              </Form.Field>
              <p className='error-message'>{state.error === true ? 'Please select at least one option' : ''}</p>
              <div className='button-container'>
                <div><button className='cancel' onClick={this.handleCancel}>Cancel</button></div>
                <div><button onClick={this.handleSave} name='gender'>Save</button></div>
              </div>
            </div>) : (
            <div className='not-editing'>
              <h4>What are the Genders/Ages offered by the brand? *</h4>
              {_.map(this.state.genders, check => {
                let gender = check.style.slice(7)
                return(<div key={check.style}>{gender}</div>)
              }
              )}
              <div className='button-container'>
                <div><button name='gender' onClick={this.handleEdit}>Edit</button></div>
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
    styles: state.styles,
    brand: state.brandInfo,
  }
}

export default connect(mapStateToProps, { fetchStyles, createStyles })(SuppDataGender)
