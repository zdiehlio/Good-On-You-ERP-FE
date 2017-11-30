import {
  FETCH_CAUSE,
  UPDATE_CAUSE,
  FETCH_SENTENCE,
  UPDATE_SENTENCE,
  FETCH_SUMMARY,
  UPDATE_SUMMARY,
  FETCHALL_CATEGORY,
  FETCH_CATEGORY,
  FETCH_GENERAL,
  UPDATE_GENERAL,
  DELETE_SIZE,
  CREATE_SIZE,
  FETCH_CONTACT,
  UPDATE_CONTACT,
  FETCH_TYPE,
  CREATE_TYPE,
  DELETE_TYPE,
  FETCH_ALIAS,
  DELETE_ALIAS,
  CREATE_ALIAS,
  FETCH_STYLES,
  UPDATE_STYLES,
  CREATE_STYLES,
  } from '../actions'
import _ from 'lodash'

//fetches all questions for brand and maps through each unique key value returning the brand and answer tied to the question
export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_GENERAL:
    if (!action.error) {
      console.log('fetch, general', action.payload.data);
      return action.payload.data
    }
    return {error: action.error}
    case CREATE_SIZE:
      if (!action.error) {
        console.log('create, size', action.payload.data);
        return action.payload.data
      }
      return {error: action.error}
    case DELETE_SIZE:
      if (!action.error) {
        console.log('delete, size', action.payload.data);
        return _.omit(state, action.payload.data)
      }
      return {error: action.error}
    case FETCH_CONTACT:
      if (!action.error) {
        console.log('fetch, contact', action.payload.data.data);
        return _.mapValues(action.payload.data.data[0])
      }
      return {error: action.error}
    case UPDATE_CONTACT:
      if (!action.error) {
        console.log('update, contact', action.payload.data);
        return action.payload.data
      }
      return {error: action.error}
  case UPDATE_SENTENCE:
    if (!action.error) {
      console.log('update general', action.payload.data)
      return {...state, [action.payload.data]: action.payload.data}
    }
    return {error: action.error}
  case FETCH_CAUSE:
    if (!action.error) {
      console.log('fetch, questions', action.payload.data.data);
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
      console.log('fetch, sentence', action.payload.data.data);
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
  case FETCH_TYPE:
    if (!action.error) {
      console.log('fetch, type', action.payload.data.data);
      return _.mapKeys(action.payload.data.data, 'product')
    }
  case DELETE_TYPE:
    if (!action.error) {
      console.log('delete, type', action.payload.data);
      return _.mapKeys(action.payload.data, 'product')
    }
  case FETCH_ALIAS:
    if (!action.error) {
      console.log('fetch, alias', action.payload.data);
      return _.mapKeys(action.payload.data.data, 'alias')
    }
  case DELETE_ALIAS:
    if (!action.error) {
      console.log('delete, alias', action.payload.data);
      return {...state, [action.payload.data.data]: action.payload.data.data}
    }
  case FETCH_STYLES:
    if (!action.error) {
      console.log('fetch, styles', action.payload.data.data);
      return _.mapKeys(action.payload.data.data, 'style')
    }
  case UPDATE_STYLES:
    if (!action.error) {
      console.log('update, styles', action.payload.data);
      return {...state, [action.payload.data.data]: action.payload.data.data}
    }
  return {error: action.error}
  default:
    return state
  }
}
