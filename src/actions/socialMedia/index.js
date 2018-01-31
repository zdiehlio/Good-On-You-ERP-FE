import axios from 'axios'
import _ from 'lodash'
import {ROOT_URL} from '../../actions'

export const UPDATE_SOCIAL = 'update_social'

export function updateSocial(id, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.patch(`${ROOT_URL}/brands/${id}`, values)
  return {
    type: UPDATE_SOCIAL,
    payload: request,
  }
}
