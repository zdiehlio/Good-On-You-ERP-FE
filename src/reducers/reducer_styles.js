import { FETCH_STYLES, UPDATE_STYLES } from '../actions/style'
import _ from 'lodash'

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_STYLES:
    if (!action.error) {
      console.log('fetch, styles', action.payload.data.data)
      return action.payload.data.data
    }
    return {error: action.error}
  case UPDATE_STYLES:
    if (!action.error) {
      console.log('update, styles', action.payload.data)
      return [...state, action.payload.data.data]
    }
    return {error: action.error}
  default:
    return state
  }
}
