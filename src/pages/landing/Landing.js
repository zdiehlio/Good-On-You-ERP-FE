import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Brand } from '../../components';
import './Landing.css';

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
          <span><Link to='/viewBrands' className="landingButton">
            View Brands
          </Link></span>
          <span><Link to='/createBrand' className="landingButton">
            Create Brand
          </Link></span>
          <span><Link to='/createBrand' className="landingButton">
            Place holder
          </Link></span>
          <span><Link to='/createBrand' className="landingButton">
            Place holder
          </Link></span>
        </div>
        <ul>
          {sampleBrands.map((brand, i) => {
            return <Brand key={i} handleViewSummaryClick={this.props.handleViewSummaryClick} name={brand.name} url={brand.url} category={brand.category} territory={brand.description}/>
          })}
        </ul>
      </div>
    );
  }
}

export default Landing;
