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
  CreateBrands,
  BrandSummary
} from '../../pages'
import './App.css';
import request from "request"


// <Route path=`/viewBrand/${this.state.currentBrand}` component={Summary} currentBrand={this.state.currentBrand} />



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentBrand: {
        'name': 'Nike',
        'url': 'www.nike.com/us/en_us/',
        'category': 'sports',
        'territory': {
          asia: true,
          europe: true,
          oceana: false,
          america: true,
        }
      }
    };

    // this.getData = this.getData.bind(this)
  }

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

  onViewSummaryClicked = (event) => {
    console.log(event.target.name);
    this.setState({
      currentBrand: {
        'name': event.target.name
      }
    })

  }

  render() {
    return (
      <Router>
        <div>
          <Header/>
          <div className="container-body">
            <Switch>
              <Route exact path='/' component={props => <Landing {...props} handleViewSummaryClick={this.onViewSummaryClicked}/>}/>
              <Route path='/questionnaire' component={Questionnaire}/>
              <Route path='/login' component={props => <Login {...props} handleLogin={this.handleLogin} />}/>
              <Route path='/brandSummary' component={props => <BrandSummary {...props} currentBrand={this.state.currentBrand} />}/>
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
