import React, { Component } from 'react';
import { Brand, SummaryHeader, SummaryRating } from '../../components';
import './BrandSummary.css';

class BrandSummary extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='page-container'>
        <SummaryHeader currentBrand={this.props.currentBrand}/>
        <SummaryRating currentBrand={this.props.currentBrand}/>
        <Brand name={this.props.currentBrand.name} url={this.props.currentBrand.url} category={this.props.currentBrand.category}/>
      </div>
    );
  }
}

export default BrandSummary;
