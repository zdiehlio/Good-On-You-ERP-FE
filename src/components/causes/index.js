import React from 'react'
import './causes.css'
import _ from 'lodash'

const Causes = (props) => {
  {console.log('causes from component:', props.causes)}
  return _.map(props.causes, cause => {
    return (
      <div className='cause'>
        <div className='cause-item'><span className='cause-name'>{cause.name.replace(/\b\w/g, function (l) { return l.toUpperCase() })}</span><span className='cause-value'> {cause.value}</span></div>
      </div>
    )
  })
}

export default Causes