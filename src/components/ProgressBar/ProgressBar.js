import React from 'react'
import "./ProgressBar.css"

export default function ProgressBar(props) {
  return (
    <div>
      <progress max={1} value={props.currentQuestion/props.total} data-label={`${Math.round(props.currentQuestion/props.total * 100)}%`}></progress>
    </div>
  )
}
