import axios from 'axios'
import _ from 'lodash'
import {ROOT_URL} from '../../actions'

export const FETCHALL_CATEGORY = 'fetchall_category'
export const FETCH_CATEGORY = 'fetch_category'
export const CREATE_CATEGORY = 'create_category'
export const UPDATE_CATEGORY = 'update_category'
export const DELETE_CATEGORY = 'delete_category'

export function fetchAllCategory() {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/categories`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCHALL_CATEGORY, payload: data})
    })
  }
}

export function fetchBrandCategory(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands-categories?brand=${id}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCH_CATEGORY, payload: data})
    })
  }
}

export function updateBrandCategory(id, cat, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.patch(`${ROOT_URL}/brands-categories?brand=${id}&category_id=${cat}`, values)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: UPDATE_CATEGORY, payload: data})
    })
  }
}

export function createBrandCategory(id, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.delete(`${ROOT_URL}/brands-categories?brand=${id}`).then(() => {axios.post(`${ROOT_URL}/brands-categories`, values)})
  // const request = axios.post(`${ROOT_URL}/brands-categories`, values)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: CREATE_CATEGORY, payload: data})
    })
  }
}
