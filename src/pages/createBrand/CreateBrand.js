import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey900} from 'material-ui/styles/colors';
import './CreateBrand.css';

const muiTheme = getMuiTheme({
  palette: {
    textColor: grey900
  }
});

class CreateBrand extends Component {
  render() {
    return (
      <div className="page-container">
        <h2 className="title">CreateBrand</h2>
        <div className="form-container">
          <MuiThemeProvider muiTheme={muiTheme}>
          <TextField
            hintText="brand name"
            floatingLabelText="Brand Name"
          /></MuiThemeProvider>

          <MuiThemeProvider muiTheme={muiTheme}>
          <TextField
            hintText="http://www.brand.url"
            floatingLabelText="Brand URL"
          /></MuiThemeProvider>

          <MuiThemeProvider muiTheme={muiTheme}>
          <TextField
            hintText="abc@email.com"
            floatingLabelText="Contact Email"
          /></MuiThemeProvider>
          <br />
          <button className="button"><span>GO</span></button>
        </div>


      </div>
    );
  }
}

export default CreateBrand;
