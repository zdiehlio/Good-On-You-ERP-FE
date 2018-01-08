import { LOG_IN, LOG_OUT, FETCH_USER_INFO, AUTH_USER } from '../actions'
import _ from 'lodash'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

export default function(state = {}, action) {
  switch (action.type) {
  case LOG_IN:
    // sessionStorage.clear()
    if (!action.error) {

      console.log('login', action.payload.data)

      // sessionStorage.setItem('email', action.payload.data.user.email)
      // sessionStorage.setItem('userId', action.payload.data.user._id)


      return {...state, token: action.payload.data.accessToken}
    }
    return {error: action.error}
  case AUTH_USER:
    console.log('authorized', action.payload)
    return {...state, token: action.payload}
  case LOG_OUT:
    console.log('log out')
    return {...state, token: null}
  case FETCH_USER_INFO:
    if (!action.error) {
      console.log('fetch user', action.payload)
      return {user: action.payload.data.data[0]}
    }
    return {error: action.error}
  default:
    return state
  }
}
