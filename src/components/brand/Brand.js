import React from 'react'
import './Brand.css';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {teal400} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    textColor: teal400
  }
});

// <Link name={brand.name} onClick={brand.handleViewSummaryClick} to='/brandSummary' className='button' style={{width: "100px", marginTop: "20px"}}>view</Link>
const Brand = (brand) => {

  const name = brand.name;
  const category = brand.category;

  return (
    <div className="page-container">
      <div className="brand-row list-item">
        <a className="brand-url">{name}</a>
        <p className="brand-category">{category}</p>
        <MuiThemeProvider muiTheme={muiTheme}>
          <FlatButton
            containerElement={<Link to="/brandSummary" />}
            label="view"/>
        </MuiThemeProvider>
      </div>
    </div>
  )
}

export default Brand
