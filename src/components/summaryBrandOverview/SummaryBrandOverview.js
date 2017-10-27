import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios'
import './SummaryBrandOverview.css';

const muiTheme = getMuiTheme({
  palette: {
    textColor: '#45058e',
    primary1Color: '#6ac1bf'
  }
});

const style = {
  height: '20px',
};

class SummaryBrandOverview extends Component {

  constructor(props) {
    super(props);

    this.state = {
      state: 0,
      summaryData: {},
      showImages: false,
      showContactDetails: false,
      checkStyle: {}
    }
  }

  getData() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
    axios.get(`http://34.211.121.82:3030/brand/summary/?brandId=k5mKrWygJ9RtQU0r`)
      .then(res => {
        this.setState({
          summaryData: res.data.data[0],
          state: 1,
          checkStyle: !res.data.data[0] ? {color: 'red'} : {color: 'green'}
        })
        console.log('getdata', this.state);
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
      return (
        <div className='summary-rating-container'>
          <div className='rating-row solid-border'>
            <p className='label bold goy-color'>Brand Overview</p>
          </div>
          <div className='rating-row slim-border row-right'>
            <p className='label'>General *</p>
            <span className='flex-start'><i className="material-icons" style={{color: 'red'}} >close</i></span>
            <MuiThemeProvider muiTheme={muiTheme}>
            <RaisedButton
              containerElement={<Link to="/brandGeneral" />}
              style={style}
              primary={true}
              label={!this.state.summaryData ? "start" : "view"}/>
            </MuiThemeProvider>
          </div>
          <div className='rating-row slim-border row-right'>
            <p className='label'>Contact Details *</p>
            <span className='flex-start'><i className="material-icons" style={{color: 'red'}} >close</i></span>
            <MuiThemeProvider muiTheme={muiTheme}>
            <RaisedButton
              containerElement={<Link to="/brandContact" />}
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

export default SummaryBrandOverview
