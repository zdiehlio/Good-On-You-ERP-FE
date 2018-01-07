import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Authentication from '../requireAuth'
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
  Rating,
  SearchBrand,
  BrandGeneral,
  BrandContact,
  BrandCauses,
} from '../../pages'
import axios from 'axios'
import request from 'request'

import './App.css'

// <Route path=`/viewBrand/${this.state.currentBrand}` component={Summary} currentBrand={this.state.currentBrand} />



class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentBrand: {
        'name': '',
        'url': '',
      },
    }

    // this.getData = this.getData.bind(this)
  }

  handleLogin(){

    var headers = {
      'Content-Type': 'application/json',
    }

    var dataString = '{ "strategy": "local", "email": "me@goodonyou.eco", "password": "myPassword" }'

    var options = {
      url: `${ROOT_URL}`,
      method: 'POST',
      path: '/authentication/',
      headers: headers,
      body: dataString,
    }

    function callback(error, response, body) {
      if (!error) {
        if (JSON.parse(body).accessToken) {
          console.log('access', JSON.parse(body).accessToken)
        }
      }
    }

    request(options, callback)
  }

  // onViewSummaryClicked(id, name){
  //   this.setState({
  //     currentBrand: {
  //       'name': name,
  //       'id': id,
  //     },
  //   })
  //
  //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  //   axios.get(`${ROOT_URL}/brands/?id=${id}`)
  //     .then(res => {
  //       console.log('res', res)
  //       this.setState({
  //         currentBrand: {
  //           'name': name,
  //           'id': id,
  //           summaryHeaderData: res.data.data[0],
  //         },
  //       })
  //       console.log('login state', this.state)
  //     })
  // }

  render() {
    console.log('app', sessionStorage)
    return (
      <Router>
        <div>
          <Header/>
          <div className="container-body">
            <Switch>
              <Route exact path='/' component={Login}/>
              <Route path='/login' component={Login}/>
              <Route path='/searchBrand' component={Authentication(SearchBrand)} />
              <Route path='/brandLanding/:id' component={Authentication(BrandLanding)} />
              <Route path='/brandSummary/:id' component={Authentication(BrandSummary)}/>
              <Route path='/createBrand' component={Authentication(CreateBrands)} />
              <Route path='/brandGeneral/:id' component={Authentication(BrandGeneral)}/>
              <Route path='/brandContact/:id' component={Authentication(BrandContact)} />
              <Route path='/resource/:id' component={Authentication(Rating)} />
              <Route path='/energy/:id' component={Authentication(Rating)} />
              <Route path='/chemical/:id' component={Authentication(Rating)} />
              <Route path='/water/:id' component={Authentication(Rating)} />
              <Route path='/worker_policies/:id' component={Authentication(Rating)} />
              <Route path='/wages/:id' component={Authentication(Rating)} />
              <Route path='/suppliers/:id' component={Authentication(Rating)} />
              <Route path='/practices/:id' component={Authentication(Rating)} />
              <Route path='/rights/:id' component={Authentication(Rating)} />
              <Route path='/fur/:id' component={Authentication(Rating)} />
              <Route path='/leather/:id' component={Authentication(Rating)} />
              <Route path='/wool/:id' component={Authentication(Rating)} />
              <Route path='/feathers/:id' component={Authentication(Rating)} />
              <Route path='/angora/:id' component={Authentication(Rating)} />
              <Route path='/hairs/:id' component={Authentication(Rating)} />
              <Route path='/skins/:id' component={Authentication(Rating)} />
              <Route path='/brandCauses/:id' component={Authentication(BrandCauses)} />
              <Route path='/brandSentences/:id' component={Authentication(BrandSentences)} />
              <Route path='/suppDataCategory/:id' component={Authentication(SuppDataCategory)} />
              <Route path='/suppDataStyles/:id' component={Authentication(SuppDataStyles)} />
              <Route path='/suppDataRetailers/:id' component={Authentication(SuppDataRetailers)} />
              <Route path='/suppDataPrice/:id' component={Authentication(SuppDataPrice)} />
              <Route path='/suppDataGender/:id' component={Authentication(SuppDataGender)} />
              <Route path='/suppDataTypes/:id' component={Authentication(SuppDataTypes)} />
              <Route path='/suppDataAlias/:id' component={Authentication(SuppDataAlias)} />
              <Route path='/suppDataSocialMedia/:id' component={Authentication(SuppDataSocialMedia)} />
              <Route path='/suppDataImage/:id' component={Authentication(SuppDataImage)} />
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    )
  }
}

export default App
