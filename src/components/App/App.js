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
  BrandFormContainer,
  BrandLanding,
  BrandSentences,
  SuppDataTypes,
  SuppDataAlias,
  SuppDataSocialMedia,
  SuppDataImage,
  RatingAnimal
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
      'Content-Type': 'application/json',
    };

    var dataString = '{ "strategy": "local", "email": "me@goodonyou.eco", "password": "myPassword" }';

    var options = {
      url: `${ROOT_URL}`,
      method: 'POST',
      path: '/authentication/',
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
    axios.get(`${ROOT_URL}/brands/?id=${id}`)
      .then(res => {
        console.log('res', res);
        this.setState({
          currentBrand: {
            'name': name,
            'id': id,
            summaryHeaderData: res.data.data[0]
          }
        })
        console.log('login state', this.state);
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
              <Route path='/login' component={props => <Login {...props} handleLogin={this.handleLogin} />}/>
              <Route path='/brandLanding/:id' component={BrandLanding} />
              <Route path='/brandSummary/:id' component={BrandSummary}/>
              <Route path='/createBrand' component={CreateBrands} />
              <Route path='/brandGeneral/:id' component={BrandGeneral}/>
              <Route path='/brandContact/:id' component={BrandContact} />
              <Route path='/ratingAnimal/:id' component={RatingAnimal} />
              <Route path='/brandCauses/:id' component={BrandCauses} />
              <Route path='/brandSentences/:id' component={BrandSentences} />
              <Route path='/suppDataCategory/:id' component={SuppDataCategory} />
              <Route path='/suppDataStyles/:id' component={SuppDataStyles} />
              <Route path='/suppDataRetailers/:id' component={SuppDataRetailers} />
              <Route path='/suppDataPrice/:id' component={SuppDataPrice} />
              <Route path='/suppDataGender/:id' component={SuppDataGender} />
              <Route path='/suppDataTypes/:id' component={SuppDataTypes} />
              <Route path='/suppDataAlias/:id' component={SuppDataAlias} />
              <Route path='/suppDataSocialMedia/:id' component={SuppDataSocialMedia} />
              <Route path='/suppDataImage/:id' component={SuppDataImage} />
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
