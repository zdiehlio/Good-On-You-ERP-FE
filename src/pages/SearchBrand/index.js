import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Brand, BrandSearchBar, UserSearchBar, DetailedList } from '../../components'
import { connect } from 'react-redux'
import { fetchBrands, fetchUsers } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { fetchUserInfo } from '../../actions'
import { Input, Header, Label, List } from 'semantic-ui-react'
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
          this.state.results.push({name: check.name, id: check.id.toString()})
        }
      })
    }
  }

  resetComponent(){
    this.setState({results: [], brand: '' })
  }

  handleChange(e, { value }){
    new Promise((resolve, reject) => {
      resolve(
        this.setState({
          results: [],
          brand: value,
        }))
    })
      .then(() => {
        this.props.fetchBrands(value)
      })
  }

  render() {
    return (
      <div className='page-container'>
        <div className='form-container'>
          <div className='button-and-search'>
            <Link to='/createBrand'><button>Create Brand</button></Link>
            <Input
              onChange={this.handleChange}
            />
          </div>
          <div className='searchlist-container'>
            {this.state.results.length > 0 ? (this.state.results.map((brand) => {
              return (
                <List divided verticalAlign='middle'>
                  <List.Item key={brand.id}>
                    <List.Content floated='right'>
                      <Link to={`/brandLanding/${brand.id}`}><button>Go</button></Link>
                    </List.Content>
                    <List.Content>
                      <Link to={`/brandLanding/${brand.id}`}>{brand.name} </Link>
                    </List.Content>
                  </List.Item>
                </List>
              )
            })) : <div></div>}
          </div>
        </div>
      </div>
    )
  }
}






function mapStateToProps(state) {
  return {search: state.search}
}

export default connect(mapStateToProps, { fetchBrands, fetchUserInfo })( SearchBrand )
