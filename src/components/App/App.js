import React, { Component } from 'react';
import logo from './../../logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Question from './../Question/Question';


class App extends Component {
  render() {
    return (
      <div className="flex">
        <Question></Question>
      </div>
    );
  }
}

export default App;
