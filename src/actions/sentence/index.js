import axios from 'axios'
import _ from 'lodash'
import {ROOT_URL} from '../../actions'

export const FETCH_SENTENCE = 'fetch_sentence'
export const CREATE_SENTENCE = 'create_sentence'
export const UPDATE_SENTENCE = 'update_sentence'

export function fetchSentence(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands-sentences?brand=${id}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCH_SENTENCE, payload: data})
    })
  }
}

export function createSentence(values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.post(`${ROOT_URL}/brands-sentences`, values)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: CREATE_SENTENCE, payload: data})
    })
  }
}

export function updateSentence(id, sent, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.patch(`${ROOT_URL}/brands-sentences?brand=${id}&id=${sent}`, values)
  return {
    type: UPDATE_SENTENCE,
    payload: request,
  }
}
