import { FETCH_QUESTIONS, UPDATE_ANSWER } from '../actions'
import _ from 'lodash'
// import jwtDecode from 'jwt-decode'


export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_QUESTIONS:
    if (!action.error) {
      console.log(action.payload);
      return {}
    }
    return {error: action.error}
  case UPDATE_ANSWER:
    console.log(action.payload);
    return {...state, [action.payload.values]: action.payload.values}
  default:
    return state;
  }
}
