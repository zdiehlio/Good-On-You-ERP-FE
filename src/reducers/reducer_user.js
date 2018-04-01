import { USER_INFO } from '../actions'
import _ from 'lodash'


export default function(state = {}, action) {
  switch (action.type) {
  case USER_INFO:
    if (!action.error) {
      console.log('user info', action.payload.data)
      sessionStorage.setItem('user', action.payload.data.user.group)
      sessionStorage.setItem('userName', action.payload.data.user.username)
      return action.payload.data.user
    }
    return {error: action.error}
  default:
    return state
  }
}
