import React from 'react'
import './Brand.css';
import { Link } from 'react-router-dom';


const Brand = (brand) => {

  const name = brand.name;
  const category = brand.category;

  return (
    <div className="page-container">
      <div className="brand-row">
        <a className="brand-url">{name}</a>
        <p className="brand-category">{category}</p>
        <Link name={brand.name} onClick={brand.handleViewSummaryClick} to='/brandSummary' className='btn btn-large waves-effect waves-light darken-1'>view</Link>
      </div>
    </div>
  )
}

export default Brand
