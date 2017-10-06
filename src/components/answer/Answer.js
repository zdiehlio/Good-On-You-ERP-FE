import React, {Component} from 'react'
import './Answer.css';
import axios from 'axios'
import { Field, reduxForm } from 'redux-form'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {teal900} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';


// <h4><b>{this.state.question}</b></h4>
// <ul>
//   {this.state.editing ? this.state.answers : this.state.selectedAnswers}
// </ul>
// <span><input className="editButton" type="submit" value="Edit" onClick={this.handleEditAnswer}/></span>


const muiTheme = getMuiTheme({
  palette: {
    textColor: teal900,
    primary1Color: '#6ac1bf'
  }
});

const style = {
  width: '15px',
  height: '15px'
};

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};



class Answer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedAnswers: [],
      answers: [],
      question: "",
      editing: false
    }
  }

  getQuestionAndAnswersString() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
    axios.get(`http://34.211.121.82:3030/questions/${this.props.rawAnswer.question_id}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          question: res.data.text,
          selectedAnswers: this.getEditAnswersStringFromRawAnswers(res.data),
          answers: this.getAnswersStringFromRawAnswers(res.data)
        })
      })
  }

  componentWillMount(){
    if (this.props.rawAnswer) {
      this.getQuestionAndAnswersString()
    }
  }



  getEditAnswersStringFromRawAnswers = (data) => {
    return this.props.rawAnswer.answer_ids.map((answerId) => {
      var index = data.answers.findIndex(element => {
        return element.answer_id == answerId
      })
      return (
        <li key={answerId}>{data.answers[index].text}</li>
      )
    })
  }

  getAnswersStringFromRawAnswers = (data) => {
    return data.answers
  }



  toggleEditAnswer = (event) => {
    this.setState({
      editing: true
    })
  }


  renderField = (field) => {
    return(
      <MuiThemeProvider muiTheme={muiTheme}>
        <Checkbox
          label={field.label}
          style={styles.checkbox}
          checked={field.input.value ? true : false}
          onCheck={field.input.onChange}/>
      </MuiThemeProvider>
    )
  }

  render() {

    const { handleSubmit } = this.props;

    return (
      <div>
        {this.props.rawAnswer ?
          <div className="answer-result-container">
            <h4><b>{this.state.question}</b></h4>
            {this.state.editing ? (
              <form onSubmit={handleSubmit(this.props.handleEditAnswer)}>
                {this.state.answers.map((ele, i) => {
                  console.log(ele);
                  return(
                    <Field
                      label={ele.text}
                      name={ele.answer_id}
                      type="checkbox"
                      key={i}
                      component= {this.renderField}
                    ></Field>
                  )
                })}
                <button className="button" style={{width: "100%", marginTop: "20px"}}>Save</button>
              </form>
            ) : (
              <div>
                <ul>{this.state.selectedAnswers}</ul>
                <span><input className="editButton" type="submit" value="Edit" onClick={this.toggleEditAnswer}/></span>
              </div>
            )}
            <div className="clear"/>
          </div>
        :
        <div/>}
      </div>
    );
  }
}

export default reduxForm({
  form: "EditForm"
})(Answer)
