import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey900} from 'material-ui/styles/colors';
import './CreateBrand.css';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { createBrand } from '../../actions';
import axios from 'axios'


const muiTheme = getMuiTheme({
  palette: {
    textColor: grey900
  }
});

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
          {touched ? error : ""}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    console.log('values', values);
    this.props.createBrand(values, (response) => {
      this.getCategories(response)
    });
    console.log('submit');
  }

  getCategories(response) {
      // get data from JSON
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
      axios.get("/spec.json")
        .then(res => {
          console.log('get categories', res);
          this.setState({
            categories: res.data.categories
          })

          this.props.history.push(`brandSummary/${response.data._id}`)
        })
  }

  render() {
    const { handleSubmit } = this.props;

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
    );
  }
}

function validate(values) {
  // console.log(values) -> {title: 'dksajkd', categories: "dkjsad", content: "kdsjakdj"}
  const errors = {};

  console.log(values);

  // // Validate the inputs from "values"
  if (!values.name) {
    errors.name = "Enter a name!"
  }

  if (!values.url) {
    errors.url = "Enter a url!"
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

function mapStateToProps(state) {
  console.log(state);
  return { error: state.error }
}


export default reduxForm({
  validate,
  form: "CreateBrandForm"
})(connect(mapStateToProps, { createBrand })(CreateBrand))
