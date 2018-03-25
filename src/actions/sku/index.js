import axios from 'axios'
import _ from 'lodash'
import {ROOT_URL} from '../../actions'

export const FETCH_SKU = 'fetch_sku'
export const UPDATE_SKU = 'update_sku'

export function fetchSku(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands/${id}?section=sku`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCH_SKU, payload: data})
    })
  }
}

export function updateSku(id, value) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.patch(`${ROOT_URL}/brands/${id}`, value)
  return {
    type: UPDATE_SKU,
    payload: request,
  }
}
