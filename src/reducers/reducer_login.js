import { LOG_IN, LOG_OUT } from '../actions'
import _ from 'lodash'
import jwtDecode from 'jwt-decode'


export default function(state = {email: sessionStorage.email}, action) {
  switch (action.type) {
  case LOG_IN:
    if (!action.error) {
      const email = {
        email: JSON.parse(action.payload.config.data).email
      }
      sessionStorage.setItem("email", email.email)
      sessionStorage.setItem("jwt", action.payload.data.accessToken)

      return {...email}
    }
    return {error: action.error}
  case LOG_OUT:
    sessionStorage.clear()
    return {email: sessionStorage.email};
  default:
    return state;
  }
}
