import React from 'react'
import './price.css'
import { Icon } from 'semantic-ui-react'


const Price = (props) => {
  return(
    <span>
      {console.log('PRICE:', props.price)}
      { props.price >= 1 ? <Icon color='#5D5D5D' name='dollar fitted' /> : <Icon color='black' name='dollar fitted' disabled='true' /> }
      { props.price >= 2 ? <Icon color='#5D5D5D' name='dollar fitted' /> : <Icon color='black' name='dollar fitted' disabled='true' /> }
      { props.price >= 3 ? <Icon color='#5D5D5D' name='dollar fitted' /> : <Icon color='black' name='dollar fitted' disabled='true' /> }
      { props.price == 4 ? <Icon color='#5D5D5D' name='dollar fitted' /> : <Icon color='black' name='dollar fitted' disabled='true' /> }
    </span>
  )
}

export default Price