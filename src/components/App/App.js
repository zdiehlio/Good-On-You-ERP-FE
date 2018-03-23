import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
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
  SuppDataSku,
  ZolandoSearch,
} from '../../pages'
import ScrollToTop from '../scrollToTop'
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
          <ScrollToTop>
            <div className={this.props.login.token ? 'container-body' : 'container-body-login'}>
              <Route exact path='/' component={Login}/>
              <Route path='/login' component={Login}/>
              <Route path='/zolandosearch' component={ZolandoSearch}/>
              <Route path='/searchBrand' component={Authentication(SearchBrand)} />
              <Route path='/brandLanding/:id' component={Authentication(BrandLanding)} />
              <Route path='/brandSummary/:id' component={Authentication(BrandSummary)}/>
              <Route path='/createBrand' component={Authentication(CreateBrands)} />
              <Route path='/brandGeneral/:id' component={Authentication(BrandGeneral)}/>
              <Route path='/brandContact/:id' component={Authentication(BrandContact)} />
              <Route path='/env-resource/:id' component={Authentication(Rating)} />
              <Route path='/env-standards-compliance/:id' component={Authentication(Rating)} />
              <Route path='/env-climate-change/:id' component={Authentication(Rating)} />
              <Route path='/env-chemicals/:id' component={Authentication(Rating)} />
              <Route path='/env-water/:id' component={Authentication(Rating)} />
              <Route path='/env-positive-citizenship/:id' component={Authentication(Rating)} />
              <Route path='/env-negative-citizenship/:id' component={Authentication(Rating)} />
              <Route path='/labour-ethical-fashion-report/:id' component={Authentication(Rating)} />
              <Route path='/labour-certification/:id' component={Authentication(Rating)} />
              <Route path='/labour-policies-worker-empowerment/:id' component={Authentication(Rating)} />
              <Route path='/labour-supply-chain/:id' component={Authentication(Rating)} />
              <Route path='/labour-low-risk-production/:id' component={Authentication(Rating)} />
              <Route path='/labour-living-wage/:id' component={Authentication(Rating)} />
              <Route path='/labour-knowing-suppliers/:id' component={Authentication(Rating)} />
              <Route path='/labour-supplier-relationships-auditing/:id' component={Authentication(Rating)} />
              <Route path='/labour-positive-citizenship/:id' component={Authentication(Rating)} />
              <Route path='/labour-negative-citizenship/:id' component={Authentication(Rating)} />
              <Route path='/animal-animal-products/:id' component={Authentication(Rating)} />
              <Route path='/animal-positive-citizenship/:id' component={Authentication(Rating)} />
              <Route path='/animal-negative-citizenship/:id' component={Authentication(Rating)} />
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
              <Route path='/suppDataSku/:id' component={Authentication(SuppDataSku)} />
            </div>
          </ScrollToTop>
          <Footer/>
        </div>
      </Router>
    )
  }
}

function mapStateToProps(state) {
  return {login: state.login}
}

export default connect(mapStateToProps)(App)
