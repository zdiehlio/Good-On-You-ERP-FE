import React, { Component } from 'react';
import './Login.css';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import request from "request"


class Login extends Component {

  constructor(props) {
    super(props);
  }

  // handleLogin = () => {
  //
  //   var headers = {
  //     'Content-Type': 'application/json'
  //   };
  //
  //   var dataString = '{ "strategy": "local", "email": "me@goodonyou.eco", "password": "myPassword" }';
  //
  //   var options = {
  //     url: 'http://34.211.121.82:3030/authentication/',
  //     method: 'POST',
  //     headers: headers,
  //     body: dataString
  //   };
  //
  //   function callback(error, response, body) {
  //     if (!error) {
  //       if (JSON.parse(body).accessToken) {
  //         console.log(JSON.parse(body).accessToken);
  //       }
  //     }
  //   }
  //
  //   request(options, callback);
  // }
  render() {
    console.log(this.props.handleLogin);

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
          <button onClick={this.props.handleLogin} className="button" style={{width: "100px", marginTop: "20px"}}>Go</button>
        </div>
      </div>
    );
  }
}

export default Login;
