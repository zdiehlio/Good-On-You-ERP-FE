import axios from 'axios'
import _ from 'lodash'
import {ROOT_URL} from '../../actions'

export const FETCH_GENERAL = 'fetch_general'
export const UPDATE_GENERAL = 'update_general'
export const CREATE_SIZE = 'create_size'

export function fetchGeneral(id, value) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands/${id}?section=${value}`)
  return function(dispatch){
    request.then(res => {
      console.log('res', res)
      dispatch({
        type: FETCH_GENERAL,
        payload: res,
      })
    })
  }
}

export function updateGeneral(id, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.patch(`${ROOT_URL}/brands?id=${id}`, values)
  return {
    type: UPDATE_GENERAL,
    payload: request,
  }
}

export function createBrandSize(values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.post(`${ROOT_URL}/brands-sizes`, values)
  return {
    type: CREATE_SIZE,
    payload: request,
  }
}
