import { FETCH_QUESTIONS, UPDATE_ANSWER, GET_CAUSES } from '../actions'
import _ from 'lodash'
// import jwtDecode from 'jwt-decode'


export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_QUESTIONS:
    if (!action.error) {
      return _.mapKeys(action.payload.data, 'question')
    }
    return {error: action.error}
  case GET_CAUSES:
    console.log(action.payload)
  case UPDATE_ANSWER:
    console.log(action.payload)
    return {...state, [action.payload.values]: action.payload.values}
  default:
    return state
  }
}
