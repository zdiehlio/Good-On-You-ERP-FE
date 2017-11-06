import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { ROOT_URL } from '../../actions'

import { Header, Footer } from '../index'
import {
  Landing,
  Questionnaire,
  Login,
  ViewBrands,
  CreateBrands,
  BrandSummary,
  CategoryQuestions,
  SuppDataCategory,
  SuppDataStyles,
  SuppDataRetailers,
  SuppDataPrice,
  SuppDataGender,
  SuppDataSimilarBrands,
  BrandFormContainer
} from '../../pages'
import BrandGeneral from '../../pages/brandGeneral'
import BrandContact from '../../pages/brandContact'
import BrandCauses from '../../pages/brandCauses'
import './App.css';
import axios from 'axios'
import request from "request"


// <Route path=`/viewBrand/${this.state.currentBrand}` component={Summary} currentBrand={this.state.currentBrand} />



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentBrand: {
        'name': 'Nike',
        'url': 'www.nike.com/us/en_us/'
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
      url: `${ROOT_URL}/authentication/`,
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

  onViewSummaryClicked = (id, name) => {
    this.setState({
      currentBrand: {
        'name': name,
        'id': id
      }
    })

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
    axios.get(`${ROOT_URL}/brands-general-info/?brand=${id}`)
      .then(res => {
        this.setState({
          currentBrand: {
            'name': name,
            'id': id,
            summaryHeaderData: res.data.data[0]
          }
        })
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
              <Route path='/questionnaire/brands/:brandId/themes/:themeId' component={Questionnaire}/>
              <Route path='/login' component={props => <Login {...props} handleLogin={this.handleLogin} />}/>
              <Route path='/brandSummary/:brand' component={props => <BrandSummary {...props} currentBrand={this.state.currentBrand} />}/>
              <Route path='/createBrand' component={CreateBrands} />
              <Route path='/brandGeneral/:brandId' component={BrandGeneral}/>
              <Route path='/brandContact' component={BrandContact} />
              <Route path='/brandCauses' component={BrandCauses} />
              <Route path='/suppDataCategory' component={SuppDataCategory} />
              <Route path='/suppDataStyles' component={SuppDataStyles} />
              <Route path='/suppDataRetailers' component={SuppDataRetailers} />
              <Route path='/suppDataPrice' component={SuppDataPrice} />
              <Route path='/suppDataGender' component={SuppDataGender} />
              <Route path='/suppDataSimilarBrands' component={SuppDataSimilarBrands} />
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
