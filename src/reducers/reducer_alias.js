import { FETCH_ALIAS, DELETE_ALIAS, CREATE_ALIAS } from '../actions/alias'
import _ from 'lodash'

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_ALIAS:
    if (!action.error) {
      return action.payload.data.data
    }
    return {error: action.error}
  // case CREATE_ALIAS:
  //   if (!action.error) {
  //     console.log('create, alias', action.payload)
  //     return [...state, action.payload]
  //   }
  //   return {error: action.error}
  default:
    return state
  }
}
