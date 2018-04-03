import React from 'react'
import './causes.css'
import _ from 'lodash'

const Causes = (props) => {
  {console.log('causes from component:', props.causes)}
  return _.map(props.causes, cause => {
    return (
      <ul>
        <li>{cause.name} {cause.value}</li>
      </ul>
    )
  })
}

export default Causes