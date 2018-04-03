import { USER_INFO } from '../actions'
import _ from 'lodash'


export default function(state = {}, action) {
  switch (action.type) {
  case USER_INFO:
    if (!action.error) {
      sessionStorage.setItem('user', action.payload.data.user.group)
      sessionStorage.setItem('userName', action.payload.data.user.username)
      sessionStorage.setItem('firstName', action.payload.data.user.firstname)
      return action.payload.data.user
    }
    return {error: action.error}
  default:
    return state
  }
}
