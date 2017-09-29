import axios from 'axios'

export const LOG_IN = 'log_in';
export const LOG_OUT = 'log_out';


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
