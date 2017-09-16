import React from 'react'
import "./Question.css"


export default function Question(props) {
  console.log(props);
  var style = {
    alignSelf: "flex-end"
  }

  // var answers = props.answers.map(function(element,i) {
  //   <span><input type="checkbox" name="vehicle" value="Car"/>{element}</span>
  // })

  var answers = props.answers.map((ele, i) =>
    <span key={`q${props.currentQuestion}-res${i}`}><input onChange={props.handleSelectionChange} type="checkbox" name={i} value={false}/>{ele.text}</span>
  )
    return (
      <div className="card">
        <div className="container">
          <h4>{props.question}</h4>
            <div className="answer-container">
              {answers}
              <span><input onClick={props.handleSaveQuestion} className="button" type="submit" value="Save" style={style} disabled={props.disabled}/></span>
            </div>
        </div>
      </div>
    );
}
