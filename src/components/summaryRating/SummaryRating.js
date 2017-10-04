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

const summaryData2 = [
  {
    category: "Environment",
    theme: [{
      name: "Resources"
    }],
    status: "Incomplete",
    score: null
  },
  {
    category: "Labor",
    theme: [],
    status: "Good",
    score: "15.03/20"
  },
  {
    category: "Animal",
    theme: [],
    status: "Good",
    score: "16.20/20"
  }

]

const summaryData =
    {
      "brandId": "k5mKrWygJ9RtQU0r",
      "label": "Incomplete",
      "ratingDots": 0,
      "environment": {
        "maxScore": 20,
        "label": "Incomplete",
        "themes": [
          {
            "id": 1,
            "name": "Resource",
            "score": 20,
            "maxScore": 20
          },
          {
            "id": 2,
            "name": "Energy",
            "score": 19,
            "maxScore": 20
          },
          {
            "id": 3,
            "name": "Chemical",
            "maxScore": 20
          },
          {
            "id": 4,
            "name": "Water",
            "maxScore": 20
          }
        ]
      },
      "labour": {
        "score": 19.5,
        "maxScore": 20,
        "label": "Great",
        "themes": [
          {
            "id": 1,
            "name": "Ethical Fashion Report",
            "score": 18,
            "maxScore": 20
          },
          {
            "id": 2,
            "name": "Certification",
            "score": 17,
            "maxScore": 20
          },
          {
            "id": 3,
            "name": "Policies and Worker Empowerment",
            "score": 20,
            "maxScore": 20
          },
          {
            "id": 4,
            "name": "Supply Chain",
            "score": 16,
            "maxScore": 20
          },
          {
            "id": 5,
            "name": "Low Risk Production",
            "score": 19,
            "maxScore": 20
          },
          {
            "id": 6,
            "name": "Living Wage",
            "score": 15,
            "maxScore": 20
          },
          {
            "id": 7,
            "name": "Knowing Suppliers",
            "score": 20,
            "maxScore": 20
          },
          {
            "id": 8,
            "name": "Suppliers Relationship & Auditing",
            "score": 16,
            "maxScore": 20
          },
          {
            "id": 9,
            "name": "Positive Citizenship",
            "score": 17,
            "maxScore": 20
          },
          {
            "id": 10,
            "name": "Negative Citizenship",
            "score": 14,
            "maxScore": 20
          }
        ]
      },
      "animal": {
        "score": 18.75,
        "maxScore": 20,
        "label": "Great",
        "themes": [
          {
            "id": 1,
            "name": "Fur",
            "score": 18,
            "maxScore": 20
          },
          {
            "id": 2,
            "name": "Leather",
            "score": 17,
            "maxScore": 20
          },
          {
            "id": 3,
            "name": "Wool",
            "score": 20,
            "maxScore": 20
          },
          {
            "id": 4,
            "name": "Feathers",
            "score": 16,
            "maxScore": 20
          },
          {
            "id": 5,
            "name": "Angora",
            "score": 19,
            "maxScore": 20
          },
          {
            "id": 6,
            "name": "Exotic Hairs",
            "score": 15,
            "maxScore": 20
          },
          {
            "id": 7,
            "name": "Exotic Skins",
            "score": 20,
            "maxScore": 20
          }
        ]
      },
      "_id": "6ELyRMJfIoj3Ju3m"
    }

class BrandSummaryRating extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showTheme: [false, false, false],
      state: 0,
      categories: []
    }
  }

  getData() {
    axios.get("/spec.json")
      .then(res => {
        this.setState({
          categories: res.data.categories,
          state: 1
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
              const currentCategory = summaryData[item.category_id]
              return (
                <div className='rating-drop-down-container'>
                  <div className='rating-row slim-border row-right'>
                    <p className='label'>{item.category_id}</p>
                    {currentCategory.score ? (<p className='label'>{`${currentCategory.score}/${currentCategory.maxScore}`}</p>) : (<span className='flex-start'><i className="material-icons" style={{color: 'red'}} >close</i></span>)}
                    <span className='flex-start'><i className="material-icons expand" onClick={ this.handleExpandClick.bind(this,i) } key={i} category={item.category}>{this.state.showTheme[i]? "expand_less" : "expand_more"}</i></span>
                    <p className='label status-bold'>{currentCategory.label}</p>
                  </div>
                  { this.state.showTheme[i] ? (currentCategory.themes.map((theme, i) => {
                    return (
                      <div className='rating-drop-down-container'>
                        <div className='rating-row slim-border row-right'>
                          <p className='label sub-row'>{theme.name}</p>
                          {theme.score ? (<p className='label'>{`${theme.score}/${theme.maxScore}`}</p>) : (<span className='flex-start'><i className="material-icons" style={{color: 'red'}} >close</i></span>)}
                          <span style={{width:'20px'}}>
                            <MuiThemeProvider muiTheme={muiTheme}>
                            <RaisedButton
                              containerElement={<Link to="/brandSummary" />}
                              linkButton={true}
                              style={style}
                              primary={true}
                              label="view"/>
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
