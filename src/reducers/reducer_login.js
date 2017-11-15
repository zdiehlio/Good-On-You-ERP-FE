import { LOG_IN, LOG_OUT, FETCH_USER_INFO } from '../actions'
import _ from 'lodash'
import jwtDecode from 'jwt-decode'
import axios from 'axios'




export default function(state = {accessToken: sessionStorage.accessToken}, action) {
  switch (action.type) {
  case LOG_IN:
    sessionStorage.clear()
    if (!action.error) {

      console.log('login', action.payload.data);

      sessionStorage.setItem("email", action.payload.data.user.email)
      sessionStorage.setItem("userId", action.payload.data.user._id)
      sessionStorage.setItem("jwt", action.payload.data.accessToken)


      return {...action.payload.data}
    }
    return {error: action.error}
  case LOG_OUT:
    sessionStorage.clear()
    return null;
  case FETCH_USER_INFO:
    if (!action.error) {
      console.log('fetch user', action.payload);
      return {user: action.payload.data.data[0]}
    }
    return {error: action.error}
  default:
    return state;
  }
}
