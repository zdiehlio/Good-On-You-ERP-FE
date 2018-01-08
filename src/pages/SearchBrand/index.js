import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Brand, BrandSearchBar, UserSearchBar, DetailedList } from '../../components'
import { connect } from 'react-redux'
import { fetchBrands, fetchUsers } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { fetchUserInfo } from '../../actions'
import { Search, Grid, Header, Label } from 'semantic-ui-react'
import _ from 'lodash'

import './searchbrand.css'

class SearchBrand extends Component {


  constructor(props) {
    super(props)

    this.state = {
      search: '',
      brand: '',
      results: [],
      renderResults: [],
    }
    this.handleChange=this.handleChange.bind(this)
  }

  componentWillMount() {
    this.resetComponent()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.search !== this.props.search) {
      _.map(nextProps.search.brands.data, check => {
        if(this.state.brand === check.name) {
          this.setState({currentSelection: check.id})
          this.state.results.push({title: check.name, description: check.id.toString()})
          this.state.renderResults.push({name: check.name, id: check.id})
        }
      })
    }
  }

  resetComponent(){
    this.setState({renderResults: [], results: [], brand: '' })
  }

  handleChange(e, { value }){
    setTimeout(() => {
      if(this.state.brand.length < 1) return this.resetComponent()
    }, 500)
    new Promise((resolve, reject) => {
      resolve(
        this.setState({
          brand: value,
        }))
    })
      .then(() => {
        this.props.fetchBrands(value)
      })
  }

  render() {
    console.log('props', this.props)
    console.log(this.state)
    const { handleSubmit } = this.props

    return (
      <div className="page-container">
        <div className="search-container">
          <div className="button-and-search">
            <Link to='/createBrand'><button>Create Brand</button></Link>
            <Grid>
              <Grid.Column width={8}>
                <Search
                  onSearchChange={this.handleChange}
                  results={this.state.results}
                  value={this.state.brand}
                  resultRenderer={({ title }) => <Link to={`/brandLanding/${this.state.currentSelection}`}><Label content={title} /></Link>}
                />
              </Grid.Column>
            </Grid>
          </div>
        </div>
        <ul className="list-container">
          {this.state.results.length > 0 ? (this.state.renderResults.map((brand) => {
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
