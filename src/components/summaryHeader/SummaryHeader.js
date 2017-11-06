import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios'
import { ROOT_URL } from '../../actions'
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

    this.state = {
      state: 0,
      summaryData:{}
    }
  }

  getData(id) {
    console.log('brand id', this.props);
    var brandID = this.props.brandId
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
    axios.get(`${ROOT_URL}/brands-general-info/?brand=${id}`)
      .then(res => {
        this.setState({
          summaryData: res.data.data[0],
          state: 1,
          checkStyle: !res.data.data[0] ? {color: 'red'} : {color: 'green'}
        })

        axios.get(`${ROOT_URL}/brands/${brandID}`)
          .then(res => {
            this.setState({
              url: res.data.url,
              name: res.data.name
            })
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
      return (
        !this.state.summaryData ?
        (<div className='page-container'>
          <div className="summary-container-main flex-start">
            <div className="summary-container-left-solo">
              <div className="summary-header-row">
                <p className="label">Brand summary for:</p>
                <p className="value brand">{this.state.name}</p>
              </div>
              <div className="summary-header-row">
                <p className="label">Url</p>
                <p className="value">{this.state.url}</p>
              </div>
            </div>
          </div>
        </div>)

        :
      (  <div className='page-container'>
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
              <p><span>Draft</span><span className="goy-color arrow-head">>></span>
              <span className="status">Scrapped</span><span className="goy-color arrow-head">>></span>
              <span>Rated</span><span className="goy-color arrow-head">>></span>
              <span>Verified</span><span className="goy-color arrow-head">>></span>
              <span>Approved</span><span className="goy-color arrow-head">>></span>
              <span>Published</span></p>
            </div>
          </div>
        </div>)
      )
    }
  }


  render() {
    return (
      this.renderPage()
    )
  }
}

export default BrandSummaryHeader
