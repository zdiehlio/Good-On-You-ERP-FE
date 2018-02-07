import axios from 'axios'
import _ from 'lodash'
import {ROOT_URL} from '../../actions'

export const FETCH_CONTACT = 'fetch_contact'
export const UPDATE_CONTACT = 'update_contact'
export const CREATE_CONTACT = 'create_contact'
export const FETCH_GENERAL = 'fetch_general'

export function fetchContact(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands/${id}?section=contact`)
  return {
    type: FETCH_CONTACT,
    payload: request,
  }
}

export function createContact(values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.post(`${ROOT_URL}/brands-contacts`, values)
  return {
    type: CREATE_CONTACT,
    payload: request,
  }
}

export function updateContact(id, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.patch(`${ROOT_URL}/brands-contacts?brand=${id}`, values)
  return {
    type: FETCH_GENERAL,
    payload: request,
  }
}
