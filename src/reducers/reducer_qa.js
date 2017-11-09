import { FETCH_QUESTIONS, UPDATE_ANSWER, GET_CAUSES, CREATE_ANSWER} from '../actions'
import _ from 'lodash'
// import jwtDecode from 'jwt-decode'

//fetches all questions for brand and maps through each unique key value returning the brand and answer tied to the question
export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_QUESTIONS:
    if (!action.error) {
      // return _.mapValues(action.payload.data.data, function(o){return o.question})
      return _.mapKeys(action.payload.data.data, 'question')
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
