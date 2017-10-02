import React, { Component } from 'react';
import { Brand, SummaryHeader, SummaryRating, SummaryQualitativeRating, SummarySupplementaryData } from '../../components';
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
        <SummaryQualitativeRating currentBrand={this.props.currentBrand}/>
        <SummarySupplementaryData currentBrand={this.props.currentBrand}/>
      </div>
    );
  }
}

export default BrandSummary;
