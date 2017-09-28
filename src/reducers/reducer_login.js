import { LOG_IN } from '../actions'
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

      return {...action.payload.data, ...email}
    }
    return action.error
  default:
    return state;
  }
}
