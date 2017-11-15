import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { fetchGeneral, updateGeneral, createBrandSize, deleteBrandSize } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'
import axios from 'axios'

class BrandGeneral extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null,
      currentAnswer: '',
      name: this.props.qa.name,
      sustainability_report_date: this.props.qa.sustainability_report_date,
      review_date: this.props.qa.review_date,
      parent_company: this.props.qa.parent_company,
      input: null
    }


    this.handleRadio = this.handleRadio.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    // this.handleDelete = this.handleDelete.bind(this)
  }
componentWillMount() {
  const { id } = this.props.match.params
  this.props.fetchGeneral(id, 'general')
}

componentDidMount() {
  _.map(this.props.qa, ident => {
    if(ident.is_selected)
      console.log('ident', ident.is_selected);
      this.setState({currentAnswer: ident.id})
})
}

//toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    event.preventDefault()
    const { id }  = this.props.match.params
    this.setState({isEditing: event.target.value})
}
//sets state for isEditing to null which will toggle the ability to edit
  handleCancel(event) {
    this.setState({isEditing: null, currentAnswer: null})
  }
  //upon hitting save, will send a PATCH request updating the answer according to the current state of targe 'name' and toggle editing.
  handleSave(event) {
    const { id }  = this.props.match.params
    this.props.updateGeneral(id, {name: this.state.name, sustainability_report_date: this.state.sustainability_report_date, review_date: this.state.review_date, parent_company: this.state.parent_company})
    this.setState({isEditing: null})
    console.log('save', this.state);
  }
  //handle radio buttons change status, must be written seperate since value properties are inconsistent with text input.
  handleRadio(event){
    this.setState({finalAnswer: event.target.name, currentAnswer: event.target.value})
  }
  //handle text input change status, must be written seperate since value properties are inconsistent with radio buttons.
  handleInput(event) {
    this.setState({currentAnswer: event.target.name, [event.target.name]: event.target.value, input: event.target.value})
  }


  render() {
    console.log('props', this.props.qa);
    console.log('state', this.state);
    const isEditing = this.state.isEditing
    return(
      <div className='form-container'>
        <FormsHeader />
        <form className='brand-form'>
        {isEditing === '1' ? (
          <div className='editing'>
          <h5>What is the Brand Name and Website?</h5>
            <ul>
              <li>Brand Name: <Field
                placeholder={this.props.qa.name}
                onChange={this.handleInput}
                name='name'
                component='input' />
              </li>
              <div> Brand Website: </div><div>{this.props.qa.website}</div>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave} name='1' value='1'>Save</button>
          </div>) : (
          <div className='not-editing'>
            <h5>What is the Brand Name and Website?</h5>
            <button name='1' onClick={this.handleEdit} value='1'>Edit</button>
          </div>
          )}
            <div className='not-editing'>
              <h5>What is the rating date and verification date</h5>
              <div>Rating Date: {this.props.qa.rating_date ? this.props.qa.rating_date : 'MM/DD/YYYY'}</div>
              <div>Verification Date: {this.props.qa.verification_date ? this.props.qa.verification_date : 'MM/DD/YYYY'}</div>
            </div>
            {isEditing === '3' ? (
              <div className='editing'>
              <h5>Which month does the brand release its sustainability report?</h5>
                <ul>
                  <li>Sustainability Report Date: <Field
                    placeholder={this.props.qa.sustainability_report_date ? this.props.qa.sustainability_report_date : 'DD/MM/YYYY'}
                    onFocus={this.handleInput}
                    onChange={this.handleInput}
                    name='sustainability_report_date'
                    component='input' />
                  </li>
                </ul>
                <button onClick={this.handleCancel}>Cancel</button>
                <button onClick={this.handleSave} name='3' value='3'>Save</button>
              </div>) : (
              <div className='not-editing'>
                <h5>Which month does the brand release its sustainability report?</h5>
                <button name='3' onClick={this.handleEdit} value='3'>Edit</button>
              </div>
              )}
              {isEditing === '4' ? (
                <div className='editing'>
                <h5>Which month does Good On You need to review the Brand?</h5>
                  <ul>
                    <li>Brand Review Date: <Field
                      placeholder={this.props.qa.review_date ? this.props.qa.review_date : 'DD/MM/YYYY'}
                      onFocus={this.handleInput}
                      onChange={this.handleInput}
                      name='review_date'
                      component='input' />
                    </li>
                  </ul>
                  <button onClick={this.handleCancel}>Cancel</button>
                  <button onClick={this.handleSave} name='4' value='4'>Save</button>
                </div>) : (
                <div className='not-editing'>
                  <h5>Which month does Good On You need to review the Brand?</h5>
                  <button name='4' onClick={this.handleEdit} value='4'>Edit</button>
                </div>
                )}
                {isEditing === '5' ? (
                  <div className='editing'>
                  <h5>What is the size of the Brand?</h5>
                    <ul>
                      <h5>Brand Size: </h5>
                      <li> <Field
                        type='radio'
                        onChange={this.handleRadio}
                        name='small'
                        component='input' />Small
                      </li>
                      <li> <Field
                        type='radio'
                        onChange={this.handleRadio}
                        name='large'
                        component='input' />Large
                      </li>
                    </ul>
                      <ul>
                      <h5>Does the Brand meet at least one of the following large brand criteria?</h5>
                        <li> <Field
                          type='checkbox'
                          onChange={this.handleRadio}
                          name='listed'
                          component='input' />Listed Company
                        </li>
                        <li> <Field
                          type='checkbox'
                          onChange={this.handleRadio}
                          name='subsidiary'
                          component='input' />Subsidiary Company
                        </li>
                        <li> <Field
                          type='checkbox'
                          onChange={this.handleRadio}
                          name='alexa'
                          component='input' />Alexa &#60; 200k
                        </li>
                        <li> <Field
                          type='checkbox'
                          onChange={this.handleRadio}
                          name='insta'
                          component='input' />Insta + FB &#62; 75k
                        </li>
                        <li> <Field
                          type='checkbox'
                          onChange={this.handleRadio}
                          name='linkedin'
                          component='input' />Linkedin employees &#62; 50
                        </li>
                        <li> <Field
                          type='checkbox'
                          onChange={this.handleRadio}
                          name='override'
                          component='input' />Manual override after company provided data satisfying Good On You criteria
                        </li>
                      </ul>
                      <ul>
                      <h5>Parent Company Name: </h5>
                        <li> <Field
                          placeholder={this.props.qa.parent_company}
                          onFocus={this.handleInput}
                          onChange={this.handleInput}
                          name='parent_company'
                          component='input' />
                        </li>
                      </ul>
                    <button onClick={this.handleCancel}>Cancel</button>
                    <button onClick={this.handleSave} name='5' value='5'>Save</button>
                  </div>) : (
                  <div className='not-editing'>
                    <h5>What is the size of the Brand?</h5>
                    <button name='5' onClick={this.handleEdit} value='5'>Edit</button>
                  </div>
                  )}
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {qa: state.qa}
}

export default reduxForm({
  form: 'BrandGeneralForm'
})(
  connect(mapStateToProps, { updateGeneral, fetchGeneral, createBrandSize, deleteBrandSize})(BrandGeneral)
)
