import { FETCH_BRANDS, FETCH_USERS, CLEAR_SEARCH } from '../actions'
import _ from 'lodash'


export default function(state = null, action) {
  switch (action.type) {
  case FETCH_BRANDS:
    if (!action.error) {
      return {brands: action.payload.data}
    }
    return {error: action.error}
  case FETCH_USERS:
    if (!action.error) {
      return {users: action.payload.data}
    }
    return {error: action.error}
  case CLEAR_SEARCH:
    return null
  default:
    return state
  }
}
