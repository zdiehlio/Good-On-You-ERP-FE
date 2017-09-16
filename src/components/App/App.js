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
      answeredData: [{
        "issueNumber": 1.1,
        "question": "1 - Which of the following standards systems is the brand compliant with?",
        "answers":
        [
          "Cradle to Cradle Platinum",
          "Cradle to Cradle Gold",
        ],
        "appliesTo": "All",
        "chooseAllThatApply": true,
        "score": 100
      },{
        "issueNumber": 1.2,
        "question": "2 - Which of the following standards systems is the brand compliant with?",
        "answers":
        [
          "Cradle to Cradle Platinum",
          "Cradle to Cradle Gold",
        ],
        "appliesTo": "All",
        "chooseAllThatApply": true,
        "score": 100
      }],
      currentQuestion: 0,
      selected: [],
      page: 0
    };

    // this.getData = this.getData.bind(this)
  }

  getData() {
    // get data from JSON
    axios.get("/spec.json")
      .then(res => {
        this.setState({
          data: res.data.questions,
          page: 1
        });
      })
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

    answeredData.push({
      question: this.state.data[this.state.currentQuestion].text,
      answers: selectedAnswer
    })
    this.setState({
      answeredData: answeredData,
      selected: [],
      currentQuestion: this.state.currentQuestion + 1
    })
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
              {this.state.answeredData.map((answer) => {
              return <Answer answeredItem={answer}/>
            })}
              <Answer/>
            </div>

          </div>
          <Footer/>
        </div>
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
