import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './SummaryRating.css';

const muiTheme = getMuiTheme({
  palette: {
    textColor: '#45058e',
    primary1Color: '#6ac1bf'
  }
});

const style = {
  width: '15px',
  height: '20px'
};

class BrandSummaryRating extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div className="page-container">
        <div className="summary-container-main">
          <p>Ratings:</p>
        </div>
      </div>
  }
}

export default BrandSummaryRating
