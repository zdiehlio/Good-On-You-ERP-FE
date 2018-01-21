import { FETCH_GENERAL, DELETE_SIZE } from '../actions'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_GENERAL:
    if(!action.error) {
      console.log('general summary', action.payload.data)
      return {...state.summary, ...action.payload.data}
    }
    return {error: action.error}
  case DELETE_SIZE:
    if (!action.error) {
      console.log('delete, size', action.payload.data)
      return _.omit(state, action.payload.data)
    }
    return {error: action.error}
  default:
    return state
  }
}
