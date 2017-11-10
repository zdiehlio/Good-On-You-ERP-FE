import axios from 'axios'
import _ from 'lodash'

export const ROOT_URL = 'http://34.212.110.48:3000'
// const ROOT_URL = 'http://34.211.121.82:3030'

export const LOG_IN = 'log_in';
export const LOG_OUT = 'log_out';
export const CREATE_BRAND = 'create_brand'
export const FETCH_USERS = 'fetch_users'
export const FETCH_BRANDS = 'fetch_brands'
export const FETCH_USER_INFO = 'fetch_user_info'
export const FETCH_QUESTIONS = 'fetch_questions'
export const CLEAR_SEARCH = "clear_search"
export const UPDATE_ANSWER = 'update_answer'
export const GET_CAUSES = 'get_causes'
export const CREATE_ANSWER = 'create_answer'
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

  const request = axios.post(`${ROOT_URL}/authentication/`, {...values, ...strategy})
  return {
    type: LOG_IN,
    payload: request
  }
}

export function fetchUserInfo(email) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
  const request = axios.get(`${ROOT_URL}/users?email=${email}`)

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

export function createBrand(values, callback) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
  const request = axios.post(`${ROOT_URL}/brands/`, {...values})
    .then((res) => callback(res))
  return {
    type: CREATE_BRAND,
    payload: request
  }
}

export function fetchUsers(value) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
  const request = axios.get(`${ROOT_URL}/users?$search=${value}`)
  return {
    type: FETCH_USERS,
    payload: request
  }
}

export function fetchBrands(value) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
  const request = axios.get(`${ROOT_URL}/brands?name=${value}`)
  return {
    type: FETCH_BRANDS,
    payload: request
  }
}

export function submitAnswer(value) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
  const request = axios.get(`${ROOT_URL}/brands?name=${value}`)
  return {
    type: FETCH_BRANDS,
    payload: request
  }
}

export function fetchQuestions(id) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
  const request = axios.get(`${ROOT_URL}/brands-causes?brand=${id}`)
  return (dispatch) => {
    request.then((data) => {
      dispatch({type: FETCH_QUESTIONS, payload: data})
    })
  }
}

export function getCauses() {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
  const request = axios.get(`${ROOT_URL}/users`)
  console.log('get causes', request);
  return {
    type: GET_CAUSES,
    payload: request
  }
}

export function createAnswer(values) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
  const request = axios.post(`${ROOT_URL}/brands-causes`, values)
  console.log('post', request);
  return {
    type: CREATE_ANSWER,
    payload: request
  }
}

export function updateAnswer(id, quest, values) {
  const request = axios.patch(`${ROOT_URL}/brands-causes?brand=${id}&question=${quest}`, values)
  return {
    type: UPDATE_ANSWER,
    payload: request
  }
}

export function clearSearch() {
  return {
    type: CLEAR_SEARCH,
    payload: {}
  }
}
