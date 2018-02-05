import { FETCH_TYPE } from '../actions/type'
import _ from 'lodash'

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_TYPE:
    if (!action.error) {
      console.log('fetch, type', action.payload.data.data)
      return action.payload.data.data
    }
    return {error: action.error}
  default:
    return state
  }
}
