import axios from 'axios'
import _ from 'lodash'
import {ROOT_URL} from '../../actions'

export const UPLOAD_IMAGE = 'upload_image'
export const UPLOAD_LOGO = 'upload_logo'
export const FETCH_IMAGE = 'fetch_image'
export const UPDATE_IMAGE = 'update_image'
export const FETCH_LOGO = 'fetch_logo'
export const UPDATE_LOGO = 'update_logo'

export function uploadImage(value, data) {
  // axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const formData = new FormData()
  formData.append('image', value)
  const config = {
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
      'Cache-Control': 'no-cache',
      'Content-Type': 'multipart/form-data',
      // 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
    },
  }
  const request = axios.post(`${ROOT_URL}/upload?type=cover`, formData, config)
  return function(dispatch) {
    request.then(res => {
      axios.patch(`${ROOT_URL}/brands-covers/${res.data.id}`, data)
        .then(response => {
          console.log('res', response)
          dispatch({
            type: UPLOAD_IMAGE,
            payload: response,
          })
        })
    })
  }
}

export function uploadLogo(value, data) {
  // axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const formData = new FormData()
  formData.append('image', value)
  const config = {
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
      'Cache-Control': 'no-cache',
      'Content-Type': 'multipart/form-data',
    },
  }
  const request = axios.post(`${ROOT_URL}/upload?type=logo`, formData, config)
  return function(dispatch) {
    request.then(res => {
      axios.patch(`${ROOT_URL}/brands-logos/${res.data.id}`, data)
        .then(response => {
          console.log('res', response)
          dispatch({
            type: UPLOAD_LOGO,
            payload: response,
          })
        })
    })
  }
}

export function fetchImage(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands-covers?brand=${id}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCH_IMAGE, payload: data})
    })
  }
}

export function fetchLogo(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands-logos?brand=${id}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCH_LOGO, payload: data})
    })
  }
}

export function updateImage(id, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.patch(`${ROOT_URL}/brands-covers/${id}`, values)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: UPDATE_IMAGE, payload: data})
    })
  }
}

export function updateLogo(id, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.patch(`${ROOT_URL}/brands-logos/${id}`, values)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: UPDATE_LOGO, payload: data})
    })
  }
}
