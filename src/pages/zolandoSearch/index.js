import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Brand, BrandSearchBar, UserSearchBar, DetailedList } from '../../components'
import { connect } from 'react-redux'
import { filteredSearch, fetchUsers } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { fetchUserInfo } from '../../actions'
import { Form, Input, Header, Label, List, Loader, Icon, Select, Button } from 'semantic-ui-react'
import _ from 'lodash'

import './zolandoSearch.css'

class ZolandoSearch extends Component {


  constructor(props) {
    super(props)

    this.state = {
      search: '',
      brand: '',
      order: 'asc',
      filter: {},
      results: [],
      searchResults: [],
    }
    this.handleSearch=this.handleSearch.bind(this)
    this.handleFilter=this.handleFilter.bind(this)
    this.handleSort=this.handleSort.bind(this)
  }

  componentWillMount() {
    this.props.filteredSearch()
    this.setState({isLoading: true})
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.zolando !== this.props.zolando) {
      this.setState({
        isLoading: false,
        results: nextProps.zolando.brands,
      })
    }
  }

  handleFilter(event, { value, name }) {
    event.preventDefault()
    new Promise(resolve => {
      resolve(Object.assign(this.state.filter, { filters: { [name]: value }}))
    })
      .then(this.props.filteredSearch(this.state.filter))
  }

  handleSort(event, { value, name }) {
    event.preventDefault()
    new Promise(resolve => {
      resolve(this.setState({order: this.state.order === 'asc' ? 'desc' : 'asc'}))
    })
      .then(Object.assign(this.state.filter, { sort: { key: name, order: this.state.order}}))
      .then(this.props.filteredSearch(this.state.filter))
  }

  handleSearch(event, { value }) {
    event.preventDefault()
    this.props.filteredSearch({name: value})
    this.setState({isLoading: true})
  }

  renderResults() {
    if(this.state.isLoading === true) {
      return (<Loader active inline='centered' />)
    } else if(!this.props.zolando.brands) {
      return _.map(this.props.zolando, brand => {
        return(
          <div className='filtered-list' key={brand.id}>
            <div>
              <p>{brand.name}</p>
              <p>{brand.website}</p>
            </div>
            <div>{brand.score}</div>
            <div>{brand.environment.label}</div>
            <div>{brand.labour.label}</div>
            <div>{brand.animal.label}</div>
            <div>{brand.categories}</div>
            <div>{brand.sku}</div>
          </div>
        )
      })
    } else {
      return _.map(this.props.zolando.brands, brand => {
        return(
          <div className='filtered-list' key={brand.id}>
            <div>
              <Link to={`/zolandoBrandPage/${brand.id}`}><p>{brand.name}</p></Link>
              <p>{brand.website}</p>
            </div>
            <div>{brand.score}</div>
            <div>{brand.environment.label}</div>
            <div>{brand.labour.label}</div>
            <div>{brand.animal.label}</div>
            <div>{brand.categories}</div>
            <div>{brand.sku}</div>
          </div>
        )
      })
    }
  }


  // setTimeout(() => {sessionStorage.clear()}, 1000 * 60 * 60 * 24)

  render() {
    const state = this.state
    console.log('props', this.props.zolando)
    console.log('state', this.state)
    return (
      <div className='zolando-container'>
        <div className='search-bar-container'>
          <div className='button-and-search'>
            <Form.Field>
              <Input
                placeholder='Search Brands'
                onChange={this.handleSearch}
                icon='search'
              />
            </Form.Field>
          </div>
        </div>
        <div>
          <Form.Field>
            <Select
              name='sku'
              placeholder='SKU'
              onChange={this.handleFilter}
              options={[
                { key: '<50', value: '<50', text: '<50'},
                { key: '50-99', value: '50-99', text: '50-99'},
                { key: '100-249', value: '100-249', text: '100-249'},
                { key: '250-499', value: '250-499', text: '250-499'},
                { key: '>500', value: '>500', text: '>500'},
              ]}
            />
          </Form.Field>
        </div>
        <div className='form-container'>
          <Button name='sku' onClick={this.handleSort}>SKU<Icon name={this.state.order === 'asc' ? 'arrow down' : 'arrow up'}/></Button>
          {this.renderResults()}
        </div>
      </div>
    )
  }
}






function mapStateToProps(state) {
  return {zolando: state.zolando, state}
}

export default connect(mapStateToProps, { filteredSearch })( ZolandoSearch )
