import axios from 'axios'
import _ from 'lodash'
import {ROOT_URL} from '../../actions'

export const DELETE_ALIAS = 'delete_alias'
export const CREATE_ALIAS = 'create_alias'
export const FETCH_ALIAS = 'fetch_alias'

export function fetchAlias(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands-aliases?brand=${id}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCH_ALIAS, payload: data})
    })
  }
}

export function createAlias(values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.post(`${ROOT_URL}/brands-aliases`, values)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: CREATE_ALIAS, payload: data})
    })
  }
}

export function deleteAlias(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.delete(`${ROOT_URL}/brands-aliases/${id}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: DELETE_ALIAS, payload: data})
    })
  }
}
