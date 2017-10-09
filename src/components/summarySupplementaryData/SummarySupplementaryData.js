import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios'
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

const submitButtonStyle = {
  margin: 12
};

class SummarySupplementaryData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      state: 0,
      summaryData: {},
      checkStyle: {},
      showGeneral: false,
      showCategories: false,
      showRetailers: false,
      showSimilarBrands: false,
      showPrice: false,
    }
  }


  getData() {
    var brandID = this.props.currentBrand.id

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
    axios.get(`http://34.211.121.82:3030/suppdata/?brandId=/?brandId=${brandID}`)
      .then(res => {
        this.setState({
          summaryData: res.data.data[0],
          state: 1,
          checkStyle: !res.data.data[0] ? {color: 'red'} : {color: 'green'}
        })
      })
  }

  componentWillMount(){
    this.getData();
  }

  renderPage = () => {
    switch (this.state.state) {
      case 0:
      return(
        <h2>Loading...</h2>
      )
      case 1:
      console.log("sumdata",this.state.summaryData)
      return (


        <div className='summary-rating-container'>
          <div className='rating-row solid-border'>
            <p className='label bold goy-color'>Supplementary Data</p>
          </div>        {console.log(this.state.summaryData)}
          <div className='rating-row slim-border row-right'>
            <p className='label'>General</p>
            <span className='flex-start'><i className="material-icons" style={this.state.checkStyle} >close</i></span>
            <MuiThemeProvider muiTheme={muiTheme}>
            <RaisedButton
              containerElement={<Link to="/brandSummary" />}
              style={style}
              primary={true}
              label={!this.state.summaryData ? "start" : "view"}/>
            </MuiThemeProvider>
          </div>

          <div className='rating-row slim-border row-right'>
            <p className='label'>Categories</p>
            <span className='flex-start'><i className="material-icons" style={this.state.checkStyle} >close</i></span>
            <MuiThemeProvider muiTheme={muiTheme}>
            <RaisedButton
              containerElement={<Link to="/brandSummary" />}
              style={style}
              primary={true}
              label={!this.state.summaryData ? "start" : "view"}/>
            </MuiThemeProvider>
          </div>
          <div className='rating-row slim-border row-right'>
            <p className='label'>Retailers</p>
            <span className='flex-start'><i className="material-icons" style={this.state.checkStyle} >close</i></span>
            <MuiThemeProvider muiTheme={muiTheme}>
            <RaisedButton
              containerElement={<Link to="/brandSummary" />}
              style={style}
              primary={true}
              label={!this.state.summaryData ? "start" : "view"}/>
            </MuiThemeProvider>
          </div>
          <div className='rating-row slim-border row-right'>
            <p className='label'>Similar Brands</p>
            <span className='flex-start'><i className="material-icons" style={this.state.checkStyle} >close</i></span>
            <MuiThemeProvider muiTheme={muiTheme}>
            <RaisedButton
              containerElement={<Link to="/brandSummary" />}
              style={style}
              primary={true}
              label={!this.state.summaryData ? "start" : "view"}/>
            </MuiThemeProvider>
          </div>
          <div className='rating-row slim-border row-right'>
            <p className='label'>Price</p>
            <span className='flex-start'><i className="material-icons" style={this.state.checkStyle} >close</i></span>
            <MuiThemeProvider muiTheme={muiTheme}>
            <RaisedButton
              containerElement={<Link to="/brandSummary" />}
              style={style}
              primary={true}
              label={!this.state.summaryData ? "start" : "view"}/>
            </MuiThemeProvider>
          </div>
          <div className="submit-button-container">
          <MuiThemeProvider muiTheme={muiTheme}>
          <RaisedButton
            containerElement={<Link to="/brandSummary" />}
            style={submitButtonStyle}
            primary={true}
            label={!this.props.currentBrand.summaryHeaderData ? "Complete Rating" : "Submit"}/>
          </MuiThemeProvider>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='page-container'>
        {this.renderPage()}
      </div>
    )
  }
}

export default SummarySupplementaryData
