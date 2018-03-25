import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Brand, BrandSearchBar, UserSearchBar, DetailedList } from '../../components'
import { connect } from 'react-redux'
import { filteredSearch, fetchUsers } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { fetchUserInfo } from '../../actions'
import { Form, Input, Header, Label, List, Loader, Icon, Select, Button } from 'semantic-ui-react'
import { CSVLink } from 'react-csv'
import _ from 'lodash'

import './zolandoSearch.css'

class ZolandoSearch extends Component {


  constructor(props) {
    super(props)

    this.state = {
      search: '',
      brand: '',
      order: 'asc',
      filter: {filters: {}, sort: {}},
      filterOptions: ['sku', 'categories', 'score', 'environment', 'labour', 'animal'],
      results: [],
      searchResults: [],
      sku: [],
      categories: [],
      score: [],
      environment: [],
      labour: [],
      animal: [],
    }
    this.handleSearch=this.handleSearch.bind(this)
    this.handleFilter=this.handleFilter.bind(this)
    this.handleSort=this.handleSort.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleClear=this.handleClear.bind(this)
  }

  componentWillMount() {
    this.props.filteredSearch()
    this.setState({isLoading: true})
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.zolando !== this.props.zolando) {
      this.setState({
        isLoading: false,
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
            sku: val.sku,
          }
        }),
      })
    }
  }

  handleFilter(event, { value, name }) {
    event.preventDefault()
    Object.assign(this.state.filter.filters, { [name]: value })
    if(this.state.filter.filters[name].length <=0) {
      delete this.state.filter.filters[name]
    }
    this.setState({sku: value})
    console.log('filter', value)
  }

  handleSort(event, { name }) {
    event.preventDefault()
    new Promise(resolve => {
      resolve(this.setState({isLoading: true, [`sort${name}`]: this.state[`sort${name}`]=== 'asc' ? 'desc' : 'asc'}))
    })
      .then(Object.assign(this.state.filter.sort, { key: name, order: this.state[`sort${name}`]}))
      .then(this.props.filteredSearch(this.state.filter))
  }

  handleSearch(event, { value }) {
    event.preventDefault()
    this.props.filteredSearch({name: value})
    this.setState({isLoading: true})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.filteredSearch(this.state.filter)
  }

  handleClear(event) {
    event.preventDefault()
    this.state.filterOptions.map(val => {
      this.setState({[val]: []})
    })
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
            <div>
              {brand.dots >= 1 ? <Icon name='circle'/> : <Icon name='circle thin' />}
              {brand.dots >= 2 ? <Icon name='circle'/> : <Icon name='circle thin' />}
              {brand.dots >= 3 ? <Icon name='circle'/> : <Icon name='circle thin' />}
              {brand.dots >= 4 ? <Icon name='circle'/> : <Icon name='circle thin' />}
              {brand.dots >= 5 ? <Icon name='circle'/> : <Icon name='circle thin' />}
              {}
            </div>
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
            <div>
              {brand.dots >= 1 ? <Icon name='circle'/> : <Icon name='circle thin' />}
              {brand.dots >= 2 ? <Icon name='circle'/> : <Icon name='circle thin' />}
              {brand.dots >= 3 ? <Icon name='circle'/> : <Icon name='circle thin' />}
              {brand.dots >= 4 ? <Icon name='circle'/> : <Icon name='circle thin' />}
              {brand.dots >= 5 ? <Icon name='circle'/> : <Icon name='circle thin' />}
            </div>
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
    console.log('props', this.props.zolando.brands)
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
        <CSVLink data={this.state.results}>Export to Excel</CSVLink>
        <div className='zolando-filters'>
          <Form.Field>
            <Select
              name='sku'
              placeholder='SKU'
              onChange={this.handleFilter}
              fluid
              multiple
              selection
              value={this.state.sku}
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
              multiple selection
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
              multiple selection
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
              multiple selection
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
              multiple selection
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
              multiple selection
              options={[
                { key: 'it\'s a start', value: 'it\'s a start', text: 'it\'s a start'},
                { key: 'good', value: 'good', text: 'good'},
                { key: 'great', value: 'great', text: 'great'},
              ]}
            />
          </Form.Field>
          <div><button onClick={this.handleSubmit}>Apply</button></div>
        </div>
        <p onClick={this.handleClear}>Clear All</p>
        <div className='zolando-container'>
          <div className='sort'><Button name='name' onClick={this.handleSort}>Brand name<Icon name={this.state.sortname === 'asc' ? 'arrow down' : 'arrow up'}/></Button></div>
          <div className='sort'><Button name='score' onClick={this.handleSort}>Overall Score<Icon name={this.state.sortscore === 'asc' ? 'arrow down' : 'arrow up'}/></Button></div>
          <div className='sort'><Button name='environment' onClick={this.handleSort}>Environment<Icon name={this.state.sortenvironment === 'asc' ? 'arrow down' : 'arrow up'}/></Button></div>
          <div className='sort'><Button name='labour' onClick={this.handleSort}>Labour<Icon name={this.state.sortlabour === 'asc' ? 'arrow down' : 'arrow up'}/></Button></div>
          <div className='sort'><Button name='animal' onClick={this.handleSort}>Animal<Icon name={this.state.sortanimal === 'asc' ? 'arrow down' : 'arrow up'}/></Button></div>
          <div className='sort'><Button name='categories' onClick={this.handleSort}>Categories<Icon name={this.state.sortcategories === 'asc' ? 'arrow down' : 'arrow up'}/></Button></div>
          <div className='sort'><Button name='sku' onClick={this.handleSort}>SKU<Icon name={this.state.sortsku === 'asc' ? 'arrow down' : 'arrow up'}/></Button></div>
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
