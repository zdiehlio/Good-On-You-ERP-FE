import { FETCH_SENTENCE } from '../actions/sentence'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_SENTENCE:
    if (!action.error) {
      return action.payload.data.data
    }
    return {error: action.error}
  default:
    return state
  }
}
