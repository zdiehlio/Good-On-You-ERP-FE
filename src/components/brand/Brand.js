import React from 'react'
import './Brand.css';
import { Link } from 'react-router-dom';

const Brand = (brand) => {
  const name = brand.name;
  const category = brand.category;

  return (
    <div className="brand-container">
      <div className="brand-row list-item">
        <a className="brand-url">{name}</a>
        <p className="brand-category">{category}</p>
        <Link name={brand.name} onClick={brand.handleViewSummaryClick} to={`/brandSummary/${brand.brandId}`} className='landingButton' style={{width: "100px", height:"40px"}}>view</Link>
      </div>
    </div>
  )
}

export default Brand
