import React, { Component } from 'react';
import { Brand, SummaryHeader, SummaryBrandOverview, SummaryRating, SummaryQualitativeRating, SummarySupplementaryData } from '../../components';
import './BrandSummary.css';

class BrandSummary extends Component {

  constructor(props) {
    super(props);
  }
// <SummaryBrandOverview currentBrand={this.props.currentBrand}/>
  render() {
    return (
      <div className='page-container'>
        <SummaryHeader currentBrand={this.props.currentBrand} brandId={this.props.match.params.brandId}/>
        <SummaryBrandOverview currentBrand={this.props.currentBrand}/>
        <SummaryRating currentBrand={this.props.currentBrand} brandId={this.props.match.params.brandId}/>
        <SummaryQualitativeRating currentBrand={this.props.currentBrand}/>
        <SummarySupplementaryData currentBrand={this.props.currentBrand}/>
      </div>
    );
  }
}

export default BrandSummary;
