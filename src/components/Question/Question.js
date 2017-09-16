import React from 'react'
import "./Question.css"


export default function Question(props) {
  var style = {
    width: "100%"
  }
    return (
      <div className="card">
        <div className="container">
          <h4><b>Which of the following standards systems is the brand compliant with?</b></h4>
            <input type="checkbox" name="vehicle" value="Bike"/> I have a bike<br />
            <input type="checkbox" name="vehicle" value="Car"/> I have a car<br />
            <input type="submit" value="Save"/>
        </div>
      </div>
    );
}
