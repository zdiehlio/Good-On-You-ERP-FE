import React, { Component } from 'react';
import './Login.css';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class Login extends Component {
  render() {
    return (
      <div className="page-container">

        <h2 className="title">Log on</h2>
        <div className="form-container">
          <MuiThemeProvider>
            <TextField
              floatingLabelText="Email*"
            />
          </MuiThemeProvider>
          <MuiThemeProvider>
            <TextField
              floatingLabelText="Password*"
            />
          </MuiThemeProvider>
          <button className="button" style={{width: "100px", marginTop: "20px"}}>Go</button>
        </div>
      </div>
    );
  }
}

export default Login;
