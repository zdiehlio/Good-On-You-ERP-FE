import axios from 'axios'
import _ from 'lodash'

export const LOG_IN = 'log_in';
export const LOG_OUT = 'log_out';
export const CREATE_BRAND = 'create_brand'
export const FETCH_USERS = 'fetch_users'
export const FETCH_BRANDS = 'fetch_brands'
export const FETCH_USER_INFO = 'fetch_user_info'

// .then(response => {
//   console.log(response);
//   axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken;
//   var email = JSON.parse(response.config.data).email
//   return _.assignIn(axios.get(`http://34.211.121.82:3030/users?email=${email}`, response.data))
//
// })

export function login(values) {
  const strategy = {
    strategy: "local"
  }

  const request = axios.post("http://34.211.121.82:3030/authentication/", {...values, ...strategy})
  return {
    type: LOG_IN,
    payload: request
  }
}

export function fetchUserInfo(email) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
  const request = axios.get(`http://34.211.121.82:3030/users?email=${email}`)

  return {
    type: FETCH_USER_INFO,
    payload: request
  }
}

export function logout() {
  return {
    type: LOG_OUT,
    payload: {}
  }
}

export function createBrand(values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
  const request = axios.post("http://34.211.121.82:3030/brands/", {...values})
  return {
    type: CREATE_BRAND,
    payload: request
  }
}

export function fetchUsers(value) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
  const request = axios.get(`http://34.211.121.82:3030/users?$search=${value}`)
  return {
    type: FETCH_USERS,
    payload: request
  }
}

export function fetchBrands(value) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
  const request = axios.get(`http://34.211.121.82:3030/brands?$search=${value}`)
  return {
    type: FETCH_BRANDS,
    payload: request
  }
}

export function submitAnswer(value) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
  const request = axios.get(`http://34.211.121.82:3030/brands?$search=${value}`)
  return {
    type: FETCH_BRANDS,
    payload: request
  }
}
