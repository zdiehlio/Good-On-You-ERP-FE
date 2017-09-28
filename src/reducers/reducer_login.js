import { LOG_IN } from '../actions'
import _ from 'lodash'

export default function(state = null, action) {
  switch (action.type) {
  case LOG_IN:
    console.log(action.payload.data);
    return action.payload.data
  default:
    return state;
  }
}
