import { FETCH_CONTACT, UPDATE_CONTACT } from '../actions/contact'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_CONTACT:
    if(!action.error) {
      console.log('contact summary', action.payload.data)
      return {...state.contactSumm, ...action.payload.data}
    }
    return {error: action.error}
  case UPDATE_CONTACT:
    if (!action.error) {
      console.log('update, contact', action.payload.data)
      return action.payload.data
    }
    return {error: action.error}
  default:
    return state
  }
}
