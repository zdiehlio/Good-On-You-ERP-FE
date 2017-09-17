import React from 'react'
import "./ProgressBar.css"

export default function ProgressBar(props) {
  var style = {
    progress: {
      backgroundColor: props.color
    }
  }
  return (
    <div>
      <progress max={1} value={props.currentQuestion/props.total} data-label={`${props.desc}: ${Math.round(props.currentQuestion/props.total * 100)}%`} style={style}></progress>
    </div>
  )
}
