import React, { Component } from 'react'
import './Questionnaire.css'
import axios from 'axios'
import { Question, Answer, ProgressBar } from '../../components';
import { fetchAllQuestions } from '../../actions';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import _ from 'lodash'



class Questionnaire extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      answeredData: [[]],
      currentQuestion: 0,
      selected: [],
      page: 0,
      mappedQuestions: [],
      categories: [],
      subPage: 0,
      subPageTotal: 0,
      currentTheme: 0,
      rawAnswerList: []
    };

    // this.getData = this.getData.bind(this)
  }

  getData() {
    // get data from JSON
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
    axios.get("/spec.json")
      .then(res => {
        this.setState({
          categories: res.data.categories
        })
        this.mapQuestionTypes()
      })
  }

// retrive list of question for theme in spec.json
  mapQuestionTypes() {
    var returnArray = []
    var count = 0
    var totalThemeCount = 0

    this.state.categories.forEach((category) => {
      category.themes.forEach((theme, i) => {
        totalThemeCount ++
      })
    })

    this.state.categories.forEach((category) => {
      category.themes.forEach((theme, i) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
        // console.log(theme.theme_id);
        axios.get(`http://34.211.121.82:3030/questions?theme_id=${theme.theme_id}`)
          .then(res => {
            count ++
            if(res.data.data.length > 0) {
              var questions = this.state.mappedQuestions
              questions.push(res.data.data)
              this.setState({
                mappedQuestions: questions
              })
            }

            if (count >= totalThemeCount) {
              console.log(this.state.mappedQuestions);
              this.setState({
                page: 1
              })
            }
          })
      })
    })
  }

  componentWillMount(){
    this.props.fetchAllQuestions();
    this.getData();
  }

  handleSaveQuestion = (value) => {
    this.setState({
      page: 0
    })
    const { currentTheme, currentQuestion, mappedQuestions } = this.state
    const mapAnswer = Object.keys(_.omit(value, ['url', 'comment']))


    var answerObject = {
     brand_id: "79nbn8kmbQZ9sapb",
     theme_id: mappedQuestions[currentTheme][currentQuestion].theme_id,
     question_id: mappedQuestions[currentTheme][currentQuestion].question_id,
     answer_ids: mapAnswer,
     url: value.url,
     comment: value.comment
    }

    console.log(answerObject);

    // call apis tomsave answer for brand in the daatabase and get all the answers id for the currentTheme
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
    axios.post(`http://34.211.121.82:3030/brand-answers`, answerObject).then(res => {
      axios.get(`http://34.211.121.82:3030/brand-answers?brand_id=79nbn8kmbQZ9sapb&theme_id=${this.state.mappedQuestions[this.state.currentTheme][this.state.currentQuestion].theme_id}`)
        .then(res => {
          const rawAnswerList = res.data.data
          console.log(res.data.data);

          if (this.state.mappedQuestions[this.state.currentTheme].length-1 == currentQuestion) {
            this.props.history.push("/brandSummary")
          }

          this.setState({
            currentQuestion: currentQuestion + 1,
            page: 1,
            rawAnswerList: rawAnswerList
          })
        })
    });



    // use api to save questions response
    // call api to get all responses for the current theme to be displayed at the bottom
      // http://34.211.121.82:3030/brand-answers?brand_id=DxXvQiEE9MICosFv&theme_id=water to get array of question id and array of asnwers id
      // using the array of question id and aswer id to get the text description of the questions and answers



      // console.log(theme.theme_id);

    // change the state of the current question to display the next question
  }

  handleSelectionChange = (event) => {

    if (!event.target.checked) {
      var stateCopy = this.state.selected
      stateCopy.splice(this.state.selected.indexOf(event.target.name),1)
      this.setState({
        selected: stateCopy
      })
    } else {
      var stateCopy = this.state.selected
      stateCopy.push(event.target.name)
      this.setState({
        selected: stateCopy
      })
    }
  }

  handleEditAnswer = (values) => {
    console.log(values);
  }

  renderPage = () => {
    switch (this.state.page) {
      case 0:
      return(
        <h2>Loading...</h2>
      )
      case 1:
      return (
        <div>
          <div className="container-body">
            <div className="App">
            <h2 className="category-text">
              {
                `${this.state.mappedQuestions[this.state.currentTheme][this.state.currentQuestion].category_id} > ${this.state.mappedQuestions[this.state.currentTheme][this.state.currentQuestion].theme_id}`
              }
            </h2>
              <ProgressBar
                total = {this.state.data.length}
                currentQuestion = {this.state.currentQuestion}
                desc = "Total"
                color = "green"
              />
              <ProgressBar
                total = {this.state.mappedQuestions[this.state.subPage].length}
                currentQuestion = {this.state.currentQuestion - this.state.subPageTotal}
                desc = "Current"

              />
              <Question
                question={
                  this.state.mappedQuestions[this.state.currentTheme][this.state.currentQuestion]
                }
                answers={
                 this.state.mappedQuestions[this.state.currentTheme][this.state.currentQuestion].answers
                }
                currentQuestion = {this.state.currentQuestion}
                handleSaveQuestion = {this.handleSaveQuestion}
                handleSelectionChange = {this.handleSelectionChange}
                disabled = {this.state.selected.length == 0}
                selected = {this.state.selected}
              ></Question>
              {this.state.rawAnswerList.map((answer) => {
              return <Answer rawAnswer={answer} handleEditAnswer={this.handleEditAnswer}/>
            })}
              <Answer/>
            </div>
          </div>
        </div>
      )
      case 2:
        return(
          <div>Summary</div>
        )
      default:
        return (<div></div>)
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
  return { data: state.qa }
}

export default reduxForm({
  form: "AnswerForm"
})(
  connect(mapStateToProps, { fetchAllQuestions })(Questionnaire)
)
