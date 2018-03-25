import axios from 'axios'
import _ from 'lodash'
import {ROOT_URL} from '../../actions'

export const FETCHALL_RATING = 'fetchall_rating'
export const FETCH_RATING = 'fetch_rating'
export const UPDATE_RATING = 'update_rating'
export const CREATE_RATING = 'create_rating'
export const FETCH_RATING_SCORE = 'fetch_rating_score'
export const FETCHRAW_RATING = 'fetchraw_rating'

export function fetchRating(id, theme) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands-ratings-answers?brand=${id}&theme=${theme}`)
  return {
    type: FETCH_RATING,
    payload: request,
  }
}

export function createRating(values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.post(`${ROOT_URL}/brands-ratings-answers`, values)
  return {
    type: CREATE_RATING,
    payload: request,
  }
}

export function updateRating(id, ans) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.patch(`${ROOT_URL}/brands-ratings-answers?brand=${id}&answer=${ans}`)
  return {
    type: UPDATE_RATING,
    payload: request,
  }
}

export function fetchAllRating(theme, id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/themes?name=${theme}&brand=${id}`)
  return {
    type: FETCHALL_RATING,
    payload: request,
  }
}

export function fetchRatingScore(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands-ratings?brand=${id}`)
  return {
    type: FETCH_RATING_SCORE,
    payload: request,
  }
}

export function fetchRawRating(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands-ratings-answers?brand=${id}&all=true`)
  return {
    type: FETCHRAW_RATING,
    payload: request,
  }
}
