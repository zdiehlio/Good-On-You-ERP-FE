import React, { Component } from 'react'
import './Brand.css';

const Brand = (brand) => {

  const name = brand.name;
  const url = brand.url;
  const category = brand.category;
  const territory = brand.territory;

  return (
    <div className="page-container">
      <div className="brand-row">
        <a className="brand-url" href={url}>{name}</a>
        <p className="brand-category">{category}</p>
        <a className="brand-view-summary">view</a>
      </div>
    </div>
  )
}

export default Brand
