import { UPLOAD_LOGO, FETCH_LOGO } from '../actions/image'
import _ from 'lodash'

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_LOGO:
    if (!action.error) {
      console.log('fetch, logo', action.payload.data.data)
      return action.payload.data.data
    }
    return {error: action.error}
  case UPLOAD_LOGO:
    if(!action.error) {
      console.log('upload logo', action.payload.data)
      return [...state, action.payload.data]
    }
    return {error: action.error}
  default:
    return state
  }
}
