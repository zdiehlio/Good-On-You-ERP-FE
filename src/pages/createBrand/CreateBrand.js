import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {grey900} from 'material-ui/styles/colors'
import './CreateBrand.css'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Form, Input } from 'semantic-ui-react'
import { createBrand } from '../../actions'
import axios from 'axios'

class CreateBrand extends Component {
  constructor(props) {
    super(props)

    this.state = {
      createValue: '',
      nameError: true,
      websiteError: true,
      brandError: false,
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentWillMount() {
    if(this.props.create.length > 0) {
      this.setState({name: this.props.create})
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.create !== this.props.create) {
      if(nextProps.create.status === 201) {
        this.props.history.push(`/brandLanding/${nextProps.create.data.id}`)
      } else if(nextProps.create.response.status === 400) {
        this.setState({brandError: true})
      }
      if(this.props.create.length > 0) {
        this.setState({name: this.props.create})
      }
    }
  }

  onSubmit() {
    if(this.state.nameError === false && this.state.websiteError === false) {
      this.props.createBrand({name: this.state.name, website: this.state.website})
    } else {
      this.setState({renderError: true})
    }

  }

  handleInput(event, {name, value}) {
    if(value.length > 0) {
      this.setState({[`${name}Error`]: false })
      if(name === 'website') {
        let url = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/
        if(url.test(value)) {
          this.setState({websiteError: false})
        } else {
          this.setState({websiteError: true})
        }
      }
    } else {
      this.setState({[`${name}Error`]: true})
    }
    this.setState({[name]: value, brandError: false})
  }

  render() {
    const { handleSubmit } = this.props
    const state = this.state
    console.log('state', this.state)
    console.log('props', this.props)
    return (
      <div className="page-container">
        <h1>CreateBrand</h1>
        <div className="form-container">
          <Form className='create-brand'>
            <div>
              <Form.Field className={state.renderError === true && state.nameError === true ? 'ui error input' : 'ui input'}>
                <Input
                  placeholder="Brand Name"
                  name="name"
                  onChange={this.handleInput}
                  value={state.name}
                />
              </Form.Field>
              {state.renderError === true && state.nameError === true ? <p>Please enter Brand name</p> : ''}
              {state.brandError === true ?
                <p className='error-message'>Brand already exists</p> : ''}
            </div>
            <div>
              <Form.Field className={state.renderError === true && state.websiteError === true ? 'ui error input' : 'ui input'}>
                <Input
                  placeholder="Brand URL"
                  name="website"
                  onChange={this.handleInput}
                  value={state.website}
                />
              </Form.Field>
              {state.renderError === true && state.websiteError === true ? <p>Please enter valid Brand website</p> : ''}
            </div>
            <div>
              <button onClick={this.onSubmit}>Submit</button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { create: state.createBrand, state }
}


export default connect(mapStateToProps, { createBrand })(CreateBrand)
