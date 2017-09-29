import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey900} from 'material-ui/styles/colors';
import './CreateBrand.css';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';

const muiTheme = getMuiTheme({
  palette: {
    textColor: grey900
  }
});

// <MuiThemeProvider muiTheme={muiTheme}>
// <TextField
//   hintText="brand name"
//   floatingLabelText="Brand Name"
// /></MuiThemeProvider>
//
// <MuiThemeProvider muiTheme={muiTheme}>
// <TextField
//   hintText="http://www.brand.url"
//   floatingLabelText="Brand URL"
// /></MuiThemeProvider>
//
// <MuiThemeProvider muiTheme={muiTheme}>
// <TextField
//   hintText="abc@email.com"
//   floatingLabelText="Contact Email"
// /></MuiThemeProvider>
// <br />
// <button className="button"><span>GO</span></button>



class CreateBrand extends Component {

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

  onSubmit(values) {
    console.log(values);
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
              name="url"
              type="text"
              component={this.renderField}
            ></Field>
            <Field
              label="Brand Email"
              name="email"
              type="email"
              component={this.renderField}
            ></Field>
            <button className="button">Submit</button>
          </form>
        </div>


      </div>
    );
  }
}

export default reduxForm({
  form: "CreateBrandForm"
})(CreateBrand)
