import { FILTERED_SEARCH } from '../actions'
import _ from 'lodash'


export default function(state = {}, action) {
  switch (action.type) {
  case FILTERED_SEARCH:
    if (!action.error) {
      console.log('filtered search', action.payload.data)
      return action.payload.data
    }
    return {error: action.error}
  default:
    return state
  }
}
