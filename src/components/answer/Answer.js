import React, {Component} from 'react'
import './Answer.css';
import axios from 'axios'



export default class Answer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      answers: [],
      question: ""
    }
  }

  getQuestionAndAnswersString() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
    axios.get(`http://34.211.121.82:3030/questions/${this.props.rawAnswer.question_id}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          question: res.data.text,
          answers: this.getStringFromRawAnswers(res.data)
        })
      })
  }

  componentWillMount(){
    if (this.props.rawAnswer) {
      this.getQuestionAndAnswersString()
    }
  }



  getStringFromRawAnswers = (data) => {
    return this.props.rawAnswer.answer_ids.map((answerId) => {
      var index = data.answers.findIndex(element => {
        return element.answer_id == answerId
      })
      return (
        <li key={answerId}>{data.answers[index].text}</li>
      )
    })
  }

  render() {

    return (
      <div>
        {this.props.rawAnswer ?
          <div className="answer-result-container">
            <h4><b>{this.state.question}</b></h4>
            <ul>
              {this.state.answers}
            </ul>
            <span><input className="editButton" type="submit" value="Edit"/></span>
            <div className="clear"/>
          </div>
        :
        <div/>}
      </div>
    );


  }




}
