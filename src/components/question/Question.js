import React, {Component} from 'react'
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {teal900} from 'material-ui/styles/colors';
import "./Question.css"
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField';


// <div className="answer-container">
//   {answers}
//   <p>Evidence</p>
//   <div className="evidence-container">
//     <div className="evidence-container-row">
//       <label for="fname">Source URL *</label>
//       <input type="text" id="fname" name="fname" style={{width:'100%'}}/>
//     </div>
//     <div className="evidence-container-row">
//       <label for="lname">Comment *</label>
//       <textarea style={{width:'100%'}}></textarea>
//     </div>
//   </div>
//   <div className="questionnaire-btn-container">
//
//     <MuiThemeProvider muiTheme={muiTheme}>
//     <RaisedButton
//       containerElement={<Link to="/brandSummary" />}
//       style={style}
//       primary={true}
//       label="Cancel"/>
//     </MuiThemeProvider>
//     <MuiThemeProvider muiTheme={muiTheme}>
//     <RaisedButton
//       style={style}
//       primary={true}
//       onClick={props.handleSaveQuestion}
//       disabled={props.disabled}
//       label="Save"/>
//     </MuiThemeProvider>
//   </div>
// </div>

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

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

class Question extends Component {

  // {this.props.answers.map((ele, i) =>


  constructor(props) {
    super(props);

  }

  renderField = (field) => {
    // console.log(field.input.onChange);
    // console.log(field);
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
    var style = {
      alignSelf: "flex-end"
    }
    const { handleSubmit } = this.props;


    return (
      <div className="card">
        <div className="container">
        <form onSubmit={handleSubmit(this.props.handleSaveQuestion)}>
        
        {this.props.answers.map((ele, i) =>
          <Field
            label={ele.text}
            name={ele.answer_id}
            type="checkbox"
            elementKey={i}
            component= {this.renderField}
          ></Field>
        )}
          <button className="button" style={{width: "100%", marginTop: "20px"}}>Save</button>
        </form>
        </div>
      </div>
    );
  }

}

export default reduxForm({
  form: "AnswerForm"
})(Question)
