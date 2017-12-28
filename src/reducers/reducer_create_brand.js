import { CREATE_BRAND, FETCH_BRAND_INFO} from '../actions'
import _ from 'lodash'
import jwtDecode from 'jwt-decode'


export default function(state = null, action) {
  switch (action.type) {
  case CREATE_BRAND:
    if (!action.error) {
      console.log(action.payload)
      return {}
    }
    return {error: action.error}
  case FETCH_BRAND_INFO:
    if (!action.error) {
      console.log('fetch, info', action.payload.data)
      return action.payload.data
    }
    return {error: action.error}
  default:
    return state
  }
}
