import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { fetchAllQuestions } from '../../actions'
import { FormsHeader } from '../../components'
import _ from 'lodash'

import './brandCauses.css'

class BrandCauses extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

componentDidMount() {
  this.props.fetchAllQuestions()
}

renderQuestions() {
  return _.map(this.props.qa, question => {
    return(
      <li key={question.id}>
        {question.text}
      </li>
    )
  })
}
//toggles if clause that sets state to target elements value and enables user to edit the answer
  handleEdit(event) {
    this.setState({isEditing: event.target.value})
    console.log('edit', this.state);
  }
//toggles if clause assigning state to null and hiding user's ability to edit answer
  handleCancel(event) {
    this.setState({isEditing: null})
  }
  handleSave(event) {
    this.setState({isEditing: null})
  }
  handleChange(event){
    console.log(this.props.state)
  }
  handleSubmit(event){
    event.preventDefault()
  }
//conditional statement run of isEditing state and render if the state matches the elements particular value
  render() {
    console.log('props', this.props.qa);
    const isEditing = this.state.isEditing
    return(
      <div className='form-container'>
        <FormsHeader />
        <ul>
          {this.renderQuestions()}
        </ul>
        <form className='brand-form'>
        {isEditing === '1' ? (
          <div className='editing'>
            <h4>Which of the following countries are 100% of the brands final stage of productions suppliers located in?</h4>
              <ul>
                <li><Field type='radio' name='productOrigin' component='input' value="Australia"/>Australia</li>
                <li><Field type='radio' name='productOrigin' component='input' value="Canada"/>Canada</li>
                <li><Field type='radio' name='productOrigin' component='input' value="New Zealand"/>New Zealand</li>
                <li><Field type='radio' name='productOrigin' component='input' value="USA"/>USA</li>
                <li><Field type='radio' name='productOrigin' component='input' value="None of the Above"/>None of the Above</li>
                <button onClick={this.handleCancel}>Cancel</button>
                <button onClick={this.handleSave}>Save</button>
              </ul>
          </div>) : (
          <div className='not-editing'>
            <h4>Which of the following countries are 100% of the brands final stage of productions suppliers located in?</h4>
            <button onClick={this.handleEdit} value='1'>Edit</button>
          </div>
            )}
        {isEditing === '2' ? (
          <div>
          <h4>Is the Brand Certified B-Corp?</h4>
            <ul>
              <li><Field type='radio' name='bCorp' component='input' value="Yes"/>Yes</li>
              <li><Field type='radio' name='bCorp' component='input' value="No"/>No</li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>Is the Brand Certified B-Corp?</h4>
            <button onClick={this.handleEdit} value='2'>Edit</button>
          </div>
        )}

        {isEditing === '3'? (
          <div>
          <h4>Is the brand a social enterprise that provides employment for people from a disadvantaged background?</h4>
            <ul>
              <li><Field type='radio' name='socialEnterprise' component='input' value="Yes"/>Yes</li>
              <li><Field type='radio' name='socialEnterprise' component='input' value="No"/>No</li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>Is the brand a social enterprise that provides employment for people from a disadvantaged background?</h4>
            <button onClick={this.handleEdit} value='3'>Edit</button>
          </div>
          )}

        {isEditing === '4' ? (
          <div>
          <h4>Does the brand have a 1 for 1 model?</h4>
            <ul>
              <li><Field type='radio' name='1for1' component='input' value="Yes"/>Yes</li>
              <li><Field type='radio' name='1for1' component='input' value="No"/>No</li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>Does the brand have a 1 for 1 model?</h4>
            <button onClick={this.handleEdit} value='4'>Edit</button>
          </div>
          )}

        {isEditing === '5' ? (
          <div>
          <h4>Is the brand Vegan?</h4>
            <ul>
              <li><Field type='radio' name='vegan' component='input' value="Yes"/>Yes</li>
              <li><Field type='radio' name='vegan' component='input' value="No"/>No</li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>Is the brand Vegan?</h4>
            <button onClick={this.handleEdit} value='5'>Edit</button>
          </div>
          )}

        {isEditing === '6' ? (
          <div>
          <h4>What Percentage of the brands products are certified Fair Trade?</h4>
            <ul>
              <li><Field type='radio' name='fairTrade' component='input' value="100%"/>100%</li>
              <li><Field type='radio' name='fairTrade' component='input' value="50%"/>&#60;&#61; 50%</li>
              <li><Field type='radio' name='fairTrade' component='input' value="None"/>There is no evidence of any/many products being certified Fair Trade</li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>What Percentage of the brands products are certified Fair Trade?</h4>
            <button onClick={this.handleEdit} value='6'>Edit</button>
          </div>
          )}

        {isEditing === '7' ? (
          <div>
          <h4>What percentage of products are made from certified Organic materials?</h4>
            <ul>
              <li><Field type='radio' name='organic' component='input' value="100%"/>100%</li>
              <li><Field type='radio' name='organic' component='input' value="50%"/>&#60;&#61; 50%</li>
              <li><Field type='radio' name='organic' component='input' value="None"/>There is no evidence of any/many products being made from certified Organic Materials</li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>What percentage of products are made from certified Organic materials?</h4>
            <button onClick={this.handleEdit} value='7'>Edit</button>
          </div>
          )}
        {isEditing === '8' ? (
          <div>
          <h4>What percentage of products are made from a substantial proportion(-50%) of recycled/upcycled materials?</h4>
            <ul>
              <li><Field type='radio' name='recycled' component='input' value="100%"/>100%</li>
              <li><Field type='radio' name='recycled' component='input' value="50%"/>&#60;&#61; 50%</li>
              <li><Field type='radio' name='recycled' component='input' value="None"/>There is no evidence of any/many products being made from a substantial proportion of recycled/upcycled materials</li>
            </ul>
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.handleSave}>Save</button>
          </div>) : (
          <div className='not-editing'>
          <h4>What percentage of products are made from a substantial proportion(-50%) of recycled/upcycled materials?</h4>
            <button onClick={this.handleEdit} value='8'>Edit</button>
          </div>
          )}
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {qa: state.qa}
}

export default reduxForm({
  form: 'BrandCausesForm'
})(
  connect(mapStateToProps, { fetchAllQuestions })(BrandCauses)
)
