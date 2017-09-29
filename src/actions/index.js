import axios from 'axios'

export const LOG_IN = 'log_in';
export const LOG_OUT = 'log_out';
export const CREATE_BRAND = 'create_brand'


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