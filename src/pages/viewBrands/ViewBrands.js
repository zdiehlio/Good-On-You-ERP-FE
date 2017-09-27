import React, { Component } from 'react';
import { Brand } from '../../components';
import './ViewBrands.css';

const sampleBrands = [
  {
    'name': 'Asos',
    'url': 'www.asos.com/au/',
    'category': 'high fashion',
    'territory': {
      asia: true,
      europe: true,
      oceana: false,
      america: true,
    }
  },
  {
    'name': 'Nike',
    'url': 'www.nike.com/us/en_us/',
    'category': 'sports',
    'territory': {
      asia: true,
      europe: true,
      oceana: false,
      america: true,
    }
  },
  {
    'name': 'Zara',
    'url': 'www.zara',
    'category': 'casual wear',
    'territory': {
      asia: true,
      europe: true,
      oceana: false,
      america: true,
    }
  },
];

class ViewBrands extends Component {
  render() {
    return (
      <div className='page-container'>
        <ul>
          {sampleBrands.map((brand) => {
            return <Brand name={brand.name} url={brand.url} category={brand.category} territory={brand.description}/>
          })}
        </ul>
      </div>
    );
  }
}

export default ViewBrands;
