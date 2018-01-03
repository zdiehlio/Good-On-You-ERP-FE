import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Brand, BrandSearchBar, UserSearchBar, DetailedList } from '../../components'
import { connect } from 'react-redux'
import { fetchBrands, fetchUsers } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { fetchUserInfo } from '../../actions'
import { Search, Grid, Header } from 'semantic-ui-react'
import _ from 'lodash'

import './searchbrand.css'

class SearchBrand extends Component {

  constructor(props) {
    super(props)

    this.state = {
      search: '',
      brand: '',
      results: [],
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSearch=this.handleSearch.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.search !== this.props.search) {
      _.map(nextProps.search.brands.data, check => {
        if(this.state.brand) {
          Object.assign()
        }
      })
    }
  }

  handleSearch(event) {
    this.props.fetchBrands(this.state.brand)
  }

  handleChange(e, { value }){
    new Promise((resolve, reject) => {
      resolve(this.props.fetchBrands(this.state.brand))
        .then(() => {
          console.log('res', this.props)
          this.setState({
            brand: e.target.value,
          })
        })
    })
  }

  render() {
    console.log('props', this.props.search)
    console.log(this.state.results)
    const { handleSubmit } = this.props

    return (
      <div className="page-container">
        <div className="search-container">
          <div className="button-and-search">
            <Link to='/createBrand'><button>Create Brand</button></Link>
            <Grid>
              <Grid.Column width={8}>
                <Search
                  onResultSelect={this.handleSearch}
                  onSearchChange={this.handleChange}
                  results={this.state.results}
                />
              </Grid.Column>
            </Grid>
          </div>
        </div>
        <ul className="list-container">
          {this.state.results ? (this.state.results.map((brand) => {
            return <li key={brand.id}> <Link to={`/brandLanding/${brand.id}`}>{brand.name} </Link></li>
          })) : <div></div>}
        </ul>
      </div>
    )
  }
}






function mapStateToProps(state) {
  return {search: state.search}
}

export default connect(mapStateToProps, { fetchBrands, fetchUserInfo })( SearchBrand )
