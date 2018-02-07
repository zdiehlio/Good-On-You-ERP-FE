import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {grey900} from 'material-ui/styles/colors'
import './CreateBrand.css'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createBrand } from '../../actions'
import axios from 'axios'


const muiTheme = getMuiTheme({
  palette: {
    textColor: grey900,
  },
})

class CreateBrand extends Component {

  renderField(field) {
    const { meta: { touched, error } } = field

    return (
      <div>
        <MuiThemeProvider>
          <TextField
            floatingLabelText={field.label}
            type={field.type}
            {...field.input}
          />
        </MuiThemeProvider>
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createBrand(values, (response) => {
      this.props.history.push(`/brandLanding/${response.data.id}`)
    })
  }

  getCategories(response) {
    // get data from JSON
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
    axios.get('/spec.json')
      .then(res => {
        console.log('get categories', res)
        this.setState({
          categories: res.data.categories,
        })

        this.props.history.push(`brandSummary/${response.data._id}`)
      })
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div className="page-container">
        <h2 className="title">CreateBrand</h2>
        <div className="form-container">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="Brand Name"
              name="name"
              type="text"
              component={this.renderField}
            ></Field>
            <Field
              label="Brand URL"
              name="website"
              type="text"
              component={this.renderField}
            ></Field>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

function validate(values) {
  // console.log(values) -> {title: 'dksajkd', categories: "dkjsad", content: "kdsjakdj"}
  const errors = {}

  console.log(values)

  // // Validate the inputs from "values"
  if (!values.name) {
    errors.name = 'Enter a name!'
  }

  if (!values.website) {
    errors.website = 'Enter a valid website!'
  }

  if((/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(values.website)) || (/^(www\.)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/.test(values.website))) {
    errors.website = null
  } else {
    errors.website = 'Enter a valid website!'
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors
}

function mapStateToProps(state) {
  console.log(state)
  return { error: state.error }
}


export default reduxForm({
  validate,
  form: 'CreateBrandForm',
})(connect(mapStateToProps, { createBrand })(CreateBrand))
