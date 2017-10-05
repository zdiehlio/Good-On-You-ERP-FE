import { FETCH_QUESTIONS } from '../actions'
import _ from 'lodash'
// import jwtDecode from 'jwt-decode'


export default function(state = null, action) {
  switch (action.type) {
  case FETCH_QUESTIONS:
    if (!action.error) {
      console.log(action.payload);
      return {}
    }
    return {error: action.error}
  default:
    return state;
  }
}
