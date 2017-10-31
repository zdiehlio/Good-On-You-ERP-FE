import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios'
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
      state: 0,
      summaryData:{},
      showCauses: false,
      showSentences: false,
      showSummary: false,
      checkStyle: {}
    }
  }

  getData() {

    var brandID = this.props.currentBrand.id

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
    axios.get(`http://34.211.121.82:3030/qualitative-ratings/?brandId=${brandID}`)
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
    var checkStyle = {}
    !this.state.summaryData ? checkStyle={color: 'red'} : checkStyle={color: 'green'}

    switch (this.state.state) {
      case 0:
      return(
        <h2>Loading...</h2>
      )
      case 1:
      return (
        <div className='summary-rating-container'>
          <div className='rating-row solid-border'>
              <p className='label bold goy-color'>Qualitative Ratings</p>
          </div>
          <div className='rating-row slim-border row-right'>
              <p className='label'>Causes *</p>
              <span className='flex-start'><i className="material-icons" style={checkStyle} >{!this.state.summaryData ? "close" : "check"}</i></span>
              <MuiThemeProvider muiTheme={muiTheme}>
              <RaisedButton
                containerElement={<Link to="/brandCauses" />}
                style={style}
                primary={true}
                label={!this.state.summaryData ? "start" : "view"}/>
              </MuiThemeProvider>
          </div>

          <div className='rating-row slim-border row-right'>
            <p className='label'>Sentences</p>
            <span className='flex-start'><i className="material-icons" style={checkStyle} >{!this.state.summaryData ? "close" : "check"}</i></span>
            <MuiThemeProvider muiTheme={muiTheme}>
            <RaisedButton
              containerElement={<Link to="/brandSummary" />}
              style={style}
              primary={true}
              label={!this.state.summaryData ? "start" : "view"}/>
            </MuiThemeProvider>
          </div>
          <div className='rating-row slim-border row-right'>
            <p className='label'>Summary</p>
            <span className='flex-start'><i className="material-icons" style={checkStyle} >{!this.state.summaryData ? "close" : "check"}</i></span>
            <MuiThemeProvider muiTheme={muiTheme}>
            <RaisedButton
              containerElement={<Link to="/brandSummary" />}
              style={style}
              primary={true}
              label={!this.state.summaryData ? "start" : "view"}/>
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

export default BrandSummaryQualitativeRating
