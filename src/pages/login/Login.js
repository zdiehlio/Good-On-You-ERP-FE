import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import $ from 'jquery'
import request from 'request'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { login } from '../../actions'

import './Login.css'

class Login extends Component {

  renderField(field) {
    return (
      <div>
        <MuiThemeProvider>
          <TextField
            floatingLabelText={field.label}
            type={field.type}
            {...field.input}
          />
        </MuiThemeProvider>
      </div>
    )
  }

  // componentWillMount(){
  //   console.log(this.props.data);
  // }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data) {
      if(nextProps.data.token) {
        this.props.history.push('/searchBrand')
      }
    }
  }

  onSubmit(values) {
    this.props.login(values)
  }

  render() {
    console.log('props', this.props.data)
    const { handleSubmit } = this.props

    return (
      <div className="page-container">
        <h2 className="title">Log on</h2>
        <div className="form-container">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="Email*"
              name="email"
              type="email"
              component={this.renderField}
            ></Field>
            <Field
              label="Password*"
              name="password"
              type="password"
              component={this.renderField}
            ></Field>
            <button className="button" style={{width: '100%', marginTop: '20px'}}>Go</button>
          </form>
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
