import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Question from './../Question/Question';
import Header from  './../header/Header'
import Footer from  './../footer/Footer'
import Answer from './../answer/Answer';
import ProgressBar from './../ProgressBar/ProgressBar'


class App extends Component {

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
      subPage: 0
    };

    // this.getData = this.getData.bind(this)
  }

  getData() {
    // get data from JSON
    axios.get("/spec.json")
      .then(res => {
        this.setState({
          data: res.data.questions,
          categories: res.data.categories,
          page: 1
        })
        this.mapQuestionTypes()
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
      mappedQuestions: returnArray
    })
    console.log(this.state.mappedQuestions);
  }

  componentWillMount(){
    this.getData();
  }

  handleSaveQuestion = () => {
    var answeredData = this.state.answeredData
    var selectedAnswer = []
    this.state.selected.forEach((element) => {
      selectedAnswer.push(this.state.data[this.state.currentQuestion].answers[element].text)
    })
    console.log(selectedAnswer);

    answeredData[this.state.subPage].push({
      question: this.state.data[this.state.currentQuestion].text,
      answers: selectedAnswer
    })
    this.setState({
      answeredData: answeredData,
      selected: [],
      currentQuestion: this.state.currentQuestion + 1
    })

    var subPageTotal = 0
    console.log(this.state.mappedQuestions[0].length);
    for (var i = 0; i <= this.state.subPage; i++) {
      subPageTotal += this.state.mappedQuestions[i].length
    }
    subPageTotal -=1
    console.log(subPageTotal);
    console.log(this.state.currentQuestion);

    if (this.state.data.length-1 == this.state.currentQuestion) {
      this.setState({
        page: this.state.page += 1
      })
    } else if (subPageTotal <= this.state.currentQuestion) {
      answeredData.push([])
      this.setState({
        subPage: this.state.subPage + 1,
        answeredData: answeredData
      })
    }

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
                `${this.state.data[this.state.currentQuestion].category_id} > ${this.state.data[this.state.currentQuestion].theme_id}`
              }
            </h2>
              <ProgressBar
                total = {this.state.data.length}
                currentQuestion = {this.state.currentQuestion}

              />
              <Question
                question={
                  this.state.data[this.state.currentQuestion].text
                }
                answers={
                 this.state.data[this.state.currentQuestion].answers
                }
                currentQuestion = {this.state.currentQuestion}
                handleSaveQuestion = {this.handleSaveQuestion}
                handleSelectionChange = {this.handleSelectionChange}
                disabled = {this.state.selected.length == 0}
                selected = {this.state.selected}
              ></Question>
              {this.state.answeredData[this.state.subPage].map((answer) => {
              return <Answer answeredItem={answer}/>
            })}
              <Answer/>
            </div>

          </div>
          <Footer/>
        </div>
      )
      case 2:
        return(
          <div>Finished</div>
        )
      default:
        return (<div></div>)
    }
  }

  render() {
    return (
      <div>
        <Header/>
          {this.renderPage()}
      </div>
    )
  }
}

export default App;
