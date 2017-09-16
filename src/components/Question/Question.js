import React from 'react'
import "./Question.css"


export default function Question(props) {
  var style = {
    alignSelf: "flex-end"
  }

  var a = [1,2,3]

  // var answers = props.answers.map(function(element,i) {
  //   <span><input type="checkbox" name="vehicle" value="Car"/>{element}</span>
  // })

  var answers = props.answers.map((ele) =>
    <span><input type="checkbox" name="vehicle" value="Car"/>{ele}</span>
  )

    return (
      <div className="card">
        <div className="container">
          <h4>{props.question}</h4>
            <div className="answer-container">
              {answers}
              <span><input className="button" type="submit" value="Save" style={style}/></span>
            </div>
        </div>
      </div>
    );
}
