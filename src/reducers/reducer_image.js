import { FETCH_IMAGE, UPLOAD_IMAGE } from '../actions/image'
import _ from 'lodash'

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_IMAGE:
    if (!action.error) {
      console.log('fetch, image', action.payload.data.data)
      return action.payload.data.data
    }
    return {error: action.error}
  case UPLOAD_IMAGE:
    if(!action.error) {
      console.log('upload image', action.payload.data)
      return [...state, action.payload.data]
    }
    return {error: action.error}
  default:
    return state
  }
}
