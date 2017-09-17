import React from 'react'
import Checkbox from 'material-ui/Checkbox';
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
    textColor: teal900
  }
});

export default function Question(props) {

  var style = {
    alignSelf: "flex-end"
  }

  var a = [1,2,3]

  // var answers = props.answers.map(function(element,i) {
  //   <span><input type="checkbox" name="vehicle" value="Car"/>{element}</span>
  // })

  var answers = props.answers.map((ele, i) =>
    // <span key={i}><input key={i} onChange={props.handleSelectionChange} type="checkbox" name="vehicle" value="Car"/>{ele.text}</span>

    <span key={`q${props.currentQuestion}-res${i}`}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Checkbox
              label={ele.text}
              onCheck={props.handleSelectionChange}
              style={styles.checkbox}
            />
      </MuiThemeProvider>
    </span>
  )
    return (
      <div className="card">
        <div className="container">
          <h4>{props.question}</h4>
            <div className="answer-container">
              {answers}
              <span><input onClick={props.handleSaveQuestion} className="button" type="submit" value="Save" style={style}/></span>
            </div>
        </div>
      </div>
    );
}
