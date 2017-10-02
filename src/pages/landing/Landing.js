import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Brand, BrandSearchBar, UserSearchBar, DetailedList } from '../../components';
import './Landing.css';
import { connect } from 'react-redux';
import { fetchBrands } from '../../actions';




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
        <p>This is the landing page</p>
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
          {sampleBrands.map((brand, i) => {
            return <Brand key={i} handleViewSummaryClick={this.props.handleViewSummaryClick} name={brand.name} url={brand.url} category={brand.category} territory={brand.description}/>
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {

  }
}

export default connect(mapStateToProps, { fetchBrands })( Landing )
