import {
  FETCH_RATING_SCORE,
} from '../actions'
import _ from 'lodash'

//fetches all questions for brand and maps through each unique key value returning the brand and answer tied to the question
export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_RATING_SCORE:
    if (!action.error) {
      console.log('fetch, rating score', action.payload.data.data)
      return action.payload.data.data
    }
    return {error: action.error}
  default:
    return state
  }
}
