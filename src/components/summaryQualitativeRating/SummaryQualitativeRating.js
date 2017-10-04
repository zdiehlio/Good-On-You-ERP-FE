import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './SummaryQualitativeRating.css';

const muiTheme = getMuiTheme({
  palette: {
    textColor: '#45058e',
    primary1Color: '#6ac1bf'
  }
});

const style = {
  height: '20px'
};

class BrandSummaryQualitativeRating extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showCauses: false,
      showSentences: false,
      showSummary: false
    }
  }

  render() {
    return (
      <div className='page-container'>
        <div className='summary-rating-container'>
          <div className='rating-row solid-border'>
              <p className='label bold goy-color'>Qualitative Ratings</p>
          </div>
          <div className='rating-row slim-border row-right'>
              <p className='label'>Causes</p>
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
            <p className='label'>Sentences</p>
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
            <p className='label'>Summary</p>
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

export default BrandSummaryQualitativeRating
