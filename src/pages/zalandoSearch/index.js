import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Brand, BrandSearchBar, UserSearchBar, DetailedList } from '../../components'
import { connect } from 'react-redux'
import { filteredSearch, fetchUsers } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { fetchUserInfo } from '../../actions'
import { Form, Input, Header, Label, List, Loader, Icon, Select, Button, Dropdown } from 'semantic-ui-react'
import { CSVLink } from 'react-csv'
import _ from 'lodash'

import './zalandoSearch.css'

class ZalandoSearch extends Component {


  constructor(props) {
    super(props)

    this.state = {
      search: '',
      brand: '',
      order: 'asc',
      filter: {filters: {}, sort: {}},
      filterOptions: ['sku', 'categories', 'score', 'environment', 'labour', 'animal'],
      sortOptions: ['name', 'score', 'environment', 'labour', 'animal', 'categories', 'sku'],
      filteredArr: [],
      renderFilteredArr: [],
      results: [],
      searchResults: [],
      sku: [],
      categories: [],
      score: [],
      environment: [],
      labour: [],
      animal: [],
      filterApplied: false,
    }
    this.handleSearch=this.handleSearch.bind(this)
    this.handleFilter=this.handleFilter.bind(this)
    this.handleSort=this.handleSort.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleClear=this.handleClear.bind(this)
    this.handleChip=this.handleChip.bind(this)
  }

