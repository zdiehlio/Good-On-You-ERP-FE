import axios from 'axios'
import _ from 'lodash'
import {ROOT_URL} from '../../actions'

export const FETCHALL_STYLES = 'fetchall_styles'
export const FETCH_STYLES = 'fetch_styles'
export const CREATE_STYLES = 'create_styles'
export const UPDATE_STYLES = 'update_styles'

export function fetchAllStyles() {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/styles`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCHALL_STYLES, payload: data})
    })
  }
}


export function fetchStyles(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands-styles?brand=${id}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCH_STYLES, payload: data})
    })
  }
}

export function createStyles(values, id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.post(`${ROOT_URL}/brands-styles`, values)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: CREATE_STYLES, payload: data})
    })
  }
}

export function updateStyles(id, tag) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.patch(`${ROOT_URL}/brands-styles?brand=${id}&style=${tag}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: UPDATE_STYLES, payload: data})
    })
  }
}
