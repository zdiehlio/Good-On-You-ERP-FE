import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Brand, BrandSearchBar, UserSearchBar, DetailedList } from '../../components'
import { connect } from 'react-redux'
import { fetchBrands, fetchUsers } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { fetchUserInfo } from '../../actions'
import { Form, Input, Header, Label, List, Loader, Icon } from 'semantic-ui-react'
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



  componentWillReceiveProps(nextProps) {
    if(nextProps.search !== this.props.search) {
      _.map(nextProps.search.brands.data, check => {
        if(this.state.brand === check.name) {
          this.setState({currentSelection: check.id, loading: null})
          this.state.results.push({name: check.name, id: check.id.toString()})
        }
      })
    }
  }


  // setTimeout(() => {sessionStorage.clear()}, 1000 * 60 * 60 * 24)

  loadContent() {
    if(this.state.loading) {
      setTimeout(() => {
        this.setState({loading: false})
      }, 1000 * 3)
    }
  }

  handleChange(e, { value }){
    new Promise((resolve, reject) => {
      resolve(
        this.loadContent(),
        this.setState({
          results: [],
          brand: value,
          loading: true,
        }))
    })
      .then(() => {
        this.props.fetchBrands(value)
      })
  }

  render() {
    const state = this.state
    console.log('state', this.props)
    return (
      <div className='page-container'>
        <div className='form-container'>
          <div className='button-and-search'>
            <Link to='/createBrand'><button>Create Brand</button></Link>
          </div>
          <div className='button-and-search'>OR</div>
          <div className='button-and-search'>
            <Form.Field>
              <Input
                placeholder='Search Brands'
                onChange={this.handleChange}
                icon='search'
              />
            </Form.Field>
          </div>
          <div className='searchlist-container'>
            {state.results.length <= 0 && state.brand.length > 0 && state.loading === false ? <p className='error-message'>no brand found, please check the spelling of the brand name or create a new brand</p> : state.loading === true ? <Loader active inline='centered' /> : ''}
            {state.results.length > 0 && state.results[0].name !== '' ? (state.results.map((brand) => {
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
  return {search: state.search, state}
}

export default connect(mapStateToProps, { fetchBrands, fetchUserInfo })( SearchBrand )
