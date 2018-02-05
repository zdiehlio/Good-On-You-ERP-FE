import { FETCH_SUMMARY } from '../actions/summary'
import _ from 'lodash'

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_SUMMARY:
    if (!action.error) {
      return action.payload.data
    }
    return {error: action.error}
  default:
    return state
  }
}
