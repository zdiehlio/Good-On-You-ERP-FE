import React, { Component } from 'react';
import logo from './../../logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Question from './../Question/Question';
import Header from  './../header/Header'
import Footer from  './../footer/Footer'
import Answer from './../answer/Answer';


class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="container-body">
          <div className="App">
            <Question></Question>
          </div>
          <Answer/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
