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

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header/>
          <div className="container-body">
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route path='/questionnaire' component={Questionnaire} />
              <Route path='/login' component={Login} />
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
