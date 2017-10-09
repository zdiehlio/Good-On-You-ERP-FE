import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './SummaryRating.css';
import { SummaryRatingItem } from '../';
import axios from 'axios'

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

    this.state = {
      showTheme: [false, false, false],
      state: 0,
      categories: [],
      summaryData: {},
      checkStyle: {}
    }
  }

  getData() {
    axios.get("/spec.json")
      .then(res => {
        this.setState({categories: res.data.categories})
      })

      var brandID = this.props.currentBrand.id

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
      axios.get(`http://34.211.121.82:3030/ratings/?brandId=k5mKrWygJ9RtQU0r`)
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

  handleExpandClick = (i) => {
    this.setState({
      showTheme: this.state.showTheme.map((item, index) => {
        return this.state.showTheme[i] ? false : i == index
      })
    })
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
            <p className='label bold goy-color'>Ratings</p>
            <span className='flex-start'></span>
            <p className='label'>stars</p>
          </div>

            {this.state.categories.map((item, i) => {
              const currentCategory = this.state.summaryData[item.category_id]
              return (
                <div key={i} className='rating-drop-down-container'>
                  <div className='rating-row slim-border row-right'>
                    <p className='label'>{item.category_id}</p>
                    {currentCategory.score ? (<p className='label'>{`${currentCategory.score}/${currentCategory.maxScore}`}</p>) : (<span className='flex-start'><i className="material-icons" style={{color: 'red'}} >close</i></span>)}
                    <span className='flex-start'><i className="material-icons expand" onClick={ this.handleExpandClick.bind(this,i) } key={i}>{this.state.showTheme[i]? "expand_less" : "expand_more"}</i></span>
                    <p className='label status-bold'>{currentCategory.label}</p>
                  </div>
                  { this.state.showTheme[i] ? (currentCategory.themes.map((theme, i) => {
                    console.log(theme);
                    return (
                      <div key={i} className='rating-drop-down-container'>
                        <div className='rating-row slim-border row-right'>
                          <p className='label sub-row'>{theme.name}</p>
                          {theme.score ? (<p className='label'>{`${theme.score}/${theme.maxScore}`}</p>) : (<span className='flex-start'><i className="material-icons" style={{color: 'red'}} >close</i></span>)}
                          <span style={{width:'20px'}}>
                            <MuiThemeProvider muiTheme={muiTheme}>
                            <RaisedButton
                              containerElement={<Link to={`/questionnaire/brands/${this.props.brandId}/themes/${theme.name.toLowerCase()}`} params={{brandID: 'k5mKrWygJ9RtQU0r', theme_id: 'resource'}}/>}
                              style={style}
                              primary={true}
                              label={theme.score ? "view" : "start"}/>
                            </MuiThemeProvider>
                          </span>
                          <div></div>
                        </div>
                      </div>
                    )
                  }))
                  :
                  <div/>}
                </div>
              )
            })}
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

export default BrandSummaryRating
