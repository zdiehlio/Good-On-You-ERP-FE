import { SEARCH_RESULTS } from '../actions'
import _ from 'lodash'


export default function(state = {}, action) {
  console.log('reducer', action)
  switch (action.type) {
  case SEARCH_RESULTS:
    if (!action.error) {
      console.log('search reducer', action.payload)
      return action.payload
    }
    return {error: action.error}
  default:
    return state
  }
}
