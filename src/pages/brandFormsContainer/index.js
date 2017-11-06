import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import BrandGeneral from '../brandGeneral'


class BrandFormContainer extends Component {
  render() {
    return(
      <Router>
        <div>
          This is the Form Container
          <Switch>
          <Route path='/brandGeneral/:brandId' component={BrandGeneral}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default BrandFormContainer
