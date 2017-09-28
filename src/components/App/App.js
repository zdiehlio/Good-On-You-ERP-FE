import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { Header, Footer } from '../index'
import {
  Landing,
  Questionnaire,
  Login,
  ViewBrands,
  CreateBrands
} from '../../pages'
import './App.css';
import request from "request"


class App extends Component {

  handleLogin = () => {

    var headers = {
      'Content-Type': 'application/json'
    };

    var dataString = '{ "strategy": "local", "email": "me@goodonyou.eco", "password": "myPassword" }';

    var options = {
      url: 'http://34.211.121.82:3030/authentication/',
      method: 'POST',
      headers: headers,
      body: dataString
    };

    function callback(error, response, body) {
      if (!error) {
        if (JSON.parse(body).accessToken) {
          console.log(JSON.parse(body).accessToken);
        }
      }
    }

    request(options, callback);
  }

  render() {
    return (
      <Router>
        <div>
          <Header/>
          <div className="container-body">
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route path='/questionnaire' component={Questionnaire}/>
              <Route path='/login' component={props => <Login {...props} handleLogin={this.handleLogin} />}/>
              <Route path='/viewBrands' component={ViewBrands} />
              <Route path='/createBrand' component={CreateBrands} />
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
