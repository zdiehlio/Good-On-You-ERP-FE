import { FETCH_QUESTIONS, UPDATE_ANSWER, GET_CAUSES, CREATE_ANSWER} from '../actions'
import _ from 'lodash'
// import jwtDecode from 'jwt-decode'

//fetches all questions for brand and maps through each unique key value returning the brand and answer tied to the question
export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_QUESTIONS:
    if (!action.error) {
      console.log('fetch, questions', action.payload);
      return _.mapKeys(action.payload.data.data, 'question')
    }
    return {error: action.error}
  case GET_CAUSES:
    console.log(action.payload)
  case UPDATE_ANSWER:
    if (!action.error) {
    console.log('update answer', action.payload.data)
    return {...state, [action.payload.data]: action.payload.data}
  }
  return {error: action.error}
  default:
    return state
  }
}
