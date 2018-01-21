import { FETCH_RETAILER } from '../actions'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_RETAILER:
    if (!action.error) {
      console.log('get, retailer', action.payload.data.data)
      return action.payload.data.data
    }
    return {error: action.error}
  default:
    return state
  }
}
