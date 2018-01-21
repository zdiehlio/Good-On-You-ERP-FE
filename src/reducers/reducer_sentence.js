import { FETCH_SENTENCE } from '../actions'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_SENTENCE:
    if (!action.error) {
      return _.mapKeys(action.payload.data.data, 'slug')
    }
    return {error: action.error}
  default:
    return state
  }
}
