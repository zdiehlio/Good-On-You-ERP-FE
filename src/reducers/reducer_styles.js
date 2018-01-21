import { FETCH_STYLES, UPDATE_STYLES } from '../actions'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_STYLES:
    if (!action.error) {
      console.log('fetch, styles', action.payload.data.data)
      return _.mapKeys(action.payload.data.data, 'style')
    }
    return {error: action.error}
  case UPDATE_STYLES:
    if (!action.error) {
      console.log('update, styles', action.payload.data)
      return {...state, [action.payload.data.data]: action.payload.data.data}
    }
    return {error: action.error}
  default:
    return state
  }
}
