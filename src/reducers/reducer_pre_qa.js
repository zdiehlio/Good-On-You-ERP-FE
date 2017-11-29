import { FETCHALL_STYLES } from '../actions'
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
  default:
    return state;
  }
}
