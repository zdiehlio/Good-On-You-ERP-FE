import React from 'react'
import "./ProgressBar.css"

export default function ProgressBar(props) {
  
  var percentage = `${Math.round(props.currentQuestion/props.total * 100)}%`

  return (
    <div>
      <progress max={1} value={props.currentQuestion/props.total} data-label={percentage}></progress>
    </div>
  )
}
