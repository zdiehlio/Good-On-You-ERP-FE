import React, { Component } from 'react'
import './Answer.css';


export default function Answer(props) {

  return (
    <div>
      {props.answeredItem ?
      <div className="card">
        <div className="container">
          <h4><b>{props.answeredItem.issueNumber}</b></h4>
          <h4><b>{props.answeredItem.question}</b></h4>
        </div>
      </div>
      :
      <div/>}
    </div>
  );
}
