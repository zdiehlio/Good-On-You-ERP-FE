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
  height: '20px'
};

class BrandSummaryRating extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='page-container'>
        <div className='summary-rating-container'>
          <div className='rating-row solid-border'>
              <p className='label bold goy-color'>Ratings</p>
              <p className='label'>x</p>
              <p className='label'>stars</p>
              <p className='label status-bold'>Status</p>
          </div>
          <div className='rating-row slim-border row-right'>
              <p className='label'>Environment</p>
              <p className='label'>x</p>
              <i className="material-icons goy-color">expand_more</i>
              <p className='label status-bold'>Incomplete</p>
          </div>
          <div className='rating-row slim-border row-right'>
              <p className='label sub-row'>Resource</p>
              <p className='label'>10/20</p>
              <span style={{width:'10px'}}>
                <MuiThemeProvider muiTheme={muiTheme}>
                <RaisedButton
                  containerElement={<Link to="/brandSummary" />}
                  linkButton={true}
                  style={style}
                  primary={true}
                  label="view"/>
                </MuiThemeProvider>
              </span>
          </div>
          <div className='rating-row slim-border row-right'>
              <p className='label sub-row'>Climate change</p>
              <p className='label'>16/20</p>
              <span style={{width:'10px'}}>
                <MuiThemeProvider muiTheme={muiTheme}>
                <RaisedButton
                  containerElement={<Link to="/brandSummary" />}
                  linkButton={true}
                  style={style}
                  primary={true}
                  label="view"/>
                </MuiThemeProvider>
              </span>
          </div>
          <div className='rating-row slim-border row-right'>
              <p className='label sub-row'>Water</p>
              <p className='label'>9/20</p>
              <span style={{width:'10px'}}>
                <MuiThemeProvider muiTheme={muiTheme}>
                <RaisedButton
                  containerElement={<Link to="/brandSummary" />}
                  linkButton={true}
                  style={style}
                  primary={true}
                  label="view"/>
                </MuiThemeProvider>
              </span>
          </div>
          <div className='rating-row slim-border row-right'>
              <p className='label sub-row'>Chemicals</p>
              <p className='label'>17/20</p>
              <span style={{width:'10px'}}>
                <MuiThemeProvider muiTheme={muiTheme}>
                <RaisedButton
                  containerElement={<Link to="/brandSummary" />}
                  linkButton={true}
                  style={style}
                  primary={true}
                  label="view"/>
                </MuiThemeProvider>
              </span>
          </div>
          <div className='rating-row slim-border row-right'>
              <p className='label sub-row'>Positive citizenship</p>
              <p className='label'>9/20</p>
              <span style={{width:'10px'}}>
                <MuiThemeProvider muiTheme={muiTheme}>
                <RaisedButton
                  containerElement={<Link to="/brandSummary" />}
                  linkButton={true}
                  style={style}
                  primary={true}
                  label="view"/>
                </MuiThemeProvider>
              </span>
          </div>
          <div className='rating-row slim-border row-right'>
              <p className='label sub-row'>Negative citizenship</p>
              <p className='label'>x</p>
              <span style={{width:'10px'}}>
                <MuiThemeProvider muiTheme={muiTheme}>
                <RaisedButton
                  containerElement={<Link to="/brandSummary" />}
                  linkButton={true}
                  style={style}
                  primary={true}
                  label="view"/>
                </MuiThemeProvider>
              </span>
          </div>
          <div className='rating-row slim-border row-right'>
              <p className='label'>Environment</p>
              <p className='label'>x</p>
              <p className='label'>arrow</p>
              <p className='label status-bold'>Good</p>
          </div>
          <div className='rating-row slim-border row-right'>
              <p className='label'>Environment</p>
              <p className='label'>x</p>
              <p className='label'>arrow</p>
              <p className='label status-bold'>Good</p>
          </div>
        </div>
    </div>
    )
  }
}

export default BrandSummaryRating
