import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Brand, BrandSearchBar, UserSearchBar, DetailedList } from '../../components';
import './Landing.css';
import { connect } from 'react-redux';
import { fetchBrands, fetchUsers } from '../../actions';




const sampleBrands = [
  {
    'name': 'Asos',
    'status': 'approved'
  },
  {
    'name': 'Nike',
    'status': 'rated'
  },
  {
    'name': 'Zara',
    'status': 'scrapped'
  },
  {
    'name': 'Zara',
    'status': 'scrapped'
  },
  {
    'name': 'Zara',
    'status': 'scrapped'
  },
  {
    'name': 'Zara',
    'status': 'scrapped'
  },
  {
    'name': 'Zara',
    'status': 'scrapped'
  },
  {
    'name': 'Zara',
    'status': 'scrapped'
  },
  {
    'name': 'Zara',
    'status': 'scrapped'
  },
  {
    'name': 'Zara',
    'status': 'scrapped'
  },
  {
    'name': 'Zara',
    'status': 'scrapped'
  },
  {
    'name': 'Zara',
    'status': 'scrapped'
  }
];

class Landing extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-container">
        <div className="button-container">
          <span><Link to='/createBrand' className="landingButton">
            Create Brand
          </Link></span>
          <BrandSearchBar/>
          <span><Link to='/createUser' className="landingButton">
            Create User
          </Link></span>
          <UserSearchBar/>
        </div>

        <ul className="list-container">
          {this.props.users ? (this.props.users.data.map((user, i) => {
            return <Brand key={i} handleViewSummaryClick={this.props.handleViewSummaryClick} name={user.username}/>
          })) : <div></div>}
        </ul>

        <ul className="list-container">
          {this.props.brands ? (this.props.brands.data.map((brand, i) => {
            return <Brand key={i} handleViewSummaryClick={this.props.handleViewSummaryClick} name={brand.name} url={brand.url} category={brand.category} territory={brand.description}/>
          })) : <div></div>}
        </ul>


      </div>
    );
  }
}






function mapStateToProps(state) {
  console.log(state.search);
  if (state.search) {
    return state.search
  }

  return {

  }
}


export default connect(mapStateToProps, null)( Landing )
