import React, { Component } from 'react';
import './CategoryQuestions.css';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import $ from "jquery";
import request from "request"
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { submitAnswer } from '../../actions';
import { Answer } from '../../components';
import axios from 'axios'


class CategoryQuestions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      answeredData: [[]],
      answersData: []
    };
  }

  getData() {
    // /brand-answers?theme_id=resource&brand_id=k5mKrWygJ9RtQU0r
    // get data from JSON

    // call to get questions by theme

    // call to get all answers

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
    axios.get(`http://34.211.121.82:3030/brand-answers?theme_id=resource&brand_id=k5mKrWygJ9RtQU0r`)
      .then(res => {
        debugger
        this.setState({answersData: res.data, state: 1})
      })
  }

  mapQuestionTypes() {
    var returnArray = []
    this.state.categories.forEach((category) => {
      category.themes.forEach((theme) => {
        var temp = this.state.data.filter((question) => {
          return question.category_id == category.category_id && theme.theme_id == question.theme_id
        })
        if (temp.length > 0) {
          returnArray.push(temp)
        }
      })
    })
    this.setState({
      mappedQuestions: returnArray,
      page: 1
    })
    console.log(this.state.mappedQuestions);
  }
  componentWillMount(){
    this.getData();
  }

  onSubmit(values) {
    this.props.login(values);
    this.props.history.push("/")
  }

  renderPage = () => {
    const { handleSubmit } = this.props;

    switch (this.state.page) {
      case 0:
      return(
        <h2>Loading...</h2>
      )
      case 1:
      return (
        <div>
          {this.state.answeredData[this.state.subPage].map((answer) => {
            return <Answer answeredItem={answer}/>
          })}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
          {this.renderPage()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state);
  return { error: state.error }
}

export default reduxForm({
  form: "CategoryRatingForm"
})(
  connect(mapStateToProps, { submitAnswer })(CategoryQuestions)
)
