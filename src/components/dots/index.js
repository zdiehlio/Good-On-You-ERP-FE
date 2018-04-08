import React from 'react'
import './dots.css'
import _ from 'lodash'
import { Icon } from 'semantic-ui-react'

const Dots = (props) => {
  const dots = props.dots
  return (
    <span className='dots-space'>
      {dots >= 1 ? <Icon color='teal' name='circle' fitted='true' /> : <Icon name='circle'  fitted='true' color='gray-dot' />}
      {dots >= 2 ? <Icon color='teal' name='circle' fitted='true' /> : <Icon name='circle'  fitted='true' color='gray-dot' />}
      {dots >= 3 ? <Icon color='teal' name='circle' fitted='true' /> : <Icon name='circle'  fitted='true' color='gray-dot' />}       
      {dots >= 4 ? <Icon color='teal' name='circle' fitted='true' /> : <Icon name='circle'  fitted='true' color='gray-dot' />}
      {dots >= 5 ? <Icon color='teal' name='circle' fitted='true' /> : <Icon name='circle'  fitted='true' color='gray-dot' />}
    </span>
  )
}

export default Dots