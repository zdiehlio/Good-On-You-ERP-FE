import axios from 'axios'
import _ from 'lodash'
import {ROOT_URL} from '../../actions'

export const FETCH_TYPE = 'fetch_type'
export const CREATE_TYPE = 'create_type'
export const DELETE_TYPE = 'delete_type'

export function fetchType(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands-product-types?brand=${id}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCH_TYPE, payload: data})
    })
  }
}

export function createType(values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.post(`${ROOT_URL}/brands-product-types`, values)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: CREATE_TYPE, payload: data})
    })
  }
}

export function deleteType(id, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.delete(`${ROOT_URL}/brands-product-types?brand=${id}&product=${values}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: DELETE_TYPE, payload: data})
    })
  }
}
