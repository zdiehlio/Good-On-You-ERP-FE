import React, { Component } from 'react'
import SearchBar from 'material-ui-search-bar'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {grey900} from 'material-ui/styles/colors'
import { connect } from 'react-redux'
import { fetchBrands } from '../../actions'
import { Search, Grid, Header } from 'semantic-ui-react'

import './BrandSearchBar.css'

class BrandSearchBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      search: '',
      brand: '',
      result: '',
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSearch=this.handleSearch.bind(this)
  }

  handleSearch(event) {
    this.props.fetchBrands(this.state.brand)
  }

  handleChange(event){
    this.props.fetchBrands(this.state.brand)
    this.setState({
      brand: event.target.value,
      search: event.target.value,
    })
  }

  render() {
    return <div className="searchBar">
      <Grid>
        <Grid.Column width={8}>
          <Search
            onResultSelect={this.handleSearch}
            onSearchChange={this.handleChange}
            results={this.state.brand}
            value={this.state.search}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    </div>
  }
}


export default connect(null, { fetchBrands })(BrandSearchBar)
