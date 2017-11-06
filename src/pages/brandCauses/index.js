import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { updateAnswer } from '../../actions'
import { FormsHeader } from '../../components'

import './brandCauses.css'

class BrandCauses extends Component {
  constructor(props){
    super(props)

    this.state = {
      isEditing: false,
      question: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

//toggles if clause that enables user to edit the answer
  handleEdit(event) {
    this.setState({isEditing: true, question: [event]})
  }
//toggles if clause hiding user's ability to edit answer
  handleCancel(event) {
    this.setState({isEditing: false})
  }
  handleSave(event) {
    this.setState({isEditing: false})
  }
  handleChange(event){
    console.log(this.props.state)
  }
  handleSubmit(event){
    event.preventDefault()
  }

  render() {
    const { isEditing } = this.props.state.isEditing
    const question = this.state.question
    return(
      <div className='form-container'>
        <FormsHeader />
        <form className='brand-form'>
        {{isEditing} ? (
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
            <button onClick={this.handleEdit}>Edit</button>
          </div>
            )}
        {isEditing ? (
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
            <button onClick={this.handleEdit}>Edit</button>
          </div>
        )}

        {isEditing ? (
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
            <button onClick={this.handleEdit}>Edit</button>
          </div>
          )}

        {isEditing ? (
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
            <button onClick={this.handleEdit}>Edit</button>
          </div>
          )}

        {isEditing ? (
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
            <button onClick={this.handleEdit}>Edit</button>
          </div>
          )}

        {isEditing ? (
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
            <button onClick={this.handleEdit}>Edit</button>
          </div>
          )}

        {isEditing ? (
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
            <button onClick={this.handleEdit}>Edit</button>
          </div>
          )}
        {isEditing ? (
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
            <button onClick={this.handleEdit}>Edit</button>
          </div>
          )}
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'BrandCausesForm'
})(
  connect(null, { updateAnswer })(BrandCauses)
)
