import React, {Component} from 'react'
import './Answer.css';
import axios from 'axios'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {teal900} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';


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
      editFormData: {},
      answers: [],
      question: "",
      editing: false
    }
  }

  getQuestionAndAnswersString() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
    axios.get(`http://34.211.121.82:3030/questions/${this.props.rawAnswer.question_id}`)
      .then(res => {
        this.setState({
          question: res.data.text,
          answers: this.getAnswersStringFromRawAnswers(res.data),
          answer_id: this.props.rawAnswer ? this.props.rawAnswer._id : "",
          editFormData : {
            url: "",
            comment: "",
            answer_ids: []
          }
        })
        this.getEditFormData(this.state.answer_id, res.data)
      })
  }

  componentWillMount(){
    if (this.props.rawAnswer) {
      this.getQuestionAndAnswersString()
    }
  }

  getEditFormData = (id, data) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
    axios.get(`http://34.211.121.82:3030/brand-answers/${this.state.answer_id}`)
    .then(res => {
      this.setState({
          editFormData: {
            url: res.data.url,
            comment: res.data.comment,
            answer_ids: res.data.answer_ids
          }
        }
      )
      this.setState({
        selectedAnswers: this.getEditAnswersStringFromRawAnswers(data)
      })
    })
  }





  getEditAnswersStringFromRawAnswers = (data) => {
    console.log(this.state.an);
    return this.state.editFormData.answer_ids.map((answerId) => {
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
    console.log(field.fieldId);
    return(
      <MuiThemeProvider muiTheme={muiTheme}>
        <Checkbox
          label={field.label}
          style={styles.checkbox}
          checked={field.initValue ? true : false}
          onCheck={field.input.onChange}/>
      </MuiThemeProvider>
    )
  }

  onCheckboxChange = (id, target) => {

    var stateCopy = this.state.editFormData
    var index = stateCopy.answer_ids.findIndex(element => element == id)
    if (index > -1) {
      stateCopy.answer_ids.splice(index, 1)
    } else {
      stateCopy.answer_ids.push(id)
    }
    this.setState({
      editFormData: stateCopy
    })
    console.log(this.state.editFormData);
   }

   onInputChange = (event) => {
     var stateCopy = this.state.editFormData
     stateCopy.url = event.target.value
     this.setState({
       editFormData: stateCopy
     })
   }

  renderInput = (field) => {
    console.log(field.input);
    return(
      <div className="evidence-container-row">
        <label htmlFor="fname" style={{fontSize:'18px'}}>Source URL *</label>
        <input type="text" id="fname" name="fname" style={{width:'100%', fontSize:'18px'}} {...field.input} value={field.initValue}/>
      </div>
    )
  }

  onTextAreaChange = (event) => {
    var stateCopy = this.state.editFormData
    stateCopy.comment = event.target.value
    this.setState({
      editFormData: stateCopy
    })
  }

  handleEditAnswer = (values, id, event) => {
    event.preventDefault()
    console.log(values);
    var valueCopy = values
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
    valueCopy["user_id"] = sessionStorage.userId

    axios.patch(`http://34.211.121.82:3030/brand-answers/${id}`, valueCopy).then(() => {
      this.getQuestionAndAnswersString()
      this.setState(
        {
          editing: false
        }
      )
    })

  }

  renderTextArea = (field) => {
    return(
      <div className="evidence-container-row">
        <label for="lname" style={{fontSize:'18px'}}>Comment *</label>
        <textarea style={{width:'100%', fontSize:'18px'}} {...field.input} value={field.initValue}></textarea>
      </div>
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
              <form onSubmit={this.handleEditAnswer.bind(this, this.state.editFormData, this.state.answer_id)}>
                {this.state.answers.map((ele, i) => {
                  return(
                    <Field
                      label={ele.text}
                      name={ele.answer_id}
                      type="checkbox"
                      key={i}
                      component= {this.renderField}
                      initValue = {this.state.editFormData.answer_ids.some(element => (element == ele.answer_id))}
                      fieldId = {ele.answer_id}
                      onChange = {this.onCheckboxChange.bind(this, ele.answer_id)}
                    ></Field>
                  )
                })}
                <Field name="url" component={this.renderInput} initValue={this.state.editFormData.url} onChange = {this.onInputChange}/>
                <Field name="comment" component={this.renderTextArea} initValue={this.state.editFormData.comment} onChange = {this.onTextAreaChange}></Field>
                <button className="button" style={{width: "100%", marginTop: "20px"}}>Save</button>
              </form>
            ) : (
              <div>
                <ul>{this.state.selectedAnswers}</ul>
                <ul>
                  <li>{`Source Url: ${this.state.editFormData.url ? this.state.editFormData.url : "none"}`}</li>
                  <li>{`Comment: ${this.state.editFormData.comment ? this.state.editFormData.comment : "none"}`}</li>
                </ul>
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

// const mapFormToProps = {
//   form: "EditForm"
// };
//
// const mapStateToProps = (state, ownProps) => {
//   console.log(ownProps.rawAnswer);
//   return {
//       initialValues: {
//         url: ownProps.rawAnswer.url
//       }
//     }
// };

Answer = reduxForm({
  form: `EditForm`,
  enableReinitialize: true
})(Answer)


const selector = formValueSelector('EditForm')

Answer = connect(
  (state, ownProps, c) => {
    return(
      {

      }
    )
  }, null
)(Answer)

export default Answer