  componentWillMount() {
    this.props.filteredSearch()
    this.setState({isLoading: true})
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.zolando !== this.props.zolando) {
      if(!nextProps.zolando.brands) {
        this.setState({
          results: _.map(nextProps.zolando, val => {
            return {
              id: val.id,
              name: val.name,
              website: val.website,
              overall_score: val.score,
              environment: val.environment.label,
              labour: val.labour.label,
              animal: val.animal.label,
              categories: val.categories,
              dots: val.dots,
              sku: val.sku,
            }
          }),
        })
      } else {
        this.setState({
          results: _.map(nextProps.zolando.brands, val => {
            return {
              id: val.id,
              name: val.name,
              website: val.website,
              overall_score: val.score,
              environment: val.environment.label,
              labour: val.labour.label,
              animal: val.animal.label,
              categories: val.categories,
              dots: val.dots,
              sku: val.sku,
            }
          }),
        })
      }
      this.setState({
        isLoading: false,
      })
    }
  }

  handleFilter(event, { value, name }) {
    event.preventDefault()
    // this.state.filter.filters[name].push(value)
    if(this.state.filter.filters[name]) {
      this.state.filter.filters[name].push(value)
    } else {
      Object.assign(this.state.filter.filters, {[name]: [value] })
    }
    if(this.state.filteredArr.includes(name + ': ' + value + ' X')) {
      console.log(value)
    } else {
      this.setState({filteredArr: [...this.state.filteredArr, name + ': ' + value + ' X']})
    }
  }

  handleChip(event) {
    event.preventDefault()
    console.log(event.target.value)
    this.setState({filteredArr: this.state.filteredArr.filter(val => val !== event.target.value)})
  }

  handleSort(event, { name }) {
    event.preventDefault()
    this.state.filterOptions.map(opt => {
      if(name !== opt) {
        this.setState({[`sort${opt}`]: null})
      }
    })
    Promise.resolve(this.setState({isLoading: true, [`sort${name}`]: !this.state[`sort${name}`] || this.state[`sort${name}`] === 'desc' ? 'asc' : 'desc'}))
      .then(Object.assign(this.state.filter.sort, { key: name, order: this.state[`sort${name}`]}))
      .then(this.props.filteredSearch(this.state.filter))
  }

  handleSearch(event, { value }) {
    event.preventDefault()
    let searchArr = []
    Promise.resolve(
      this.state.results.map(brand => {
        if(brand.name.toLowerCase().includes(value.toLowerCase())) {
          searchArr.push({
            id: brand.id,
            name: brand.name,
            website: brand.website,
            overall_score: brand.score,
            environment: brand.environment,
            labour: brand.labour,
            animal: brand.animal,
            categories: brand.categories,
            dots: brand.dots,
            sku: brand.sku,
          })
        }
      })
    ).then(this.setState({searchResults: searchArr}))
  }

  handleSubmit(event) {
    event.preventDefault()
    Promise.resolve(this.setState({renderFilteredArr: this.state.filteredArr})).then(this.setState({filterApplied: true, filteredArr: []}))
    this.props.filteredSearch(this.state.filter)
  }

  handleClear(event) {
    this.setState({isLoading: true, filterApplied: false, renderFilteredArr: [], filter: {filters: {}, sort: {}}})
    this.props.filteredSearch()
  }

  populateRender(brand) {
    return(
      <div className='filtered-items' key={brand.id}>
        <div>
          <Link to={`/zalandoBrandPage/${brand.id}`}><p>{brand.name}</p></Link>
          <p><a href={brand.website.slice(0, 3) !== 'http' ? `http://${brand.website}` : brand.website}>Website</a></p>
        </div>
        <div>
          {brand.dots >= 1 ? <Icon name='circle'/> : <Icon name='circle thin' />}
          {brand.dots >= 2 ? <Icon name='circle'/> : <Icon name='circle thin' />}
          {brand.dots >= 3 ? <Icon name='circle'/> : <Icon name='circle thin' />}
          {brand.dots >= 4 ? <Icon name='circle'/> : <Icon name='circle thin' />}
          {brand.dots >= 5 ? <Icon name='circle'/> : <Icon name='circle thin' />}
          {}
        </div>
        <div>{brand.environment}</div>
        <div>{brand.labour}</div>
        <div>{brand.animal}</div>
        <div>{brand.categories}</div>
        <div>{brand.sku}</div>
      </div>
    )
  }

  renderSortButtons() {
    return this.state.sortOptions.map(val => {
      return (
        <div key={val} className='sort'><Button basic color={this.state[`sort${val}`] ? 'teal' : 'grey'} name={val} onClick={this.handleSort}>{val} <Icon name={!this.state[`sort${val}`] || this.state[`sort${val}`] === 'desc' ? 'arrow down' : 'arrow up'}/></Button></div>
      )
    })
  }

  renderResults() {
    if(this.state.isLoading === true) {
      return (<Loader active inline='centered' />)
    } else if(this.state.searchResults.length > 0) {
      return _.map(this.state.searchResults, brand => {
        return this.populateRender(brand)
      })
    } else {
      return _.map(this.state.results, brand => {
        return this.populateRender(brand)
      })
    }
  }

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
        <div className='filtered-list'>
          <div className='excel'><CSVLink data={state.searchResults.length > 0 ? state.searchResults : state.results}><Button>Export to Excel <Icon name='file excel outline' /></Button></CSVLink></div>
          <div>{_.map(this.state.filteredArr, val => <button value={val} onClick={this.handleChip} key={val} className='chip'>{val}</button>)}</div>
          <div className='zolando-filters'>
            <Form.Field>
              <Select
                name='sku'
                placeholder='SKU'
                onChange={this.handleFilter}
                selectOnNavigation={false}
                text='SKU'
                options={[
                  { key: '<50', value: '<50', text: '<50'},
                  { key: '50-99', value: '50-99', text: '50-99'},
                  { key: '100-249', value: '100-249', text: '100-249'},
                  { key: '250-499', value: '250-499', text: '250-499'},
                  { key: '>500', value: '>500', text: '>500'},
                ]}
              />
            </Form.Field>
            <Form.Field>
              <Select
                name='categories'
                placeholder='Categories'
                onChange={this.handleFilter}
                text='Categories'
                selection
                options={[
                  { key: 'menswear', value: 'menswear', text: 'menswear'},
                  { key: 'womenswear', value: 'womenswear', text: 'womenswear'},
                  { key: 'basics', value: 'basics', text: 'basics'},
                  { key: 'designer', value: 'designer', text: 'designer'},
                  { key: 'underwear', value: 'underwear', text: 'underwear'},
                  { key: 'shoes', value: 'shoes', text: 'shoes'},
                  { key: 'bags', value: 'bags', text: 'bags'},
                  { key: 'fitness', value: 'fitness', text: 'fitness'},
                  { key: 'outdoor', value: 'outdoor', text: 'outdoor'},
                  { key: 'accessories', value: 'accessories', text: 'accessories'},
                  { key: 'maternity', value: 'maternity', text: 'maternity'},
                  { key: 'plus', value: 'plus', text: 'plus'},

                ]}
              />
            </Form.Field>
            <Form.Field>
              <Select
                name='score'
                placeholder='Score'
                onChange={this.handleFilter}
                text='Score'
                selection
                options={[
                  { key: 'it\'s a start', value: 'it\'s a start', text: 'it\'s a start'},
                  { key: 'good', value: 'good', text: 'good'},
                  { key: 'great', value: 'great', text: 'great'},
                ]}
              />
            </Form.Field>
            <Form.Field>
              <Select
                name='environment'
                placeholder='Environment'
                onChange={this.handleFilter}
                text='Environment'
                selection
                options={[
                  { key: 'it\'s a start', value: 'it\'s a start', text: 'it\'s a start'},
                  { key: 'good', value: 'good', text: 'good'},
                  { key: 'great', value: 'great', text: 'great'},
                ]}
              />
            </Form.Field>
            <Form.Field>
              <Select
                name='labour'
                placeholder='Labour'
                onChange={this.handleFilter}
                text='Labour'
                selection
                options={[
                  { key: 'it\'s a start', value: 'it\'s a start', text: 'it\'s a start'},
                  { key: 'good', value: 'good', text: 'good'},
                  { key: 'great', value: 'great', text: 'great'},
                ]}
              />
            </Form.Field>
            <Form.Field>
              <Select
                name='animal'
                placeholder='Animal'
                onChange={this.handleFilter}
                text='Animal'
                selection
                options={[
                  { key: 'it\'s a start', value: 'it\'s a start', text: 'it\'s a start'},
                  { key: 'good', value: 'good', text: 'good'},
                  { key: 'great', value: 'great', text: 'great'},
                ]}
              />
            </Form.Field>
            <div>{!state.filterApplied ? <button onClick={this.handleSubmit}>Apply</button> : <div className='clear' onClick={this.handleClear}>Clear All</div>}</div>
          </div>
          <div>{_.map(this.state.renderFilteredArr, val => <button value={val} onClick={this.handleChip} key={val} className='chip'>{val}</button>)}</div>


          <div className='sort-buttons'>{this.renderSortButtons()}</div>
          {this.renderResults()}
        </div>
      </div>
    )
  }
}






function mapStateToProps(state) {
  return {zolando: state.zolando, state}
}

export default connect(mapStateToProps, { filteredSearch })( ZalandoSearch )
