import { FETCH_CATEGORY, UPDATE_CATEGORY } from '../actions'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_CATEGORY:
    if (!action.error) {
      console.log('fetch, category', action.payload.data.data)
      return _.mapKeys(action.payload.data.data, 'category_id')
    }
    return {error: action.error}
  case UPDATE_CATEGORY:
    if (!action.error) {
      console.log('update, category', action.payload)
      return action.payload
    }
    return {error: action.error}
  default:
    return state
  }
}
