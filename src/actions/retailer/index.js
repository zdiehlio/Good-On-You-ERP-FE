import axios from 'axios'
import _ from 'lodash'
import {ROOT_URL} from '../../actions'

export const FETCH_RETAILER = 'fetch_retailer'
export const FETCH_TERRITORY = 'fetch_territory'
export const CREATE_RETAILER = 'post_retailer'
export const UPDATE_RETAILER = 'update_retailer'

export function fetchRetailers(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/retailers?brand=${id}`)
  return (dispatch) => {
    request.then((data) => {
      console.log('fetch retailer', data)
      dispatch({type: FETCH_RETAILER, payload: data})
    })
  }
}

export function fetchTerritories() {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/territories`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCH_TERRITORY, payload: data})
    })
  }
}

export function createRetailer(values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.post(`${ROOT_URL}/retailers`, values)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: CREATE_RETAILER, payload: data})
    })
  }
}

export function updateRetailer(id, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.patch(`${ROOT_URL}/retailers/${id}`, values)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: UPDATE_RETAILER, payload: data})
    })
  }
}
