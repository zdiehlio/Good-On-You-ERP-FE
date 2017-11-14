import { FETCH_CAUSE, UPDATE_CAUSE, FETCH_SENTENCE, UPDATE_SENTENCE, FETCH_SUMMARY, UPDATE_SUMMARY, FETCHALL_CATEGORY, FETCH_CATEGORY} from '../actions'
import _ from 'lodash'
// import jwtDecode from 'jwt-decode'

//fetches all questions for brand and maps through each unique key value returning the brand and answer tied to the question
export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_CAUSE:
    if (!action.error) {
      console.log('fetch, questions', action.payload);
      return _.mapKeys(action.payload.data.data, 'question')
    }
    return {error: action.error}
  case UPDATE_CAUSE:
    if (!action.error) {
    console.log('update answer', action.payload.data)
    return {...state, [action.payload.data]: action.payload.data}
  }
  case FETCH_SENTENCE:
    if (!action.error) {
      console.log('fetch, sentence', action.payload);
      return _.mapKeys(action.payload.data.data, 'id')
    }
    return {error: action.error}
  case UPDATE_SENTENCE:
    if (!action.error) {
    console.log('update sentence', action.payload.data)
    return {...state, [action.payload.data]: action.payload.data}
  }
  case FETCH_SUMMARY:
    if (!action.error) {
      console.log('fetch, summary', action.payload.data);
      return _.mapKeys(action.payload.data, 'id')
    }
    return {error: action.error}
  case UPDATE_SUMMARY:
    if (!action.error) {
    console.log('update category', action.payload.data)
    return {...state, [action.payload.data]: action.payload.data}
  }
  case FETCHALL_CATEGORY:
    if (!action.error) {
      console.log('fetch, categories', action.payload.data);
      return _.mapKeys(action.payload.data.data, 'name')
    }
  case FETCH_CATEGORY:
    if (!action.error) {
      console.log('fetch, brand category', action.payload.data);
      return _.mapKeys(action.payload.data, 'category_id')
    }
  return {error: action.error}
  default:
    return state
  }
}
