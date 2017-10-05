import React from 'react'
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {teal900} from 'material-ui/styles/colors';
import "./Question.css"

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

export default function Question(props) {

  var style = {
    alignSelf: "flex-end"
  }

  var answers = props.answers.map((ele, i) =>
    // <span key={`q${props.currentQuestion}-res${i}`}><input onChange={props.handleSelectionChange} type="checkbox" name={i} value={false}/>{ele.text}</span>

    <span key={`q${props.currentQuestion}-res${i}`}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Checkbox
              label={ele.text}
              onCheck={props.handleSelectionChange}
              style={styles.checkbox}
              name={i}
            />
      </MuiThemeProvider>
    </span>
  )
  // <span><input onClick={props.handleSaveQuestion} className="button" type="submit" value="Save" style={{width:'100%', height:'40px'}} disabled={props.disabled}/></span>

  return (
    <div className="card">
      <div className="container">
        <h4>{props.question}</h4>
          <div className="answer-container">
            {answers}
            <p>Evidence</p>
            <div className="evidence-container">
              <div className="evidence-container-row">
                <label for="fname">Source URL *</label>
                <input type="text" id="fname" name="fname" style={{width:'100%'}}/>
              </div>
              <div className="evidence-container-row">
                <label for="lname">Comment *</label>
                <textarea style={{width:'100%'}}></textarea>
              </div>
            </div>
            <div className="questionnaire-btn-container">

              <MuiThemeProvider muiTheme={muiTheme}>
              <RaisedButton
                containerElement={<Link to="/brandSummary" />}
                style={style}
                primary={true}
                label="Cancel"/>
              </MuiThemeProvider>
              <MuiThemeProvider muiTheme={muiTheme}>
              <RaisedButton
                containerElement={<Link to="/brandSummary" />}
                style={style}
                primary={true}
                onClick={props.handleSaveQuestion}
                disabled={props.disabled}
                label="Save"/>
              </MuiThemeProvider>
            </div>
          </div>
      </div>
    </div>
  );
}
