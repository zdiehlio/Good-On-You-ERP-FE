import axios from 'axios'
import _ from 'lodash'

// export const ROOT_URL = 'https://goy-ed-2079.nodechef.com'
export const ROOT_URL = 'https://goy-ed-test-2079.nodechef.com'

export const LOG_IN = 'log_in'
export const AUTH_USER = 'auth_user'
export const LOG_OUT = 'log_out'
export const CREATE_BRAND = 'create_brand'
export const FETCH_USERS = 'fetch_users'
export const FETCH_BRANDS = 'fetch_brands'
export const FETCH_USER_INFO = 'fetch_user_info'
export const CLEAR_SEARCH = 'clear_search'
export const FETCH_GENERAL = 'fetch_general'
export const FETCH_BRAND_INFO = 'fetch_brand_info'
export const BRAND_INFO = 'brand_info'
export const AUTH_ERROR = 'auth_error'
export const FILTERED_SEARCH = 'filtered_search'
export const BRAND_PAGE = 'brand_page'
export const USER_INFO = 'user_info'


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
      dispatch({
        type: USER_INFO,
        payload: res,
      })
    })
      .catch(error => {
        console.log('error', error)
        dispatch({type: AUTH_ERROR, payload: error})
      })
  }
}

export function logout() {
  sessionStorage.clear()
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
  const request = axios.post(`${ROOT_URL}/brands`, values)
  return function(dispatch){
    request.then(res => {
      dispatch({
        type: CREATE_BRAND,
        payload: res,
      })
    }).catch(err => {
      dispatch({
        type:CREATE_BRAND,
        payload: err,
      })
    })
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
      dispatch({
        type: CREATE_BRAND,
        payload: value,
      })
    })
  }
}

export function filteredSearch(value) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.post(`${ROOT_URL}/brands-list`, value)
  return function(dispatch){
    request.then(res => {
      dispatch({
        type: FILTERED_SEARCH,
        payload: res,
      })
    })
  }
}

export function brandsHomePage(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt')
  const request = axios.get(`${ROOT_URL}/brands-homepage?brand=${id}`)
  // const request = axios.get('https://goy-ed-2079.nodechef.com/brands-homepage?brand=1')
  return function(dispatch){
    request.then(res => {
      dispatch({
        type: BRAND_PAGE,
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

export function clearSearch() {
  return {
    type: CLEAR_SEARCH,
    payload: {},
  }
}
