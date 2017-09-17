import React from 'react'
import "./ProgressBar.css"

export default function ProgressBar(props) {

  var percentage = Math.round(props.currentQuestion/props.total * 100)

  var style = {
    progress: {
      backgroundColor: props.color
    }
  }
  return (
    <div>
      <progress max={1} value={props.currentQuestion/props.total} data-label={`${props.desc}: ${percentage}%`} style={style}></progress>
    </div>
  )
}
