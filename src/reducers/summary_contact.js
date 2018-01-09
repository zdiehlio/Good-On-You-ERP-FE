import { FETCH_CONTACT } from '../actions'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_CONTACT:
    if(!action.error) {
      console.log('contact summary', action.payload.data)
      return {...state.contactSumm, ...action.payload.data}
    }
    return {error: action.error}
  default:
    return state
  }
}
