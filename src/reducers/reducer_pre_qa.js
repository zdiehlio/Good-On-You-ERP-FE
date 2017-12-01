import { FETCHALL_STYLES, FETCH_TERRITORY } from '../actions'
import _ from 'lodash'
import jwtDecode from 'jwt-decode'


export default function(state = null, action) {
  switch (action.type) {
    case FETCHALL_STYLES:
      if (!action.error) {
        console.log('fetch all, styles', action.payload.data);
        return _.mapKeys(action.payload.data.data, 'tag')
      }
    return {error: action.error}
    case FETCH_TERRITORY:
      if (!action.error) {
        console.log('get, territory', action.payload.data.data);
        return action.payload.data.data
      }
      return {error: action.error}
  default:
    return state;
  }
}
