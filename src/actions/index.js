import axios from 'axios'
import _ from 'lodash'
import { push } from 'react-router-redux'

export const ROOT_URL = 'https://goy-ed-2079.nodechef.com'

export const LOG_IN = 'log_in'
export const AUTH_USER = 'auth_user'
export const LOG_OUT = 'log_out'
export const CREATE_BRAND = 'create_brand'
export const FETCH_USERS = 'fetch_users'
export const FETCH_BRANDS = 'fetch_brands'
export const FETCH_USER_INFO = 'fetch_user_info'
export const FETCH_CAUSE = 'fetch_cause'
export const FETCHALL_CAUSE = 'fetchall_cause'
export const CLEAR_SEARCH = 'clear_search'
export const UPDATE_CAUSE = 'update_cause'
export const CREATE_CAUSE = 'create_cause'
export const FETCH_SENTENCE = 'fetch_sentence'
export const CREATE_SENTENCE = 'create_sentence'
export const UPDATE_SENTENCE = 'update_sentence'
export const FETCH_SUMMARY = 'fetch_summary'
export const CREATE_SUMMARY = 'create_summary'
export const UPDATE_SUMMARY = 'update_summary'
export const FETCHALL_CATEGORY = 'fetchall_category'
export const FETCH_CATEGORY = 'fetch_category'
export const CREATE_CATEGORY = 'create_category'
export const UPDATE_CATEGORY = 'update_category'
export const DELETE_CATEGORY = 'delete_category'
export const FETCH_GENERAL = 'fetch_general'
export const UPDATE_GENERAL = 'update_general'
export const CREATE_SIZE = 'create_size'
export const DELETE_SIZE = 'delete_size'
export const FETCH_CONTACT = 'fetch_contact'
export const CREATE_CONTACT = 'create_contact'
export const UPDATE_CONTACT = 'update_contact'
export const FETCH_TYPE = 'fetch_type'
export const CREATE_TYPE = 'create_type'
export const DELETE_TYPE = 'delete_type'
export const DELETE_ALIAS = 'delete_alias'
export const CREATE_ALIAS = 'create_alias'
export const FETCH_ALIAS = 'fetch_alias'
export const FETCHALL_STYLES = 'fetchall_styles'
export const FETCH_STYLES = 'fetch_styles'
export const CREATE_STYLES = 'create_styles'
export const UPDATE_STYLES = 'update_styles'
export const UPDATE_SOCIAL = 'update_social'
export const FETCH_RETAILER = 'fetch_retailer'
export const FETCH_TERRITORY = 'fetch_territory'
export const CREATE_RETAILER = 'post_retailer'
export const UPDATE_RETAILER = 'update_retailer'
export const FETCH_IMAGE = 'fetch_image'
export const UPDATE_IMAGE = 'update_image'
export const FETCH_LOGO = 'fetch_logo'
export const UPDATE_LOGO = 'update_logo'
export const FETCHALL_RATING = 'fetchall_rating'
export const FETCH_RATING = 'fetch_rating'
export const UPDATE_RATING = 'update_rating'
export const CREATE_RATING = 'create_rating'
export const FETCH_BRAND_INFO = 'fetch_brand_info'
export const UPLOAD_IMAGE = 'upload_image'
export const UPLOAD_LOGO = 'upload_logo'
export const FETCHRAW_RATING = 'fetchraw_rating'
export const BRAND_INFO = 'brand_info'


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
      console.log('res', res)
      dispatch({
        type: UPLOAD_IMAGE,
        payload: res,
      })
      axios.patch(`${ROOT_URL}/brands-covers/${res.data.id}`, data)
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
      // 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
    },
  }
  const request = axios.post(`${ROOT_URL}/upload?type=logo`, formData, config)
  return function(dispatch) {
    request.then(res => {
      console.log('res', res)
      dispatch({
        type: UPLOAD_LOGO,
        payload: res,
      })
      axios.patch(`${ROOT_URL}/brands-logos/${res.data.id}`, data)
    })
  }

}

export function login(values) {
  const strategy = {
    strategy: 'local',
  }

  const request = axios.post(`${ROOT_URL}/authentication/`, {...values, ...strategy})
  return function(dispatch){
    request.then(res => {
      dispatch({
        type: LOG_IN,
        payload: res,
      })
      sessionStorage.setItem('jwt', res.data.accessToken)

    })
    // .catch(() => {
    //   return {type: AUTH_ERROR, payload: error}
    // })
  }
}

export function logout() {
  sessionStorage.removeItem('jwt')
  return {
    type: LOG_OUT,
  }
}

