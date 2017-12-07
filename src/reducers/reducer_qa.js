import {
  FETCH_CAUSE,
  UPDATE_CAUSE,
  FETCH_SENTENCE,
  UPDATE_SENTENCE,
  FETCH_SUMMARY,
  UPDATE_SUMMARY,
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
  FETCH_RETAILER,
  UPDATE_RETAILER,
  FETCH_IMAGE,
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
    case DELETE_SIZE:
      if (!action.error) {
        console.log('delete, size', action.payload.data);
        return _.omit(state, action.payload.data)
      }
      return {error: action.error}
    case FETCH_CONTACT:
      if (!action.error) {
        console.log('fetch, contact', action.payload.data);
        return action.payload.data
      }
      return {error: action.error}
    case UPDATE_CONTACT:
      if (!action.error) {
        console.log('update, contact', action.payload.data);
        return action.payload.data
      }
      return {error: action.error}
  // case UPDATE_SENTENCE:
  //   if (!action.error) {
  //     console.log('update sentence', _.map(action.payload.data, check => {return check.slug}))
  //     console.log('app state', state);
  //     const slug = _.map(action.payload.data, check => {return check.slug})
  //     return {...state, [slug]: action.payload.data[0]}
  //   }
  //   return {error: action.error}
  case FETCH_CAUSE:
    if (!action.error) {
      console.log('fetch, questions', action.payload.data.data);
      return _.mapKeys(action.payload.data.data, 'question')
    }
    return {error: action.error}
  // case UPDATE_CAUSE:
  //   if (!action.error) {
  //   console.log('update answer', action.payload.data)
  //   return {...state, [action.payload.data]: action.payload.data}
  // }
  case FETCH_SENTENCE:
    if (!action.error) {
      console.log('fetch, sentence', action.payload.data.data);
      return _.mapKeys(action.payload.data.data, 'slug')
    }
    return {error: action.error}
  case FETCH_SUMMARY:
    if (!action.error) {
      console.log('fetch, summary', action.payload.data);
      return _.mapKeys(action.payload.data, 'id')
    }
    return {error: action.error}
  // case UPDATE_SUMMARY:
  //   if (!action.error) {
  //     const idMap = _.map(action.payload.data, check => {return check.id})
  //     const id = idMap[0]
  //     console.log('update category', action.payload.data)
  //     return {...state, [idMap]: action.payload.data}
  // }
  case FETCH_CATEGORY:
    if (!action.error) {
      console.log('fetch, category', action.payload.data.data);
      return _.mapKeys(action.payload.data.data, 'category_id')
    }
    return {error: action.error}
  case FETCH_TYPE:
    if (!action.error) {
      console.log('fetch, type', action.payload.data.data);
      return _.mapKeys(action.payload.data.data, 'product')
    }
    return {error: action.error}
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
    return {error: action.error}
  case DELETE_ALIAS:
    if (!action.error) {
      console.log('delete, alias', action.payload.data);
      return _.omit(state, action.payload.data.alias)
    }
    return {error: action.error}
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
  case FETCH_RETAILER:
    if (!action.error) {
      console.log('get, retailer', action.payload.data.data);
      return action.payload.data.data
    }
    return {error: action.error}
  // case UPDATE_RETAILER:
  //   if (!action.error) {
  //     console.log('update, retailer', action.payload);
  //     console.log('app state', state);
  //     return {...state, [action.payload.data]: action.payload.data}
  //   }
  case FETCH_IMAGE:
    if (!action.error) {
      console.log('fetch, image', action.payload.data.data);
      return action.payload.data.data
    }
  return {error: action.error}
  default:
    return state
  }
}
