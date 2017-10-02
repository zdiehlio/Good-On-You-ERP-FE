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

const raisedButtonStyle = {
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
              <span className='flex-start'><i className="material-icons expand" onClick={() => this.setState({showEnvironment: !this.state.showEnvironment})}>{this.state.showEnvironment ? 'expand_less' : 'expand_more'}</i></span>
          </div>
          {this.state.showEnvironment ?
            <div className='rating-drop-down-container'>
              <div className='rating-row slim-border row-right'>
                  <p className='label sub-row'>Placeholder</p>
                  <p className='label'>10/20</p>
                  <span style={{width:'10px'}}>
                    <MuiThemeProvider muiTheme={muiTheme}>
                    <RaisedButton
                      containerElement={<Link to="/brandSummary" />}
                      linkButton={true}
                      style={raisedButtonStyle}
                      primary={true}
                      label="view"/>
                    </MuiThemeProvider>
                  </span>
              </div>
            </div>
            : <div/>
          }
          <div className='rating-row slim-border row-right'>
            <p className='label'>Sentences</p>
            <span className='flex-start'><i className="material-icons" style={{color: 'green'}} >check</i></span>
            <span className='flex-start'><i className="material-icons expand" onClick={() => this.setState({showSentences: !this.state.showSentences})}>{this.state.showSentences ? 'expand_less' : 'expand_more'}</i></span>
          </div>
          <div className='rating-row slim-border row-right'>
            <p className='label'>Summary</p>
            <span className='flex-start'><i className="material-icons" style={{color: 'green'}} >check</i></span>
            <span className='flex-start'><i className="material-icons expand" onClick={() => this.setState({showSummary: !this.state.showSummary})}>{this.state.showSummary ? 'expand_less' : 'expand_more'}</i></span>
          </div>
        </div>
    </div>
    )
  }
}

export default BrandSummaryQualitativeRating
