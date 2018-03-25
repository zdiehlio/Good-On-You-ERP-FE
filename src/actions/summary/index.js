import axios from 'axios'
import _ from 'lodash'
import {ROOT_URL} from '../../actions'

export const FETCH_SUMMARY = 'fetch_summary'
export const CREATE_SUMMARY = 'create_summary'
export const UPDATE_SUMMARY = 'update_summary'

export function fetchSummary(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands-summaries?brand=${id}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCH_SUMMARY, payload: data})
    })
  }
}

export function createSummary(values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.post(`${ROOT_URL}/brands-summaries`, values)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: CREATE_SUMMARY, payload: data})
    })
  }
}

export function updateSummary(id, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.patch(`${ROOT_URL}/brands-summaries?brand=${id}`, values)
  return {
    type: UPDATE_SUMMARY,
    payload: request,
  }
}
