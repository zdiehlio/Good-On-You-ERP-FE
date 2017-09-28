import React, { Component } from 'react';
import { Brand, SummaryHeader } from '../../components';
import './BrandSummary.css';

class BrandSummary extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='page-container'>
        <SummaryHeader brand={this.props.currentBrand}/>
        <Brand name={this.props.currentBrand.name} url={this.props.currentBrand.url} category={this.props.currentBrand.category}/>

      </div>
    );
  }
}

export default BrandSummary;
