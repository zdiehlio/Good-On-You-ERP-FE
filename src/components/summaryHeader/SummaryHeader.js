import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './SummaryHeader.css';

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

class BrandSummaryHeader extends Component {

  constructor(props) {
    super(props);
  }

  // <div className="page-container">
  //   <div className="summary-container-main">
  //     <div className="summary-container-left">
  //       <div className="summary-header-row">
  //         <p className="label">Brand summary for:</p>
  //         <p className="value brand">{this.props.currentBrand.name}</p>
  //       </div>
  //       <div className="summary-header-row">
  //         <p className="label">Size</p>
  //         <p className="value">Value</p>
  //       </div>
  //       <div className="summary-header-row">
  //         <p className="label">Parent Company</p>
  //         <p className="value">Value</p>
  //       </div>
  //     </div>
  //     <div className="summary-container-right">
  //       <div className="summary-header-row row-right">
  //         <p className="label">Rating status:</p>
  //         <p className="label status">Scrapped</p>
  //         <div className="row">
  //           <p className="label">06/09/2017</p>
  //           <MuiThemeProvider muiTheme={muiTheme}>
  //           <RaisedButton
  //             containerElement={<Link to="/brandSummary" />}
  //             linkButton={true}
  //             style={style}
  //             primary={true}
  //             label="history"/>
  //           </MuiThemeProvider>
  //         </div>
  //       </div>
  //       <div className="summary-header-row row-right">
  //         <p className="label">Supplementary Data:</p>
  //         <p className="label status">In Part</p>
  //         <p className="label">06/09/2017</p>
  //       </div>
  //       <div className="summary-header-row row-right">
  //         <p className="label">Last modified by:</p>
  //         <p className="label">John Smith</p>
  //         <p className="label">06/09/2017</p>
  //       </div>
  //       <div className="summary-header-row row-right">
  //         <p className="label">Verified by:</p>
  //         <p className="label">x</p>
  //       </div>
  //     </div>
  //   </div>
  //   <div className="summary-container-footer">
  //     <div className="label status-pagination">
  //       <p ><span>Draft</span ><span className="goy-color arrow-head">>></span>
  //       <span>Scrapped</span><span className="goy-color arrow-head">>></span>
  //       <span>Rated</span><span className="goy-color arrow-head">>></span>
  //       <span>Verified</span><span className="goy-color arrow-head">>></span>
  //       <span>Approved</span><span className="goy-color arrow-head">>></span>
  //       <span>Published</span></p>
  //     </div>
  //   </div>
  // </div>

  render() {
    return (
      <div className="page-container">
        <div className="summary-container-main">
          <div className="summary-container-left">
            <div className="summary-header-row">
              <p className="label">Brand summary for:</p>
              <p className="value brand">{this.props.currentBrand.name}</p>
            </div>
            <div className="summary-header-row">
              <p className="label">Size</p>
              <p className="value">Value</p>
            </div>
            <div className="summary-header-row">
              <p className="label">Parent Company</p>
              <p className="value">Value</p>
            </div>
          </div>
          <div className="summary-container-right">
            <div className="summary-header-row row-right">
              <p className="label">Rating status:</p>
              <p className="label status">Scrapped</p>
              <div className="history">
                <p className="label">06/09/2017</p>
                <MuiThemeProvider muiTheme={muiTheme}>
                <RaisedButton
                  containerElement={<Link to="/brandSummary" />}
                  linkButton={true}
                  style={style}
                  primary={true}
                  label="history"/>
                </MuiThemeProvider>
              </div>
            </div>
            <div className="summary-header-row row-right">
              <p className="label">Supplementary Data:</p>
              <p className="label status">In Part</p>
              <p className="label history">06/09/2017</p>
            </div>
            <div className="summary-header-row row-right">
              <p className="label">Last modified by:</p>
              <p className="label">John Smith</p>
              <p className="label history">06/09/2017</p>
            </div>
            <div className="summary-header-row row-right">
              <p className="label">Verified by:</p>
              <p className="label">x</p>
            </div>
          </div>
        </div>
        <div className="summary-container-footer">
          <div className="label status-pagination">
            <p ><span>Draft</span ><span className="goy-color arrow-head">>></span>
            <span>Scrapped</span><span className="goy-color arrow-head">>></span>
            <span>Rated</span><span className="goy-color arrow-head">>></span>
            <span>Verified</span><span className="goy-color arrow-head">>></span>
            <span>Approved</span><span className="goy-color arrow-head">>></span>
            <span>Published</span></p>
          </div>
        </div>
      </div>
    )

  }
}

export default BrandSummaryHeader
