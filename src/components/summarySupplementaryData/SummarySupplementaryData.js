import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './SummarySupplementaryData.css';

const muiTheme = getMuiTheme({
  palette: {
    textColor: '#45058e',
    primary1Color: '#6ac1bf'
  }
});

const style = {
  height: '20px'
};

class SummarySupplementaryData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showGeneral: false,
      showCategories: false,
      showRetailers: false,
      showSimilarBrands: false,
      showPrice: false,
    }
  }

  render() {
    return (
      <div className='page-container'>
        <div className='summary-rating-container'>
          <div className='rating-row solid-border'>
              <p className='label bold goy-color'>Supplementary Data</p>
          </div>
          <div className='rating-row slim-border row-right'>
              <p className='label'>General</p>
              <span className='flex-start'><i className="material-icons" style={{color: 'red'}} >close</i></span>
              <MuiThemeProvider muiTheme={muiTheme}>
              <RaisedButton
                containerElement={<Link to="/brandSummary" />}
                style={style}
                primary={true}
                label="view"/>
              </MuiThemeProvider>
          </div>

          <div className='rating-row slim-border row-right'>
            <p className='label'>Categories</p>
            <span className='flex-start'><i className="material-icons" style={{color: 'green'}} >check</i></span>
            <MuiThemeProvider muiTheme={muiTheme}>
            <RaisedButton
              containerElement={<Link to="/brandSummary" />}
              style={style}
              primary={true}
              label="view"/>
            </MuiThemeProvider>
          </div>
          <div className='rating-row slim-border row-right'>
            <p className='label'>Retailers</p>
            <span className='flex-start'><i className="material-icons" style={{color: 'green'}} >check</i></span>
            <MuiThemeProvider muiTheme={muiTheme}>
            <RaisedButton
              containerElement={<Link to="/brandSummary" />}
              style={style}
              primary={true}
              label="view"/>
            </MuiThemeProvider>
          </div>
          <div className='rating-row slim-border row-right'>
            <p className='label'>Similar Brands</p>
            <span className='flex-start'><i className="material-icons" style={{color: 'green'}} >check</i></span>
            <MuiThemeProvider muiTheme={muiTheme}>
            <RaisedButton
              containerElement={<Link to="/brandSummary" />}
              style={style}
              primary={true}
              label="view"/>
            </MuiThemeProvider>
          </div>
          <div className='rating-row slim-border row-right'>
            <p className='label'>Price</p>
            <span className='flex-start'><i className="material-icons" style={{color: 'green'}} >check</i></span>
            <MuiThemeProvider muiTheme={muiTheme}>
            <RaisedButton
              containerElement={<Link to="/brandSummary" />}
              style={style}
              primary={true}
              label="view"/>
            </MuiThemeProvider>
          </div>
        </div>
    </div>
    )
  }
}

export default SummarySupplementaryData
