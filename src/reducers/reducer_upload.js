import { UPLOAD_IMAGE } from '../actions'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
  // case UPLOAD_IMAGE:
  //   if(!action.error) {
  //     console.log('upload image', action.payload.data)
  //     return {...state, [action.payload.data.id]: action.payload.data}
  //   }
  //   return {error: action.error}
  default:
    return state
  }
}
