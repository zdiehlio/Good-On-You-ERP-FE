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
      data: {}
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
          </div>
          <Answer/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
