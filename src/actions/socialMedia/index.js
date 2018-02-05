import axios from 'axios'
import _ from 'lodash'
import {ROOT_URL} from '../../actions'

export const UPDATE_SOCIAL = 'update_social'
export const FETCH_SOCIAL = 'fetch_social'

export function fetchSocial(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands/${id}?section=social-media`)
  return function(dispatch){
    request.then(res => {
      console.log('res', res)
      dispatch({
        type: FETCH_SOCIAL,
        payload: res,
      })
    })
  }
}

export function updateSocial(id, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.patch(`${ROOT_URL}/brands/${id}`, values)
  return {
    type: UPDATE_SOCIAL,
    payload: request,
  }
}
