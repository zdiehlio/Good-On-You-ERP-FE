import React, { Component } from 'react'
import './Answer.css';


export default function Answer(props) {

  var answers = []
  if (props.answeredItem) {
    answers = props.answeredItem.answers.map((answer) =>
      <li>{answer}</li>
    )
  }

  return (
    <div>
      {props.answeredItem ?
        <div className="answer-result-container">
          <h4><b>{props.answeredItem.issueNumber} - {props.answeredItem.question}</b></h4>
          <ul>
            {answers}
          </ul>
          <span><input className="editButton" type="submit" value="Edit"/></span>
          <div className="clear"/>
        </div>
      :
      <div/>}
    </div>
  );
}
