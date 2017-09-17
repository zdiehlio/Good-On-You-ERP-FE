import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import Question from './../Question/Question'
import Header from  './../header/Header'
import Footer from  './../footer/Footer'
import Answer from './../answer/Answer'
import Summary from './../summary/Summary'


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      answeredData: [{
        "issueNumber": 1.1,
        "question": "Which of the following standards systems is the brand compliant with?",
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
        "question": "Which of the following standards systems is the brand compliant with?",
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
      selected: false
    };

    // this.getData = this.getData.bind(this)
  }

  getData() {
    // get data from JSON
    axios.get("/spec.json")
      .then(res => {
        this.setState({
          data: res.data.questions
        });
      })
  }

  componentWillMount(){
    this.getData();
  }

  handleSaveQuestion = () => {
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    })
  }

  handleSelectionChange = (event) => {
    console.log(event.target);
    this.setState({
      selected: !this.state.selected
    })
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="container-body">
          <div className="App">
          <p>
            {
              this.state.data[0] ? console.log(this.state.data[0].answers) : console.log("no")
            }
          </p>
            <Question
              question={
                this.state.data[0] ? this.state.data[this.state.currentQuestion].text : "null"
              }
              answers={
                this.state.data[0] ? this.state.data[this.state.currentQuestion].answers : []
              }
              currentQuestion = {this.state.currentQuestion}
              handleSaveQuestion = {this.handleSaveQuestion}
              handleSelectionChange = {this.handleSelectionChange}
            ></Question>

              {this.state.answeredData.map((answer) => <Answer answeredItem={answer}/>)}
            <Answer/>
            <Summary/>
          </div>


        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
