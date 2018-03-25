import axios from 'axios'
import _ from 'lodash'
import {ROOT_URL} from '../../actions'

export const UPDATE_CAUSE = 'update_cause'
export const CREATE_CAUSE = 'create_cause'
export const FETCH_CAUSE = 'fetch_cause'
export const FETCHALL_CAUSE = 'fetchall_cause'

export function fetchAllCause(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/causes`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCHALL_CAUSE, payload: data})
    })
  }
}

export function fetchCause(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands-causes?brand=${id}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCH_CAUSE, payload: data})
    })
  }
}

export function createCause(values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.post(`${ROOT_URL}/brands-causes`, values)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: CREATE_CAUSE, payload: data})
    })
  }
}

export function updateCause(id, quest, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.patch(`${ROOT_URL}/brands-causes?brand=${id}&question=${quest}`, values)
  return {
    type: UPDATE_CAUSE,
    payload: request,
  }
}