export function fetchUserInfo(email) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/users?email=${email}`)

  return {
    type: FETCH_USER_INFO,
    payload: request,
  }
}

export function createBrand(values, callback) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.post(`${ROOT_URL}/brands`, {...values})
    .then((res) => callback(res))
  return {
    type: CREATE_BRAND,
    payload: request,
  }
}

export function fetchUsers(value) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/users?$search=${value}`)
  return function(dispatch){
    dispatch({
      type: FETCH_USERS,
      payload: request,
    })
  }
}

export function fetchBrands(value) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands?name=${value}`)
  return function(dispatch){
    request.then(res => {
      dispatch({
        type: FETCH_BRANDS,
        payload: res,
      })
    })
  }
}

export function fetchBrandInfo(id, value) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands/${id}?section=${value}`)
  return function(dispatch){
    request.then(res => {
      dispatch({
        type: FETCH_BRAND_INFO,
        payload: res,
      })
      dispatch({
        type: BRAND_INFO,
        payload: res.data,
      })
    })
  }
}

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

export function updateSocial(id, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.patch(`${ROOT_URL}/brands/${id}`, values)
  return {
    type: UPDATE_SOCIAL,
    payload: request,
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

export function createBrandSize(id, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.delete(`${ROOT_URL}/brands-sizes?brand=${id}`).then(() => {axios.post(`${ROOT_URL}/brands-sizes`, values)})
  return {
    type: CREATE_SIZE,
    payload: request,
  }
}

export function deleteBrandSize(id, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.delete(`${ROOT_URL}/brands-sizes?brand=${id}&criteria=${values}`)
  return {
    type: DELETE_SIZE,
    payload: request,
  }
}

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

export function fetchAllRating(theme) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/themes?name=${theme}`)
  return {
    type: FETCHALL_RATING,
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

export function fetchAllCause(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/causes`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCHALL_CAUSE, payload: data})
    })
  }
}

export function fetchCause(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands-causes?brand=${id}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCH_CAUSE, payload: data})
    })
  }
}

export function createCause(values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.post(`${ROOT_URL}/brands-causes`, values)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: CREATE_CAUSE, payload: data})
    })
  }
}

export function updateCause(id, quest, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.patch(`${ROOT_URL}/brands-causes?brand=${id}&question=${quest}`, values)
  return {
    type: UPDATE_CAUSE,
    payload: request,
  }
}

export function fetchAllStyles() {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/styles`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCHALL_STYLES, payload: data})
    })
  }
}


export function fetchStyles(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands-styles?brand=${id}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCH_STYLES, payload: data})
    })
  }
}

export function createStyles(values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.post(`${ROOT_URL}/brands-styles`, values)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: CREATE_STYLES, payload: data})
    })
  }
}

export function updateStyles(id, tag) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.patch(`${ROOT_URL}/brands-styles?brand=${id}&style=${tag}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: UPDATE_STYLES, payload: data})
    })
  }
}

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

export function fetchAllCategory() {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/categories`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCHALL_CATEGORY, payload: data})
    })
  }
}

export function fetchBrandCategory(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands-categories?brand=${id}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCH_CATEGORY, payload: data})
    })
  }
}

export function updateBrandCategory(id, cat, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.patch(`${ROOT_URL}/brands-categories?brand=${id}&category_id=${cat}`, values)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: UPDATE_CATEGORY, payload: data})
    })
  }
}

export function createBrandCategory(id, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.delete(`${ROOT_URL}/brands-categories?brand=${id}`).then(() => {axios.post(`${ROOT_URL}/brands-categories`, values)})
  // const request = axios.post(`${ROOT_URL}/brands-categories`, values)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: CREATE_CATEGORY, payload: data})
    })
  }
}

export function fetchType(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands-product-types?brand=${id}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCH_TYPE, payload: data})
    })
  }
}

export function createType(values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.post(`${ROOT_URL}/brands-product-types`, values)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: CREATE_TYPE, payload: data})
    })
  }
}

export function deleteType(id, values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.delete(`${ROOT_URL}/brands-product-types?brand=${id}&product=${values}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: DELETE_TYPE, payload: data})
    })
  }
}

export function fetchAlias(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands-aliases?brand=${id}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCH_ALIAS, payload: data})
    })
  }
}

export function createAlias(values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.post(`${ROOT_URL}/brands-aliases`, values)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: CREATE_ALIAS, payload: data})
    })
  }
}

export function deleteAlias(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.delete(`${ROOT_URL}/brands-aliases/${id}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: DELETE_ALIAS, payload: data})
    })
  }
}

export function fetchRetailers(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/retailers?brand=${id}`)
  return (dispatch) => {
    request.then((data) => {
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


export function clearSearch() {
  return {
    type: CLEAR_SEARCH,
    payload: {},
  }
}
