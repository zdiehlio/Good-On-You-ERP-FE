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
      if(this.props.create.length > 0) {
        this.setState({name: this.props.create})
      }
    }
  }

  onSubmit() {
    if((this.state.nameError && this.state.websiteError) === false) {
      console.log('submit')
      this.props.createBrand({name: this.state.name, website: this.state.website}, (response) => {
        console.log('res', response)
        this.props.history.push(`/brandLanding/${response.data.id}`)
      })
    } else {
      this.setState({renderError: true})
    }
  }

  handleInput(event, {name, value}) {
    if(value.length > 0) {
      this.setState({[`${name}Error`]: false })
      if(name === 'website') {
        if((/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)) || (/^(www\.)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/.test(value))) {
          this.setState({websiteError: false})
        } else {
          console.log('website error')
          this.setState({websiteError: true})
        }
      }
    } else {
      this.setState({[`${name}Error`]: true})
    }
    this.setState({[name]: value})
  }

  // getCategories(response) {
  //   // get data from JSON
  //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  //   axios.get('/spec.json')
  //     .then(res => {
  //       console.log('get categories', res)
  //       this.setState({
  //         categories: res.data.categories,
  //       })
  //
  //       this.props.history.push(`brandSummary/${response.data._id}`)
  //     })
  // }

  render() {
    const { handleSubmit } = this.props
    const state = this.state
    console.log('state', this.state)
    console.log('props', this.props)
    return (
      <div className="page-container">
        <h2 className="title">CreateBrand</h2>
        <div className="form-container">
          <Form className='create-brand'>
            <div>
              <Form.Field className={(state.renderError && state.nameError) === true ? 'ui error input' : 'ui input'}>
                <Input
                  placeholder="Brand Name"
                  name="name"
                  onChange={this.handleInput}
                  value={state.name}
                />
              </Form.Field>
              {(state.renderError && state.nameError) === true ? <p>Please enter Brand name</p> : ''}
              {this.props.create.error === true ?
                <p className='error-message'>Brand already exists</p> : ''}
            </div>
            <div>
              <Form.Field className={(state.renderError && state.websiteError) === true ? 'ui error input' : 'ui input'}>
                <Input
                  placeholder="Brand URL"
                  name="website"
                  onChange={this.handleInput}
                  value={state.website}
                />
              </Form.Field>
              {(state.renderError && state.websiteError) === true ? <p>Please enter valid Brand website</p> : ''}
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

// function validate(values) {
//   // console.log(values) -> {title: 'dksajkd', categories: "dkjsad", content: "kdsjakdj"}
//   const errors = {}
//
//   console.log(values)
//
//   // // Validate the inputs from "values"
//   if (!values.name) {
//     errors.name = 'Enter a name!'
//   }
//
//   if (!values.website) {
//     errors.website = 'Enter a valid website!'
//   }
//
//   if((/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(values.website)) || (/^(www\.)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/.test(values.website))) {
//     errors.website = null
//   } else {
//     errors.website = 'Enter a valid website!'
//   }
//
//   // If errors is empty, the form is fine to submit
//   // If errors has *any* properties, redux form assumes form is invalid
//   return errors
// }

function mapStateToProps(state) {
  return { create: state.createBrand, state }
}


export default connect(mapStateToProps, { createBrand })(CreateBrand)
