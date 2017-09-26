import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

class Landing extends Component {
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
      </div>
    );
  }
}

export default Landing;
