import React, { Component } from 'react';
import { Brand } from '../../components';
import './BrandSummary.css';

class BrandSummary extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='page-container'>
        <Brand name={this.props.currentBrand.name} url={this.props.currentBrand.url} category={this.props.currentBrand.category}/>
      </div>
    );
  }
}

export default BrandSummary;
