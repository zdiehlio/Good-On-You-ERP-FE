import { FETCH_CAUSE } from '../actions/cause'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_CAUSE:
    if (!action.error) {
      console.log('fetch, causes', action.payload.data.data)
      return _.mapKeys(action.payload.data.data, 'question')
    }
    return {error: action.error}
  default:
    return state
  }
}
