import { FETCH_GENERAL } from '../actions/general'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_GENERAL:
    if(!action.error) {
      console.log('general summary', action.payload.data)
      return {...state.summary, ...action.payload.data}
    }
    return {error: action.error}
  default:
    return state
  }
}
