import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Question from './../Question/Question';
import Header from  './../header/Header'
import Footer from  './../footer/Footer'
import Answer from './../answer/Answer';


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
      }]
    };

    // this.getData = this.getData.bind(this)
  }

  getData() {
    // get data from JSON
    axios.get("/questions.json")
      .then(res => {
        this.setState({
          data: res.data
        });
      })
  }

  componentWillMount(){
    this.getData();
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
            <Question></Question>
            <Question></Question>
            {this.state.answeredData.map((answer) => {
            return <Answer answeredItem={answer}/>
          })}
            <Answer/>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
