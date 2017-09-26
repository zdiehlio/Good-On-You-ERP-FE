import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div>
        <p>This is the landing page</p>
        <span><Link to='/viewBrands' className="landingButton">
          View Brands
        </Link></span>
        <span><Link to='/createBrand' className="landingButton">
          Create Brand
        </Link></span>
        <span><Link to='/questionnaire' className="landingButton">
          Questionnaire
        </Link></span>
      </div>
    );
  }
}

export default Landing;
