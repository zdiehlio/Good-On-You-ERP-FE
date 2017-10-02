import { FETCH_BRANDS } from '../actions'
import _ from 'lodash'
// import jwtDecode from 'jwt-decode'


export default function(state = null, action) {
  switch (action.type) {
  case FETCH_BRANDS:
    if (!action.error) {
      console.log(action.payload.data);
      return {}
    }
    return {error: action.error}
  default:
    return state;
  }
}
