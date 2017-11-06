import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { updateAnswer } from '../../actions'
import { FormsHeader } from '../../components'

import './brandCauses.css'

class BrandCauses extends Component {
  constructor(props){
    super(props);

    this.state = {
      brandOrigin: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderField(field) {
    return(
      <div>
        <h4>{field.label}</h4>
        <input
          placeholder={field.label}
          type={field.type}
          {...field.input}
        />
      </div>
    )
  }

  renderRadioGroup({ input, ...rest }){
    return(
      <fieldset {...input} {...rest}
        valueSelected={input.value}
        onChange={(event, value) => input.onChange(value)}/>
    )
}

  handleChange(event){
    console.log(this.props.state);
  }
  handleSubmit(event){
    event.preventDefault();
  }

  render() {
    return(
      <div className='form-container'>
        <FormsHeader />
        <form className='brand-form'>
          <div>
          <h4>Which of the following countries are 100% of the brands final stage of productions suppliers located in?</h4>
            <ul>
              <li><Field type='radio' name='productOrigin' component='input' value="Australia"/>Australia</li>
              <li><Field type='radio' name='productOrigin' component='input' value="Canada"/>Canada</li>
              <li><Field type='radio' name='productOrigin' component='input' value="New Zealand"/>New Zealand</li>
              <li><Field type='radio' name='productOrigin' component='input' value="USA"/>USA</li>
              <li><Field type='radio' name='productOrigin' component='input' value="None of the Above"/>None of the Above</li>
            </ul>
          </div>
          <div>
          <h4>Is the Brand Certified B-Corp?</h4>
            <ul>
              <li><Field type='radio' name='bCorp' component='input' value="Yes"/>Yes</li>
              <li><Field type='radio' name='bCorp' component='input' value="No"/>No</li>
            </ul>
          </div>
          <div>
          <h4>Is the brand a social enterprise that provides employment for people from a disadvantaged background?</h4>
            <ul>
              <li><Field type='radio' name='socialEnterprise' component='input' value="Yes"/>Yes</li>
              <li><Field type='radio' name='socialEnterprise' component='input' value="No"/>No</li>
            </ul>
          </div>
          <div>
          <h4>Does the brand have a 1 for 1 model?</h4>
            <ul>
              <li><Field type='radio' name='1for1' component='input' value="Yes"/>Yes</li>
              <li><Field type='radio' name='1for1' component='input' value="No"/>No</li>
            </ul>
          </div>
          <div>
          <h4>Is the brand Vegan?</h4>
            <ul>
              <li><Field type='radio' name='vegan' component='input' value="Yes"/>Yes</li>
              <li><Field type='radio' name='vegan' component='input' value="No"/>No</li>
            </ul>
          </div>
          <div>
          <h4>What Percentage of the brands products are certified Fair Trade?</h4>
            <ul>
              <li><Field type='radio' name='fairTrade' component='input' value="100%"/>100%</li>
              <li><Field type='radio' name='fairTrade' component='input' value="50%"/>&#60;&#61; 50%</li>
              <li><Field type='radio' name='fairTrade' component='input' value="None"/>There is no evidence of any/many products being certified Fair Trade</li>
            </ul>
          </div>
          <div>
          <h4>What percentage of products are made from certified Organic materials?</h4>
            <ul>
              <li><Field type='radio' name='organic' component='input' value="100%"/>100%</li>
              <li><Field type='radio' name='organic' component='input' value="50%"/>&#60;&#61; 50%</li>
              <li><Field type='radio' name='organic' component='input' value="None"/>There is no evidence of any/many products being made from certified Organic Materials</li>
            </ul>
          </div>
          <div>
          <h4>What percentage of products are made from a substantial proportion(-50%) of recycled/upcycled materials?</h4>
            <ul>
              <li><Field type='radio' name='recycled' component='input' value="100%"/>100%</li>
              <li><Field type='radio' name='recycled' component='input' value="50%"/>&#60;&#61; 50%</li>
              <li><Field type='radio' name='recycled' component='input' value="None"/>There is no evidence of any/many products being made from a substantial proportion of recycled/upcycled materials</li>
            </ul>
          </div>
          <button>Save</button>
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
