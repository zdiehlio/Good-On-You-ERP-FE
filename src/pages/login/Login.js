import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import $ from 'jquery'
import request from 'request'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { login } from '../../actions'

import './Login.css'

class Login extends Component {

  renderField(field) {
    return (
      <div>
        <Form.Field>
          <Input
            className={field.className}
            placeholder={field.placeholder}
            type={field.type}
            {...field.input}
          />
        </Form.Field>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data) {
      console.log('login', nextProps.data)
      if(nextProps.data.token) {
        this.props.history.push('/searchBrand')
      }
    }
  }

  onSubmit(values) {
    this.props.login(values)
  }

  render() {
    const { handleSubmit } = this.props
    console.log('props', this.props.data)
    return (
      <div className="page-container">
        <h2 className="title">Welcome to the Good on You brand rating system</h2>
        <div className="form-container">
          <h3>Log on to get started</h3>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                className={this.props.data.error ? 'ui error input' : 'ui input'}
                placeholder='Email *'
                name="email"
                type="email"
                component={this.renderField}
              ></Field>
              <Field
                className={this.props.data.error ? 'ui error input' : 'ui input'}
                placeholder='password *'
                name="password"
                type="password"
                component={this.renderField}
              ></Field>
            <p className='error-message'>{this.props.data.error ? this.props.data.error : ''}</p>
            <button className="button" >Log In</button>
          </form>

        </div>
        <div className='more-info'>
          <h4>More Information</h4>
          <a href='https://www.goodonyou.eco'><p>About Good On You</p></a>
          <a href='https://www.goodonyou.eco/how-we-rate/'><p>About the brand rating methodology</p></a>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { data: state.login }
}

export default reduxForm({
  form: 'LoginForm',
})(
  connect(mapStateToProps, { login })(Login)
)
