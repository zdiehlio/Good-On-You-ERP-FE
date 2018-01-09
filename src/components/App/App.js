import React, { Component } from 'react'
import { connect } from 'react-redux'
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

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentBrand: {
        'name': '',
        'url': '',
      },
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className="container-body">
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
          </div>
          <Footer/>
        </div>
      </Router>
    )
  }
}

export default App
